import * as _ from "lodash";
import { IFormSchema } from "next-shared/src/types/formTypes";

/**
 * Checks if a styleForm schema is valid.
 * Checks if a set of fields is valid, including subfields.
 *
 * @param fields
 * @returns {boolean}
 */
export const verifySchema = (fields: IFormSchema) => {
  // TODO: check conditional fields exist in schema
  // TODO: check filter field if '@' included in path name
  // TODO: check non-dynamic fields (e.g. @) don't have clashing names

  // const names = fields.filter(v => v.type !== "group").map(v => v.map);
  // if (names.length !== _.uniq(names).length)
  //   throw new Error("Duplicate map for inputs");

  fields.map((v) => {
    // TODO: check that properties are restricted to certain types
    // if (v.type !== "numbers") {
    // }
    if (v.type === "passwordConfirm") {
      if (!_.has(v, "required")) {
        throw new Error("The type passwordConfirm must be required");
      }
    }
    if ("conditional" in v) {
      const conditionals = Array.isArray(v.conditional)
        ? v.conditional
        : [v.conditional];

      conditionals.forEach((conditional) => {
        // ensure it has at least one comparison
        if (
          [
            "isPresent",
            "match",
            "matchAny",
            "minValue",
            "maxValue",
            "maxAge",
            "minAge",
            "gender",
            "atsiStatus",
          ].some((x) => x in conditional)
        ) {
          // fine
        } else {
          throw new Error("Missing comparison details for conditional");
        }
      });
    }
    if (v.type === "group") {
      if (!v.fields) {
        throw new Error("Missing fields for group type");
      }
      if (v.allowMultiple && !v.map) {
        throw new Error(
          "Groups that allow for multiple instances must have a map name",
        );
      }
      verifySchema(v.fields);
    } else {
      // exclude presentation forms
      if (["heading", "divider"].indexOf(v.type) === -1 && !v.map) {
        throw new Error("All inputs must have a mapping");
      }
    }
  });

  return true;
};
