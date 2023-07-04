import * as _ from "lodash";

import validator from "./validator";
import { IFormField } from "next-shared/src/types/formTypes";
import { NextClient } from "../../client/NextClient";
import buildValidationDefinition from "./helpers/buildValidationDefinition";

/**
 * Validates a field based on its description. For multi-value fields, any field-level errors
 * are provided at index 0. All value-based errors are provided there after.
 *
 * @param field the field to validate
 * @param client a NextClient instance
 * @returns {Promise<*>}
 */
export const FieldValidator = async (field: IFormField, client: NextClient) => {
  // clone to not impact the original object
  field = { ...field };

  if (field.suggestion) {
    const res = await client.suggestions.getSuggestionData(field.suggestion);
    field.options = res.data;
  }
  // maps our field description to one understood by validator.js
  const constraints = buildValidationDefinition(field, client);

  // field-level checks for multi-values
  if (field.allowMultiple) {
    // presence for a multi-value field requires checking it has at least one value
    if (constraints.presence && field.value.length === 0) {
      return [["Please provide at least one value"]];
    }
  }

  async function validateData(value: any) {
    try {
      await validator.async(
        {
          theValue: value,
        },
        {
          theValue: constraints,
        },
      );
    } catch (e) {
      console.error("Error during validation, check FieldValidator", e);
      return e.theValue;
    }
  }

  const presenceError = validator.single(
    field.allowMultiple ? _.first(field.value) : field.value,
    {
      presence: {
        allowEmpty: false,
      },
    },
  );
  const isPresent = _.isUndefined(presenceError);

  // skip validation if not required and not present
  if (constraints.presence || isPresent) {
    if (field.allowMultiple) {
      // first slot is reserved for field-level errors
      return Promise.all(
        field.value.map((value: any) => validateData(value)),
      ).then((errors) => [null].concat(errors));
    }
    return validateData(field.value);
  }
};
