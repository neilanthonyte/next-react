/**
 * Maps our field description to a validation object understood by validate.js.
 * For more information, see: https://validatejs.org/
 */
import * as _ from "lodash";

import { IRemoteSuggestionValidatorOptions } from "../validator/validations/remoteSuggestionValidator";
import { IFormField } from "next-shared/src/types/formTypes";
import { NextClient } from "../../../client/NextClient";
import { standardizeOptions } from "../../../helpers/standardizeOptions";

// TODO - extend from ValidateJS and build out proper definition
export interface IFieldConstraints {
  presence?: any;
  length?: any;
  format?: any;
  datetime?: any;
  dateFormat?: any;
  email?: any;
  dvaNumber?: any;
  concessionCardNumber?: any;
  medicareNumber?: any;
  phone?: any;
  mobilePhone?: any;
  numericality?: any;
  inclusion?: any;
  maxLength?: any;
  minLength?: any;
  minValue?: any;
  maxValue?: any;
  mustEqual?: any;
  remoteCheck?: any;
  remoteSuggestionValidator?: IRemoteSuggestionValidatorOptions;
  deepWithin?: {
    options: any[];
    message?: string;
  };
}

export default (field: IFormField, client: NextClient) => {
  const constraints: IFieldConstraints = {
    presence: false,
    length: {},
    format: {},
  };

  // Set some pre-configured constraints based on the field type
  switch (field.type) {
    case "date":
      constraints.dateFormat = {
        dateFormat: field.dateFormat,
      };
      constraints.datetime = {
        format: field.dateFormat,
        latest: field.maxDate,
        earliest: field.minDate,
        tooEarly: "^The chosen time is before the acceptable range",
        tooLate: "^The chosen time is after the acceptable range",
        message: "^The date is outside the acceptable range",
        notValid: "^The date is outside the acceptable range",
      };
      break;
    case "email":
      constraints.email = true;
      break;
    case "dvaNumber":
      constraints.dvaNumber = {
        message: "is not a valid DVA number",
      };
      break;
    case "concessionCardNumber":
      constraints.concessionCardNumber = {
        message: "is not a valid concession card number",
      };
      break;
    case "medicareNumber":
      constraints.medicareNumber = {
        message: "^Not a recognised Medicare card number",
      };
      break;
    case "phone":
      constraints.phone = {
        message: "is not a valid phone number.",
      };
      break;
    case "mobilePhone":
      constraints.mobilePhone = {
        message: "is not a valid mobile number.",
      };
      break;
    case "number":
      constraints.numericality = true;
      break;
    case "options":
      {
        /**
         * If remote suggestion validation is enabled, we do not want to do the default validation.
         * This responsibility is shifted to services.
         */
        if (field.remoteSuggestionValidator) {
          break;
        }
        // TODO - if remote prop validator here, do not validate
        // Standardize options into label value pair.
        // TODO use StdOptions<T>
        const options: any = standardizeOptions(field.options);

        // Build acceptable values array. Can't use map because we require false values in array.
        const within = [""];
        _.each(options, (o) => {
          if (
            // For object use the value key.
            _.isPlainObject(o) &&
            Object.prototype.hasOwnProperty.call(o, "value")
          ) {
            within.push(o.value);
          } else if (typeof o === "string") {
            // If it's a string we just use the value.
            within.push(o);
          }
          // All other cases will be ignored.
        });

        // Add allowable values to constrains.
        constraints.deepWithin = {
          options: within,
          message: "is not a recognised option",
        };
      }
      break;
    case "acceptLegals":
      constraints.mustEqual = {
        value: true,
        message: "^Please accept to continue",
      };
      break;
    default:
      break;
  }

  // Apply field-based validations
  for (const k in field) {
    //@ts-ignore
    const v = field[k];
    switch (k) {
      case "required":
        if (field.required)
          constraints.presence = {
            allowEmpty: false,
            message: field.requiredMessage
              ? // always assume we want to replace the whole message (by adding the '^')
                `^${field.requiredMessage.replace(/^\^/, "")}`
              : null,
          };
        break;
      case "pattern":
        constraints.format = {
          pattern: field.pattern,
          message: field.patternMessage
            ? // always assume we want to replace the whole message (by adding the '^')
              `^${field.patternMessage.replace(/^\^/, "")}`
            : null,
        };
        break;
      case "format":
        constraints.format = field.format;
        break;
      case "minLength":
        constraints.length.minimum = field.minLength;
        constraints.length.tooShort = "^The minimum length is " + v;
        break;
      case "maxLength":
        constraints.length.maximum = v;
        constraints.length.tooLong = "^The maximum length is " + v;
        break;
      case "minValue":
      case "maxValue":
        constraints.numericality = {};
        if (k === "minValue") {
          constraints.numericality.greaterThanOrEqualTo = parseFloat(v);
        }
        if (k === "maxValue") {
          constraints.numericality.lessThanOrEqualTo = parseFloat(v);
        }
        break;
      case "mustEqual":
        constraints.mustEqual = {
          value: field.mustEqual,
          message: field.mustEqualMessage || "is not valid",
        };
        constraints.presence = {
          allowEmpty: false,
          message: field.mustEqualMessage || "is not valid",
        };
        break;
      case "remoteSuggestionValidator":
        constraints.remoteSuggestionValidator = {
          client: client,
          suggestionName: v,
        };
        break;
      case "remoteCheck":
        constraints.remoteCheck = {
          url: field.remoteCheck,
          message: field.remoteMessage || "is not valid",
        };
        break;
      default:
        break;
    }
  }

  // Removed fields that weren't set, e.g. format, length
  return _.omitBy(constraints, (n) => _.isObject(n) && _.isEmpty(n));
};
