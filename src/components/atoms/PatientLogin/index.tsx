import * as React from "react";
import { useState, useCallback, useMemo } from "react";

import {
  NextAccountLinkError,
  NextInvalidTwoFactorCodeError,
} from "next-shared/src/helpers/errorTypes";

import { LoginForm, ICredentials } from "../../forms/LoginForm";
import { useClient } from "../../../hooks/useClient";
import { Form } from "../../forms/Form";
import { VStack } from "../../structure/VStack";
import {
  ErrorMessage,
  MessageTitle,
  SuccessMessage,
  MessageBody,
} from "../../generic/Message";
import { StaticLogo } from "../../branding/StaticLogo";

import {
  IResetPasswordContextValue,
  ResetPasswordContext,
} from "../../../contexts/ResetPasswordContext";
import { Icon } from "../../generic/Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { resetPasswordSchema } from "./helpers/resetPasswordSchema";
import { twoFactorSchema } from "./helpers/twoFactorSchema";

const css = cssComposer(styles, "PatientLogin");

const DEFAULT_MESSAGE =
  "Please log into your Next Practice account using your email and password.";

export enum EPatientLoginMode {
  Standalone = "Standalone",
  Companion = "Companion",
}

export interface IPatientLoginProps {
  prefill?: ICredentials;
  emailPlaceholder?: string;
  title?: string;
  message?: string;
  onSkip?: () => void;
  skipLabel?: string;
  onLoginSuccess?: (args?: unknown) => unknown;
  loginMode?: EPatientLoginMode;
  showLogo?: boolean;
}

/**
 * Handles the patient login process including:
 * - two factor verification
 * - password reset process
 */
export const PatientLogin: React.FC<IPatientLoginProps> = ({
  prefill,
  message = DEFAULT_MESSAGE,
  onSkip,
  skipLabel = "Skip",
  title = "Log into Next Practice",
  onLoginSuccess,
  loginMode = EPatientLoginMode.Standalone,
  showLogo = true,
  emailPlaceholder,
}) => {
  const client = useClient();
  const [creds, setCreds] = useState<ICredentials>();
  const [loginError, setLoginError] = useState<string>();

  const login = useCallback(async (data: ICredentials) => {
    setLoginError(null);
    try {
      await client.auth
        .sendLoginTwoFactorCode(data.email, data.password)
        .then(() => {
          setCreds(data);
        });
    } catch (e) {
      setLoginError(e.message);
    }
  }, []);

  const submitTwoFactor = useCallback(
    async (data: any) => {
      setLoginError(null);
      try {
        if (loginMode === "Companion") {
          await client.auth.loginAsPatientAndLinkOnCompanion(
            creds.email,
            creds.password,
            data.twoFactor,
          );
        } else {
          await client.auth.loginAsPatient(
            creds.email,
            creds.password,
            data.twoFactor,
          );
        }
        onLoginSuccess && onLoginSuccess();
      } catch (e) {
        // specific errors with messages
        if (
          e instanceof NextInvalidTwoFactorCodeError ||
          e instanceof NextInvalidTwoFactorCodeError ||
          e instanceof NextAccountLinkError
        ) {
          setLoginError(e.message);
          return;
        }
        throw e;
      }
    },
    [creds, onLoginSuccess, loginMode],
  );

  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const resetPasswordValue: IResetPasswordContextValue = useMemo(
    () => ({
      onForgotPassword: () => setResetPassword(true),
    }),
    [],
  );

  const onSendPasswordReset = useCallback(
    (formData: any) => {
      if (formData.email) {
        client.patients.sendPasswordResetToken(formData.email);
      }
      setEmailSent(true);
    },
    [client],
  );

  const reset = useCallback(() => {
    setEmailSent(false);
    setResetPassword(false);
  }, []);

  const getContent = () => {
    if (resetPassword) {
      const Back = () => (
        <p>
          <a onClick={reset}>
            <Icon name="chevron-left" /> Back
          </a>
        </p>
      );

      if (emailSent) {
        return (
          <>
            <Back />
            <SuccessMessage>
              <MessageBody>
                If the provided email address exist in our system an email will
                be sent shortly. Please check your inbox.
              </MessageBody>
            </SuccessMessage>
          </>
        );
      }
      return (
        <>
          <Back />
          <p>Please enter the email address associated to your account:</p>
          <Form schema={resetPasswordSchema} onSuccess={onSendPasswordReset} />
        </>
      );
    }
    if (creds) {
      return (
        <>
          <p>Please enter the two factor code you were sent:</p>
          <Form
            schema={twoFactorSchema}
            onSuccess={submitTwoFactor}
            disableOnSuccess={false}
          />
          {!!loginError && (
            <ErrorMessage>
              <MessageTitle>{loginError}</MessageTitle>
            </ErrorMessage>
          )}
        </>
      );
    }
    return (
      <>
        <LoginForm
          onSubmit={login}
          prefill={prefill}
          cancel={{
            label: skipLabel,
            onCancel: onSkip,
          }}
          emailPlaceholder={emailPlaceholder}
        />
        {!!loginError && (
          <ErrorMessage>
            <MessageTitle>{loginError}</MessageTitle>
          </ErrorMessage>
        )}
      </>
    );
  };

  return (
    <div className={css("")}>
      <ResetPasswordContext.Provider value={resetPasswordValue}>
        <VStack>
          {showLogo && (
            <div className={css("logo")}>
              <StaticLogo
                variant="landscape"
                colorScheme="color"
                fileType="svg"
              />
            </div>
          )}
          {(message || title) && (
            <div className={css("message")}>
              {!!title && <h3>{title}</h3>}
              {!!message && <p>{message}</p>}
            </div>
          )}
          {getContent()}
        </VStack>
      </ResetPasswordContext.Provider>
    </div>
  );
};
