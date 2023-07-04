import * as React from "react";

import { IFormSchema } from "next-shared/src/types/formTypes";

import { Form } from "../../forms/Form";

export const pinSchema: IFormSchema = [
  {
    type: "pin",
    label: "Access code",
    map: "accessCode",
    required: true,
    length: 8,
  },
];

export interface ILoginPinFormData {
  accessCode: string;
}

export interface ILoginPinFormProps {
  onSubmit?: (data: ILoginPinFormData) => any;
}

export const LoginPinForm: React.FC<ILoginPinFormProps> = ({ onSubmit }) => {
  return (
    <Form
      schema={pinSchema}
      disableOnSuccess={false}
      onSuccess={onSubmit || null}
      submitLabel="Login"
    />
  );
};
