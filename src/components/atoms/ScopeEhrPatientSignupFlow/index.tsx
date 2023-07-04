import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { useMutation } from "react-query";
import { CSSTransition } from "react-transition-group";

import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import {
  NextInvalidTwoFactorCodeError,
  NextOnboardError,
  NextSessionWeakPasswordError,
} from "next-shared/src/helpers/errorTypes";

import { useClient } from "../../../hooks/useClient";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { defaultTransition } from "../../../helpers/cssTransitions";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ErrorMessage } from "../../generic/Message";
import { SendTwoFactorAuthenticationCode } from "./components/SendTwoFactorAuthenticationCode";
import { CompleteAccount } from "./components/CompleteAccount";
import { VStack } from "../../structure/VStack";
import { StaticLogo } from "../../branding/StaticLogo";
import { TwoFactorAuthenticationForm } from "../../forms/TwoFactorAuthenticationForm";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
export const css = cssComposer(styles, "ScopeEhrPatientSignupFlow");

enum EAccessCodeSignupStage {
  AccessCode = "AccessCode",
  TwoFactorAuthentication = "TwoFactorAuthentication",
  Credentials = "Credentials",
}

export interface IScopeEhrPatientSignupFlowProps {
  onSuccess?: (session: Session) => void;
}

/**
 * Components handling signup flow in the context of a scope
 * where there is an ehrPatient with an access code
 * It requires an ehrPatient with an access code in session
 */
export const ScopeEhrPatientSignupFlow: React.FC<
  IScopeEhrPatientSignupFlowProps
> = ({ onSuccess }) => {
  const { ehrPatient } = useSyncedSessionData();
  const client = useClient();

  const accessCode = ehrPatient?.appAccessCode;
  if (!accessCode) {
    console.warn("ehrPatient with an access code required in session.");
  }

  const [stage, setStage] = useState<EAccessCodeSignupStage>(
    EAccessCodeSignupStage.AccessCode,
  );
  const [twoFACode, setTwoFACode] = useState<string>();
  const [pendingPatient, setPendingPatient] = useState<fhir3.Patient>(null);
  const isResend = useRef<boolean>(false);

  const [sendTwoFactorCode, sendTwoFactorCodeStatus] = useMutation<void, Error>(
    () => client.patientApp.sendInviteSignupTwoFactorCode(accessCode),
    {
      onSuccess: () => {
        if (isResend.current === true) return;
        // reset stage. transition to next is handled by CssTransition component
        setStage(null);
        isResend.current = true;
      },
    },
  );

  const [
    verifyInviteSignupTwoFactorCode,
    verifyInviteSignupTwoFactorCodeStatus,
  ] = useMutation<fhir3.Patient, Error, { twoFACode: string }>(
    ({ twoFACode }) =>
      client.patientApp.verifyInviteSignupTwoFactorCode(accessCode, twoFACode),
    {
      // use the submitted twoFACode coming in from mutate parameters, not the component state
      onSuccess: (fhirPatient, { twoFACode: submittedTwoFACode }) => {
        setPendingPatient(fhirPatient);
        setTwoFACode(submittedTwoFACode);
        // reset stage. transition to next is handled by CssTransition component
        setStage(null);
      },
    },
  );

  const [
    createPatientAccountFromEhrInScope,
    createPatientAccountFromEhrInScopeStatus,
  ] = useMutation<
    void | Session,
    Error,
    {
      password: string;
      email: string;
      accessCode: string;
      twoFACode: string;
      hasConsented?: boolean;
    }
  >(
    ({ password, email, accessCode, twoFACode }) =>
      client.patients.createPatientAccountFromEhrInScope(
        password,
        email,
        accessCode,
        twoFACode,
        // based on the form collecting consent
        true,
      ),
    { onSuccess },
  );

  const handleCredentials = useCallback(
    async (formResponse) => {
      if (!formResponse) return;
      const { email, password } = formResponse;
      await createPatientAccountFromEhrInScope({
        password,
        email,
        accessCode,
        twoFACode,
        // assume the form prompted the patient correctly
        hasConsented: true,
      });
    },
    [accessCode, twoFACode],
  );

  const errorMessage = useMemo<string>(() => {
    let message: string;
    if (verifyInviteSignupTwoFactorCodeStatus.error) {
      const { error } = verifyInviteSignupTwoFactorCodeStatus;
      message =
        "We are unable to verify the authentication code in at this time. Please try again.";
      if (error instanceof NextInvalidTwoFactorCodeError && error.message) {
        message = error.message;
      }
    }
    if (sendTwoFactorCodeStatus.error) {
      message =
        "We are unable to send you an authentication code at this time. Please try again.";
    }
    if (createPatientAccountFromEhrInScopeStatus.error) {
      const { error } = createPatientAccountFromEhrInScopeStatus;
      if (error instanceof NextOnboardError) {
        message = error.message;
      } else if (error instanceof NextSessionWeakPasswordError) {
        message =
          "Your password is too simple or common. Please consider using special characters or increase the length to improve the strength.";
      } else {
        message =
          "We are unable to create an account at this time. Please try again. If the problem persists, please ask a staff member for assistance.";
      }
    }
    return message;
  }, [
    verifyInviteSignupTwoFactorCodeStatus.error,
    sendTwoFactorCodeStatus.error,
    createPatientAccountFromEhrInScopeStatus.error,
  ]);

  return (
    <div className={css("")}>
      <VStack>
        <div className={css("logo")}>
          <StaticLogo variant="square" colorScheme="color" fileType="svg" />
        </div>
        <LoadingBlock isLoading={!ehrPatient?.appAccessCode}>
          <CSSTransition
            in={stage === EAccessCodeSignupStage.AccessCode}
            onExited={() =>
              setStage(EAccessCodeSignupStage.TwoFactorAuthentication)
            }
            classNames={defaultTransition}
            timeout={300}
            unmountOnExit
          >
            <SendTwoFactorAuthenticationCode onSendCode={sendTwoFactorCode} />
          </CSSTransition>
          <CSSTransition
            in={stage === EAccessCodeSignupStage.TwoFactorAuthentication}
            onExited={() => setStage(EAccessCodeSignupStage.Credentials)}
            classNames={defaultTransition}
            timeout={300}
            unmountOnExit
          >
            <TwoFactorAuthenticationForm
              onResend={sendTwoFactorCode}
              onSuccess={verifyInviteSignupTwoFactorCode}
            />
          </CSSTransition>
          <CSSTransition
            in={stage === EAccessCodeSignupStage.Credentials}
            classNames={defaultTransition}
            timeout={300}
            unmountOnExit
          >
            <CompleteAccount
              patient={pendingPatient}
              onSuccess={handleCredentials}
            />
          </CSSTransition>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </LoadingBlock>
      </VStack>
    </div>
  );
};
