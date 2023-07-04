import * as _ from "lodash";
import moment from "moment";
import {
  IFieldCondition,
  IFieldConditional,
  IFieldConditionalLegacy,
  IFieldInstance,
  IFormField,
  IFormSchema,
} from "next-shared/src/types/formTypes";
import notevil from "notevil";

import { NextClient } from "../../client/NextClient";

import { FieldValidator } from "../FieldValidator";
import { computePath } from "./helpers/computePath";
import { flattenForm } from "./helpers/flattenForm";
import { parseDate } from "./helpers/parseDate";
import { substitutePseudoFields } from "./helpers/pseudoFields";
import {
  exportDataUsingMapping,
  importDataUsingMapping,
} from "./helpers/remapFormData";
import { substituteEnvVars } from "./helpers/substituteEnvVars";
import { valueIsNotEmptyBasedOnField } from "./helpers/valueIsNotEmptyBasedOnField";
import { verifySchema } from "./helpers/verifySchema";

// HACK a set of fields to maintain as objects - typically form breaks every value down
// to individual items
const FORM_OBJECT_FIELDS = [
  "CreditCard",
  "snomedTerm",
  // editor version of the image fields
  "_gallery",
  "_posterImage",
  "_featuredImage",
];
// HACK - to preserve the structure of score form values.
const FORM_OBJECT_STRUCTURES = [
  ["label", "score"],
  ["grade", "score"],
];

// iterate through the fields without modifying
// @param func Accepts a field. Should return false if it want to prevent deeper
// search.
const fieldIterator = (
  fields: IFormField[],
  func: (field: IFormField) => boolean | void,
) => {
  fields.map((field) => {
    let iterateChildren = func(field);

    // treat non-boolean as true
    iterateChildren = _.isBoolean(iterateChildren) ? iterateChildren : true;

    ((iterateChildren && field._instances) || []).map((instance: any) => {
      fieldIterator(instance.fields, func);
    });
  });
};

const isGroupField = (field: any) => field.type === "group";

//TODO - type this..
type IOnChangeCallback = any;

/**
 * Manages the state of a form based on a provided schema.
 */
export class Form {
  public formFields: IFormField[];
  public isInitialised: boolean = false;

  private onChangeCallbacks: IOnChangeCallback[];
  private dataTransformers: any;
  private allowReadOnlyToBeSet: boolean;
  private locked: any;
  private readonly client?: NextClient;

  constructor(
    schema: IFormSchema,
    data: any,
    dataTransformers: any = [],
    client?: NextClient,
  ) {
    // listeners
    this.onChangeCallbacks = [];
    this.dataTransformers = dataTransformers ? dataTransformers : [];
    // let the read only fields to be set during initialisation - allowing for flow on effects
    this.allowReadOnlyToBeSet = true;

    // ensure the schema is consistent
    verifySchema(schema);

    this.formFields = this._prepareFields(substitutePseudoFields(schema));

    // transform the data to make it easier to handle
    const preparedData = importDataUsingMapping(data, this.dataTransformers);
    // pre-fill the data

    this._setInitData(preparedData);

    // ensure the initial values are valid based on schema validations
    this.validate(true).then(() => {
      this.isInitialised = true;
    });

    // lock down the form for standard use
    this.allowReadOnlyToBeSet = false;
    this.client = client;
  }

  public exploreFields(callback: any) {
    this._applyFuncToFields((field: IFormField) => {
      callback(_.cloneDeep(field));
      return field;
    }, this.formFields);
  }

  // The worker function for applyFuncToFields
  public _applyFuncToFields(
    func: (field: IFormField, parent: IFormField) => IFormField,
    fields: IFormField[],
    parentField: IFormField = null,
  ) {
    // Might return more fields than provided. This can happen with the dynamic fields, which could match
    // multiple instances in the source data.
    const _fields = _.flatten(
      fields.map((field) => {
        // Update the field.
        // HACK: must be performed first, as the callback may create new _instances

        field = func(field, parentField);
        if (isGroupField(field)) {
          const _instances = field._instances.map((instance) => {
            const fields = this._applyFuncToFields(
              func,
              instance.fields,
              field,
            );
            if (fields === instance.fields) {
              return instance;
            }

            // Create a new instance
            return {
              ...instance,
              fields,
            };
          });
          // Check if any of the instance fields were altered
          const alteredFieldCount = field._instances.filter(
            (f, i) => f !== _instances[i],
          ).length;

          if (alteredFieldCount) {
            field = {
              ...field,
              _instances,
            };
          }
        }
        return field;
      }),
    );

    // Check if anything changed i.e. a new field object was returned
    return fields.filter((f, i) => f !== _fields[i]).length ? _fields : fields;
  }

  // Applies a supplied function to all form nodes.
  // @param func A function applied to all form nodes, including inputs and groups. It should return
  // either the original field or a modified copy.
  // @return boolean Returns true if the form changed
  public updateFields(
    func: (field: IFormField, parent: IFormField) => IFormField,
  ) {
    const fields = this._applyFuncToFields(func, this.formFields);
    const didChange = fields !== this.formFields;

    // Update on value change
    if (didChange) {
      this.formFields = fields;
      this._notifyOnChange();
    }

    return didChange;
  }

  public _prepareFields(
    fields: IFormField[],
    pathOverride: string | boolean = false,
  ) {
    fields = this._applyFuncToFields(
      (field: IFormField, parentField: IFormField) => {
        const parentPath =
          pathOverride || (parentField ? parentField._path : "");
        const childPath = [parentPath, field.map].filter((o) => o).join(".");
        const filterPath = field.mapFilterField
          ? [parentPath, field.mapFilterField].filter((o) => o).join(".")
          : "";

        // TODO: put in more path checks
        field = {
          ...field,
          // errors
          errors: field.allowMultiple ? [undefined] : [],
          // For reference in the schema
          _id: _.uniqueId(),
          // The computed export map for this field
          _path: childPath,
          // The path of a related field
          _filterPath: filterPath,
          // determines if shown
          _visible: true,
          // current disabled status - allow all to be edited initially to allow for prefill
          disabled: "readOnly" in field ? field.readOnly : false,
          // a map to the fields that this field is influenced by
          _watching: [],
          // check if we need to format the input
          _formatters: (field.formatters || []).map((f) => ({
            formatPattern: new RegExp(f.formatPattern),
            formatBlueprint: f.formatBlueprint,
            formatFilter: new RegExp(f.formatFilter, "g"),
            toUpperCase: f.toUpperCase,
          })),
          // flags whether the form has been prefilled with an invalid value
          _illegal: false,
        };

        if (!isGroupField(field)) {
          field.value = field.allowMultiple ? [] : null;
        }
        if (field.maxDate) {
          field.maxDate = parseDate(field.maxDate, field.dateFormat);
        }
        if (field.minDate) {
          field.minDate = parseDate(field.minDate, field.dateFormat);
        }

        // Allow the config to refer to a global value
        if (field.remoteCheck) {
          field.remoteCheck = substituteEnvVars(field.remoteCheck);
        }
        if (field.contentUrl) {
          field.contentUrl = substituteEnvVars(field.contentUrl);
        }

        if (isGroupField(field)) {
          // Make a clean copy of the field
          field._instances = [];

          if (field.allowMultiple) {
            // Create a regex to check if a value matches, e.g. people\.([0-9]+).*
            const escapedPath = field._path
              .replace(/\./g, "\\.")
              // allow for leading $ as a special character for pseudo fields
              .replace(/\$/g, "\\$");

            field._pathRegExp = new RegExp(`${escapedPath}\\.([0-9]+).*`);
            // Create a map template we can use to generate a map value for each instance, e.g. person.#
            field._path += ".#";
          } else {
            // Create a single instance
            field._instances = [
              {
                fields: _.cloneDeep(field.fields),
              },
            ];
          }
        }

        return field;
      },
      fields,
    );

    // Create an instance for each group. We do this after the previous
    // function to avoid preparing the fields twice
    fields = this._applyFuncToFields((field: IFormField) => {
      if (isGroupField(field) && field.allowMultiple) {
        return this._createGroupInstance(field);
      }
      return field;
    }, fields);

    // Update the watchers. We do this here to ensure all fields are instantiated
    fields = this._applyFuncToFields((field: IFormField) => {
      // Allow a field to toggle the "required" validation based on another input having a current value.
      // This allows one field to become required when another is filled.
      if (field.conditional) {
        const conditionals = Array.isArray(field.conditional)
          ? field.conditional
          : [field.conditional];

        let watching: string[] = [];

        conditionals.forEach((conditional) => {
          const conditionalFieldPath = computePath(
            // HACK - remove any trailing group placeholders - consider removing '#' from paths instead
            field._path.replace(/\.#$/, ""),
            conditional.path,
          );

          watching = watching.concat([conditionalFieldPath]);
        });

        return {
          ...field,
          _watching: field._watching.concat(watching),
        };
      }
      return field;
    }, fields);

    return fields;
  }

  public _notifyOnChange = () => {
    this.onChangeCallbacks.map((func) => func(this.formFields));
  };

  // Creates a new group instance.
  public createGroupInstance(groupField: IFormField) {
    const newInstances: IFieldInstance[] = [];

    // rebuild the form with the new groups that include an additional field instance
    this.formFields = this._applyFuncToFields((field) => {
      if (field !== groupField) {
        return field;
      }
      const updatedGroup = this._createGroupInstance(field);
      // new field will be the last entry in the group instances.
      newInstances.push(_.last(updatedGroup._instances));
      return updatedGroup;
    }, this.formFields);

    // set initial values - this is done once the fields are in the form to ensure set() works properly
    this.allowReadOnlyToBeSet = true;
    newInstances.map((n) => this._initialiseFields(n.fields));
    this.allowReadOnlyToBeSet = false;

    // inform our listeners that we have changed the form
    this._notifyOnChange();

    return this.formFields;
  }

  // Creates a new instance of a group field
  public _createGroupInstance(groupField: IFormField) {
    if (!isGroupField(groupField)) {
      throw Error("Cannot create instance of a non-group field");
    }

    const clonedFields = _.cloneDeep(groupField.fields);
    // Instantiate the mapping, e.g. person.# => person.0
    const instancePath = groupField._path.replace(
      "#",
      groupField._instances.length && groupField._instances.length.toString(),
    );

    // Ready the field instance
    const newInstance = {
      fields: this._prepareFields(clonedFields, instancePath),
    };

    return {
      ...groupField,
      _instances: groupField._instances.concat([newInstance]),
    };
  }

  public removeGroupInstance(/* groupField */) {
    console.error("not implemented yet");
  }

  /**
   * Reset the field.
   *
   * @param field
   */
  public clearField(field: IFormField) {
    this.set(field.allowMultiple ? [] : null, field);
  }

  public _sanitiseValue(value: string, field: IFormField) {
    if (field.maxLength) {
      value = value && value.substr(0, field.maxLength);
    }

    if (field._formatters.length) {
      field._formatters.map((formatDetails) => {
        const { toUpperCase, formatPattern, formatBlueprint, formatFilter } =
          formatDetails;
        value = value || "";

        // could be null
        if (formatBlueprint && formatPattern) {
          value = value.toString().replace(formatPattern, formatBlueprint);
        }
        if (formatFilter) {
          value = value.toString().replace(formatFilter, "");
        }
        if (toUpperCase) {
          value = value.toString().toUpperCase();
        }
      });
    }
    return value;
  }

  /*
   * Set a field value based on a reference to one of the fields. Multiple
   * fields may be updated if other fields observe the one being updated.
   *
   * @return true When the form changed
   */
  public set(value: any, field: IFormField) {
    // force a particular value
    value = field.forceValue ? field.forceValue : value;

    // we want to keep track of the values of each field as we iterate over
    // them, so that we can support multiple conditions per field.
    // format is { path: value }
    const fieldValues: Record<string, any> = {};
    fieldValues[field._path] = value;

    const scoreFields: IFormField[] = [];

    const fieldsChanged = this.updateFields((f) => {
      // create a map of values where the field is either hidden or currently visible
      if (f._id !== field._id && (f.type === "hidden" || f._visible)) {
        fieldValues[f._path] = f.value;
      }

      if (f.type === "score") {
        scoreFields.push(f);
      }

      if (f._id === field._id && f.value !== value) {
        // enforce disabled - can be overidden during initilisation
        if (f.disabled && !this.allowReadOnlyToBeSet) {
          return f;
        }

        value = field.allowMultiple
          ? value.map((v: string) => this._sanitiseValue(v, field))
          : this._sanitiseValue(value, field);

        return {
          ...f,
          value,
          _illegal: false,
        };
      }

      // Has one of the fields we depend on updated?
      if (f._watching?.indexOf(field._path) > -1) {
        if (f.conditional) {
          // hide when the field we're watching is not enabled
          if (field.type !== "hidden" && !field._visible) {
            return {
              ...f,
              _visible: false,
            };
          }
          const conditionals = Array.isArray(f.conditional)
            ? f.conditional
            : [f.conditional];

          //onverts legacy conditional objects to new type. see usage below.
          const legacyToNew = (
            conditional: IFieldConditionalLegacy,
          ): IFieldConditional => {
            const newConditional: any = { ...conditional, condition: null };

            // HACK - infer & set f.conditional.condition if not already set
            if ("match" in conditional) {
              newConditional.condition = "match";
            } else if ("matchAny" in conditional) {
              newConditional.condition = "matchAny";
            } else if ("isPresent" in conditional) {
              newConditional.condition = "isPresent";
            } else if ("minValue" in conditional || "maxValue" in conditional) {
              newConditional.condition = "range";
            } else if ("gender" in conditional) {
              newConditional.condition = "gender";
            } else if ("atsiStatus" in conditional) {
              newConditional.condition = "atsi";
            }

            return newConditional as IFieldConditional;
          };

          // iterate over each conditional, mapping it to whether it is
          // successfully 'applicable' or not.
          const applicableArray = conditionals.map(
            (_conditional: IFieldCondition) => {
              let applicable: boolean;

              // coerce legacy type to new type if needed, so type narrowing
              // in the switch statement works as expected.
              const conditional: IFieldConditional = (_conditional as any)
                .condition
                ? (_conditional as IFieldConditional)
                : legacyToNew(_conditional);

              const absoluteConditionPath = computePath(
                f._path.replace(/\.#$/, ""),
                conditional.path,
              );

              // allows it to check values from multiple places in the form
              const valueToCheckAgainst = fieldValues[absoluteConditionPath];
              // if the target field is an array, we assume it's a multi-value - we don't otherwise
              // know it's definition
              const isTargetFieldMultivalue =
                Array.isArray(valueToCheckAgainst);

              switch (conditional.condition) {
                case "match":
                  const match = conditional.match;

                  if (Array.isArray(match)) {
                    // we sort to avoid having the order of elements influence the comparison.
                    applicable = isTargetFieldMultivalue
                      ? _.isEqual(valueToCheckAgainst.sort(), match.sort())
                      : false;
                  } else {
                    applicable = isTargetFieldMultivalue
                      ? valueToCheckAgainst?.includes(match)
                      : valueToCheckAgainst === match;
                  }
                  break;

                case "matchAny":
                  const matchAny = conditional.matchAny;
                  if (isTargetFieldMultivalue) {
                    applicable =
                      _.intersection(matchAny, valueToCheckAgainst).length > 0;
                  } else {
                    applicable = valueToCheckAgainst
                      ? matchAny.indexOf(valueToCheckAgainst) !== -1
                      : false;
                  }
                  break;

                case "isPresent":
                  applicable = valueIsNotEmptyBasedOnField(
                    valueToCheckAgainst,
                    field,
                  );
                  break;

                case "range":
                  let range = conditional.range;
                  if (range === undefined) {
                    range = "inside";
                  }
                  if (valueToCheckAgainst === null) {
                    applicable = false;
                  } else {
                    const valueNumeric = parseFloat(valueToCheckAgainst);
                    // TODO would like to implement a debounce;
                    switch (range) {
                      case "inside":
                        applicable =
                          (conditional.minValue === undefined ||
                            valueNumeric >= conditional.minValue) &&
                          (conditional.maxValue === undefined ||
                            valueNumeric <= conditional.maxValue);
                        break;
                      case "outside":
                        applicable =
                          conditional.minValue === undefined ||
                          valueNumeric < conditional.minValue ||
                          conditional.maxValue === undefined ||
                          valueNumeric > conditional.maxValue;
                        break;
                      default:
                        throw new Error("unknown range");
                    }
                  }
                  break;

                case "age":
                  // check if value is set and complete.
                  if (
                    valueToCheckAgainst &&
                    !!(valueToCheckAgainst as string).match(/\d{4}-\d{2}-\d{2}/)
                  ) {
                    // derive their age in years.
                    const age = moment().diff(
                      moment(valueToCheckAgainst, "YYYY-MM-DD"),
                      "years",
                    );

                    const isFiniteNumber = (x: any) =>
                      typeof x === "number" && isFinite(x);

                    applicable = true;
                    if (
                      isFiniteNumber(conditional.maxAge) &&
                      age > conditional.maxAge
                    ) {
                      applicable = false;
                    }

                    if (
                      isFiniteNumber(conditional.minAge) &&
                      // someone aged 18 is 'over 18'.
                      age <= conditional.minAge
                    ) {
                      applicable = false;
                    }
                  } else {
                    applicable = false;
                  }

                  break;

                case "gender":
                  applicable = valueToCheckAgainst === conditional.gender;
                  break;

                case "atsi":
                  applicable = valueToCheckAgainst === conditional.atsiStatus;
                  break;

                default:
                  break;
              }

              return applicable;
            },
          );

          if (applicableArray.some((a) => a === undefined)) {
            // silent fail
            // TODO - log error
            return f;
          }

          // reduce array of booleans to a single value.
          // i.e. field is 'applicable' iff all conditions are 'applicable'.
          const applicable = applicableArray.filter((a) => !a).length === 0;

          // default to visibility control
          let approach = "visible";

          if (Array.isArray(f.conditional)) {
            // give priority to enable;
            approach = f.conditional.find((c) => c.type === "enable")
              ? "enable"
              : "visible";
          } else {
            approach = f.conditional.type;
          }
          // determine what action to take
          switch (approach) {
            // toggle visibility
            case "visible":
              if (f._visible !== applicable) {
                return {
                  ...f,
                  _visible: applicable,
                };
              }
              break;
            // toggle disabled state
            case "enable":
              if (f.disabled === applicable) {
                return {
                  ...f,
                  disabled: !applicable,
                  // in case form is submitted and field is not filled - need to restore to readOnly
                  // state after form is disabled
                  readOnly: !applicable,
                };
              }
              break;
          }
        }
        // PLACE OTHER FIELD CHECKS HERE
      }

      return f;
    });

    const fieldData: Record<string, any> = {};
    if (scoreFields.length) {
      fieldIterator(this.formFields, (f) => {
        if (f._path && f.type !== "group") {
          _.set(fieldData, f._path, f.value);
        }
      });
    }

    // compute in serial to allow one to influence the next
    scoreFields.map((f: IFormField) => {
      this.updateFields((field: IFormField) => {
        if (field !== f) {
          return field;
        }

        const newField = { ...field };
        // caters for when the form includes a root field, e.g. $questions, which might be
        // needed when needing a transformer
        const data = newField.formulaSrc
          ? fieldData[newField.formulaSrc]
          : fieldData;
        try {
          const score = notevil(newField.formula, data);
          // get the grade that matches the numerical result.
          const grade = newField.grades
            ? newField.grades.find((g) => score >= g.min && score <= g.max)
                .value
            : null;

          newField.value = {
            score,
            grade,
          };
        } catch (e) {
          // This is fine. Either the formula is incorrect, or not all required
          // fields have a value. In any case, we can't compute the score.
          console.warn("Error computing score for form:", e.message);
          return field;
        }

        return newField;
      });
    });

    return fieldsChanged;
  }

  /**
   * Register a callback listener
   */
  public registerOnChangeCallback = (callback: IOnChangeCallback) => {
    this.onChangeCallbacks.push(callback);
  };

  /**
   * Populates an empty form with data. It will automatically create new instances
   * where multi-instance fields are involved.
   *
   * The method will throw an error if the appropriate field cannot be found or - in
   * the case of multi-instance fields - generated.
   */
  public _setInitData(data: any) {
    // HACK - We should replace these values with something from the schema
    const dataMap =
      flattenForm(data, FORM_OBJECT_FIELDS, FORM_OBJECT_STRUCTURES) || {};

    // Remove labels, i.e. those where the last field starts with an underscore, e.g. foo._bar
    _.each(dataMap, (v, path) => {
      const isLabel = path.match(/\._[^.]+$/);
      if (isLabel) {
        delete dataMap[path];
      }
    });

    // Ensure the groups are instantiated
    this.updateFields((field: IFormField) => {
      // Check if this is a group we need to instantiate
      if (!isGroupField(field) || !field.allowMultiple) {
        return field;
      }

      // Check if any of the values require the groups to be initiated
      _.each(dataMap, (value, map) => {
        // Check if the map matches and, if so, capture the instance count
        const matches = map.match(field._pathRegExp);

        if (matches) {
          // Capture the instance number
          const index = parseInt(matches[1]);
          const requiredInstances = index + 1;

          // Create any missing instances if needed
          _.times(requiredInstances - field._instances.length, () => {
            field = this._createGroupInstance(field);
          });
        }
      });
      return field;
    });

    this._initialiseFields(this.formFields, dataMap);

    // ensure all data finds a place in the form
    // const discoveredPaths = this._initialiseFields(this.formFields, dataMap);

    // ensure no data was left behind
    // const missingPaths = _.difference(_.keys(dataMap), discoveredPaths);
    // if (missingPaths.length > 0) {
    //   throw new Error(
    //     "Unable to populate some values: " + missingPaths.join(", ")
    //   );
    // }
  }

  /**
   * Initialises the values for a set of fields.
   * @param {*} fields
   * @param {*} dataMap
   */
  public _initialiseFields(fields: IFormField[], dataMap: any = {}) {
    const discoveredPaths: string[] = [];
    fieldIterator(fields, (f: IFormField) => {
      if (f.type === "group") {
        f._instances.map((instance) => {
          if (_.has(dataMap, instance.statusPath)) {
            instance.status = dataMap[instance.statusPath];
            discoveredPaths.push(instance.statusPath);
          }
        });
      }

      // default value
      let initValue = _.has(f, "defaultValue") ? f.defaultValue : f.value;

      // take value from initial data object
      if (_.has(dataMap, f._path)) {
        initValue = dataMap[f._path];
        discoveredPaths.push(f._path);
        // If we automatically create another field on export, we need to pretend we discovered that field as well
        if (f.exportFilterToField) {
          discoveredPaths.push(f._filterPath);
        }
      }

      // set based on the state of another field, e.g. toggle top level question based on children being filled
      if (f.presenceCheckPath) {
        const path = computePath(f._path, f.presenceCheckPath);
        initValue = _.has(dataMap, path);
      }

      // force a certain value regardless of defaults or other conditions, e.g. update patient status
      if (_.has(f, "forceValue")) {
        initValue = f.forceValue;
      }

      // set using standard method, to allow flow on updates
      this.set(initValue, f);
    });

    return discoveredPaths;
  }

  /**
   * Disabled edits
   */
  public disable() {
    this.updateFields((f) => {
      return {
        ...f,
        disabled: true,
      };
    });
  }

  /**
   * Enables edits
   */
  public enable() {
    this.updateFields((f) => {
      return {
        ...f,
        disabled: f.readOnly,
      };
    });
  }

  /**
   * Validates the entire form.
   */
  public validate(clearOrFlagIllegalValues = false) {
    if (this.locked) {
      return Promise.reject();
    }
    // Avoid having two validations running at the same time, as the form
    // data could be corrupted
    this.locked = true;

    const promises: Promise<any>[] = [];
    const fieldErrors: { [key: string]: [] } = {};
    let errorCount = 0;

    // queue up the validations without modifying the form
    fieldIterator(this.formFields, (f) => {
      if (!f._visible || f.readOnly) {
        // if field is a group, return false to prevent iteration on children.
        if (f.type === "group") {
          return false;
        }
        return;
      }
      // don't validate illegal fields - assumes the server allows for this unrecognised/invalid value
      if (f._illegal) {
        return;
      }
      // remove required validator for illegal check
      f = {
        ...f,
        required: clearOrFlagIllegalValues ? false : !!f.required,
      };
      promises.push(
        FieldValidator(f, this.client).then((errors: any) => {
          // ensure we're always dealing with an array
          errors = errors || [];
          fieldErrors[f._id] = errors;

          if (f.allowMultiple) {
            // an array of arrays (errors) or undefined (valid)
            errorCount += _.flatten(errors).filter((x) => x).length;
          } else {
            errorCount += errors.length;
          }
        }),
      );
    });

    // modify the fields once all validation have been performed
    const updateFieldsWithErrors = () => {
      // update form with all errors
      this.updateFields((f) => {
        const errors = fieldErrors[f._id] || [];
        // check if it has an error
        const hasError = f.allowMultiple
          ? _.flatten(errors).filter((x) => x).length
          : errors.length;

        if (hasError) {
          if (clearOrFlagIllegalValues) {
            if (f.clearIllegalValue) {
              return { ...f, value: undefined };
            }
            // indicate that the field has been filled with an illegal (i.e. invalid) value
            return {
              ...f,
              _illegal: true,
            };
          }
          return {
            ...f,
            errors,
          };
        }
        // clear all errors
        return {
          ...f,
          errors,
        };
      });
    };

    // HACK - need to get jest to support finally
    const cleanup = () => {
      this.locked = false;
      updateFieldsWithErrors();
      this._notifyOnChange();
    };

    return Promise.all(promises)
      .then(() => {
        cleanup();
        return errorCount;
      })
      .catch((err) => {
        cleanup();
        console.warn(err);
        return 1;
      });
    // .finally(() => {
    //   this.locked = false;
    //   updateFieldsWithErrors();
    //   this._notifyOnChange();
    // });
  }

  /**
   * Returns a reference to the forms internal fields. Needs to be called
   * after every update to receive an up-to-date reference.
   */
  public getFields() {
    return this.formFields;
  }

  // Returns the forms data in data chunks
  public exportData() {
    const dataExport = {};

    fieldIterator(this.formFields, (f) => {
      if (!f._visible) {
        return false;
      }

      // don't export empty values (score fields are 'special')
      if ("value" in f && f.type !== "score") {
        if (f.allowMultiple ? f.value.length === 0 : f.value === null) {
          return false;
        }
      }

      // Meta-label - as used by the note conversion
      if (f.noteLabel) {
        // Prefix the field with an underscore, e.g. foo.bar => foo._bar
        const fieldLabelPath = f._path
          .replace(/\.([^.]+)$/, "._$1")
          .replace(/^([^.]+)$/, "_$1");
        _.set(dataExport, fieldLabelPath, f.noteLabel);
      }

      if (f.type !== "group") {
        if (Array.isArray(f.value)) {
          const strippedArray = f.value
            .filter((x) => x)
            .map((x) => (_.isString(x) ? _.trim(x) : x));
          _.set(dataExport, f._path, strippedArray);
          return;
        }

        // safe sanitisation
        const value = _.isString(f.value) ? _.trim(f.value) : f.value;
        _.set(dataExport, f._path, value);

        // Allow a filter to be automatically mapped as if a field itself. Avoids needing
        // to creating hidden fields to help
        if (f.exportFilterToField) {
          _.set(dataExport, f._filterPath, f.mapFilterValue);
        }
      }
      return true;
    });

    return exportDataUsingMapping(dataExport, this.dataTransformers);
  }
}

// HACK - legacy support
export default Form;
