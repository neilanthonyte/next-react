import * as React from "react";
import { useMemo } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { Form } from "../Form";
import { AltButton } from "../../generic/Button";
import { VStack } from "../../structure/VStack";
import { twoFactorAuthenticationSchema } from "./helpers/twoFactorAuthenticationSchema";

interface ITwoFactorAuthenticationFormProps {
  onSuccess: (formData: any) => void;
  onCancel?: () => void;
  onResend: () => Promise<unknown>;
}

/**
 * Component rendering two factor code input form with option to resend
 */
export const TwoFactorAuthenticationForm: React.FC<
  ITwoFactorAuthenticationFormProps
> = ({ onResend, onSuccess, onCancel }) => {
  return useMemo(
    () => (
      <VStack>
        <p>
          Please enter the 7 digit authentication code. It might take a moment
          for the sms to be sent.
        </p>
        <p>
          If you are still waiting for the sms, try and{" "}
          <AltButton
            size={EStandardSizes.Small}
            disableOnSuccess={false}
            onClick={onResend}
          >
            Resend code
          </AltButton>
        </p>
        <Form
          schema={twoFactorAuthenticationSchema}
          onSuccess={onSuccess}
          onCancel={onCancel}
          disableOnSuccess={false}
        />
      </VStack>
    ),
    [onResend],
  );
};
