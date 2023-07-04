import * as React from "react";
import { useCallback, useRef, useState } from "react";

import {
  NextInvalidTwoFactorCodeError,
  NextSessionWeakPasswordError,
} from "next-shared/src/helpers/errorTypes";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";
import { useMutation } from "react-query";

import { LoadingBlock } from "../../structure/LoadingBlock";
import { useClient } from "../../../hooks/useClient";
import { ErrorMessage, MessageBody } from "../../generic/Message";
import { TwoFactorAuthenticationForm } from "../../forms/TwoFactorAuthenticationForm";
import { SetAccountPasswordForm } from "../../forms/SetAccountPasswordForm";

export interface IPatientAccountCreationForm {
  /** called after the user is authenticated with a newly created account */
  onAuthenticatedWithNewAccount?: () => void;
  /** callback on cancel */
  onCancel?: () => void;
  /** the temp patient details used to create the account */
  patient: fhir3.Patient;
}

/**
 * Component rendering a set password form and handling account creation for a given patient
 */
export const PatientAccountCreationForm: React.FC<
  IPatientAccountCreationForm
> = ({ onAuthenticatedWithNewAccount, onCancel, patient }) => {
  if (!patient) {
    console.warn("PatientAccountCreationForm requires a valid patient");
  }

  const client = useClient();

  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<string>();

  const isResend = useRef<boolean>(false);

  const email = patient
    ? fhirUtil<FhirPatientUtil>(patient).getPrimaryEmail()
    : null;

  const [sendTwoFactorCode] = useMutation<any, Error, string>(
    () => client.auth.sendLoginTwoFactorCode(email, password),
    {
      onSuccess: () => {
        if (isResend.current === true) return;
        isResend.current = true;
      },
      onError: () =>
        setError(
          "We are unable to send you an authentication code at this time. Please try again.",
        ),
    },
  );

  const handleSetPassword = useCallback(async (data) => {
    if (!data) return;
    const { password } = data;
    if (!password) return;
    setError(null);
    try {
      await client.patients.createPatientAccount(password, patient, true);
    } catch (error) {
      if (error instanceof NextSessionWeakPasswordError) {
        setError(
          "The password you entered is not strong enough. Please consider adding extra words or numbers/special characters",
        );
        return;
      }
      // TODO maybe better error handling? this will be handled
      // by the form and displayed as a generic message suggesting to refresh the window
      // bubble error up
      throw error;
    }
    // successful, set password to render 2FA input
    setPassword(password);
    sendTwoFactorCode();
  }, []);

  const handleTwoFactor = useCallback(
    async (data) => {
      if (!data) return;
      const { twoFACode } = data;

      if (!twoFACode) return;
      setError(null);
      try {
        await client.auth.loginAsPatient(email, password, twoFACode);
      } catch (error) {
        if (error instanceof NextInvalidTwoFactorCodeError) {
          setError(error.message);
          return;
        }
        // TODO maybe better error handling? this will be handled
        // by the form and displayed as a generic message suggesting to refresh the window
        // bubble error up
        throw error;
      }

      // callback on success
      if (
        onAuthenticatedWithNewAccount &&
        typeof onAuthenticatedWithNewAccount === "function"
      ) {
        onAuthenticatedWithNewAccount();
      }
    },
    [password, onAuthenticatedWithNewAccount, email],
  );

  const handleResend = useCallback(async () => {
    //  reset error in case it was set before on incorrect code
    setError(null);
    await sendTwoFactorCode();
  }, []);

  return (
    <LoadingBlock isLoading={!patient}>
      {password ? (
        <TwoFactorAuthenticationForm
          onSuccess={handleTwoFactor}
          onCancel={onCancel}
          onResend={handleResend}
        />
      ) : (
        <SetAccountPasswordForm
          onSuccess={handleSetPassword}
          onCancel={onCancel}
        />
      )}

      {!!error && (
        <ErrorMessage>
          <MessageBody>{error}</MessageBody>
        </ErrorMessage>
      )}
    </LoadingBlock>
  );
};
