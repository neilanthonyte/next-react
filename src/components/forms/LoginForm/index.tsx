import * as React from "react";

import { IFormSchema } from "next-shared/src/types/formTypes";

import { Form } from "../../forms/Form";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";

export const userPassSchema = (emailPlaceholder: string): IFormSchema => [
  {
    type: "email",
    label: "Email",
    map: "email",
    required: true,
    hideKeypad: true,
    placeholder: emailPlaceholder,
  },
  {
    type: "password",
    label: "Password",
    map: "password",
    required: true,
  },
];

export interface ICredentials {
  email: string;
  password: string;
}

export interface ILoginFormProps {
  onSubmit?: (data: ICredentials) => any;
  cancel?: {
    label: string;
    onCancel: () => any;
  };
  prefill?: ICredentials;
  emailPlaceholder?: string;
}

export const LoginForm: React.FC<ILoginFormProps> = ({
  onSubmit,
  cancel,
  prefill = null,
  emailPlaceholder,
}) => {
  // allow filling from URL
  prefill = prefill
    ? prefill
    : (urlParamsToObject() as unknown as ICredentials);

  return (
    <Form
      schema={userPassSchema(emailPlaceholder)}
      disableOnSuccess={false}
      onSuccess={onSubmit || null}
      data={prefill}
      onCancel={cancel?.onCancel}
      cancelLabel={cancel?.label}
      submitLabel="Login"
    />
  );
};
