import * as React from "react";

import { setPasswordSchema } from "./helpers/setPasswordSchema";
import { VStack } from "../../structure/VStack";
import { Form } from "../Form";

export interface ISetAccountPasswordFormProps {
  onCancel?: () => void;
  onSuccess: (password: string) => unknown;
}

/**
 * Component rendering a set password form
 */
export const SetAccountPasswordForm: React.FC<ISetAccountPasswordFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  return (
    <VStack>
      <p>
        Please set a password for your account. It is important that your
        password is strong and secure.
      </p>
      <Form
        schema={setPasswordSchema}
        onSuccess={onSuccess}
        onCancel={onCancel}
        disableOnSuccess={false}
      />
    </VStack>
  );
};
