import { IInput } from "next-shared/src/types/formTypes";

export const pseudoInputs: { [key: string]: IInput } = {
  postcode: {
    type: "textNumber",
    formatters: [
      {
        formatPattern: /^(\w{4})$/,
        formatBlueprint: "$1",
        formatFilter: /[\s-]+$/,
      },
    ],
    maxLength: 4,
    format: {
      pattern: /^(\d{4})$/,
      message: "must be a 4 digit number",
    },
  },
  individualHealthcareIdentifier: {
    type: "textNumber",
    formatters: [
      {
        maxLength: 16,
      },
    ],
    format: {
      pattern: /^\d+$/,
      message: "is not a valid Individual Healthcare Identifier",
    },
    maxLength: 16,
    minLength: 16,
  },
};

/**
 * Recursively iterates over the entire object, including nested objects and substitutes the pseudo field details
 */
export const substitutePseudoFields = (schema: any[]) =>
  schema.map((field) => {
    const transformation = pseudoInputs[field.type];
    // create a new object, regardless of whether we are modifying at this stage
    // as we may update it later in the function.
    const newField = transformation
      ? {
          ...field,
          ...transformation,
        }
      : {
          ...field,
        };
    // replace children with updated children
    if (newField.fields) {
      newField.fields = substitutePseudoFields(newField.fields);
    }
    return newField;
  });
