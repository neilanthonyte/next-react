import * as React from "react";
import { useState, useCallback } from "react";

import { NextClient } from "next-react/src/client/NextClient";
import { Form } from "next-react/src/components/forms/Form";
import {
  ErrorMessage,
  MessageBody,
  SuccessMessage,
  MessageTitle,
} from "next-react/src/components/generic/Message";
import { NextAppHandlerWeb } from "next-react/src/components/handlers/NextAppHandlerWeb";
import { NextInvalidTwoFactorCodeError } from "next-shared/src/helpers/errorTypes";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import { newPasswordSchema, twoFactorSchema } from "./helpers/schemas";
import { useClient } from "../../hooks/useClient";
import { useTimeout } from "../../hooks/useTimeout";

interface IInnerProps {
  token: string;
}

/**
 * Handles password resetting.
 */
const Inner: React.FC<IInnerProps> = ({ token }) => {
  const [step, setStep] = useState<number>(0);
  const [password, setPassword] = useState<string>();
  const [mobile, setMobile] = useState<string>();
  const [showResend, setShowResend] = useState<boolean>(false);
  const [timeOfLastResend, setTimeOfLastResend] = useState(null);
  const [error, setError] = useState<string>(null);

  const client = useClient() as unknown as NextClient;

  /**
   * Thanks to the nature of hooks, we just add this hook into our component,
   * and whenever `timeOfLastResend` is set, it will cause a re-render,
   * which will inturn then recall this hook with the new timeOfLastResend.
   */
  useTimeout(
    () => setShowResend(true),
    timeOfLastResend === null ? null : timeOfLastResend + 30000,
  );

  const sendTwoFactor = useCallback(async () => {
    setError(null);
    setShowResend(false);
    const { mobile } = await client.patients.sendPasswordResetTwoFactorCode(
      token,
    );
    setMobile(mobile);
    setTimeOfLastResend(Date.now());
  }, [token]);

  const handlePasswordSubmit = useCallback(
    async ({ password }) => {
      setError(null);

      // HACK perform via the form schema (see schema)
      const strongEnough = await client.auth.checkPasswordStrength(
        "Patient",
        password,
      );
      if (!strongEnough) {
        setError(
          "Your password is not strong enough. Please add characters or use numbers/special characters",
        );
        return;
      }
      await sendTwoFactor();
      setPassword(password);
      setStep(1);
    },
    [token],
  );

  const handleTwoFactor = useCallback(
    async ({ twoFactorCode }) => {
      setError(null);
      try {
        await client.patients.resetPassword(token, twoFactorCode, password);
      } catch (error) {
        if (error instanceof NextInvalidTwoFactorCodeError) {
          setError("Incorrect two factor auth code");
          return;
        }
        throw error;
      }
      setStep(2);
    },
    [token, password],
  );

  if (step === 0) {
    return (
      <>
        <Form
          title="Please set a new password"
          schema={newPasswordSchema}
          onSuccess={handlePasswordSubmit}
          disableOnSuccess={false}
          submitLabel="Next"
          key="form-1"
        />
        {!!error && (
          <ErrorMessage>
            <MessageBody>{error}</MessageBody>
          </ErrorMessage>
        )}
      </>
    );
  }

  if (step === 1) {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          A text message with your authentication code has been sent to a mobile
          ending in <b>{mobile}</b>
          <br />
          {showResend && (
            <React.Fragment>
              <br />
              <i>
                If you have not received your authentication code,{" "}
                <a href="javascript:void(0)" onClick={sendTwoFactor}>
                  click here
                </a>{" "}
                to resend it.
              </i>
            </React.Fragment>
          )}
        </div>
        <Form
          title="Two Factor Code"
          schema={twoFactorSchema}
          onSuccess={handleTwoFactor}
          /**
           * HACK: In the future it would better if we could properly display an error message directing the user to check if the code matches.
           *
           * In the event that a patient enters the wrong 2 factor code, we do no want to lock down the UI from them re-entering their two factor code.
           * This `disableOnSuccess` prop will allow them to re-enter their code.
           */
          disableOnSuccess={false}
          submitLabel="Verify"
          key="form-2"
        />
        {!!error && (
          <ErrorMessage>
            <MessageBody>{error}</MessageBody>
          </ErrorMessage>
        )}
      </div>
    );
  }

  if (step === 2) {
    return (
      <SuccessMessage>
        <MessageTitle>Success</MessageTitle>
        <MessageBody>Your password has been reset.</MessageBody>
      </SuccessMessage>
    );
  }
};

interface IPasswordResetProps {
  token?: string;
}

export const PasswordReset: React.FC<IPasswordResetProps> = (props) => {
  const config = {
    ...props,
    ...urlParamsToObject(),
  };
  if (config.token === null) {
    return <div>A reset token is required.</div>;
  }
  return (
    <NextAppHandlerWeb>
      <Inner token={config.token} />
    </NextAppHandlerWeb>
  );
};
