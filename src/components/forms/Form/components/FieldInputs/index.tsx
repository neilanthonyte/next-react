import * as React from "react";

import { IFormField } from "next-shared/src/types/formTypes";

import FormInput from "../FormInput";
import FormFieldLayout from "../FormFieldLayout";

export interface IFieldInputsProps {
  fields: IFormField[];
  layout?: string | boolean;
}

/**
 * Renders a collection of fields
 * @param fields
 * @returns {*}
 * @constructor
 */
export const FieldInputs: React.FC<IFieldInputsProps> = ({
  fields,
  layout = false,
}) => (
  <FormFieldLayout layout={layout}>
    {fields.map((f) => (
      <FormInput key={f._id} field={f} />
    ))}
  </FormFieldLayout>
);
