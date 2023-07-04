import * as React from "react";
import { useMemo, useEffect } from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";
import { FhirPersonUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPersonUtil";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { ICheckForMatchingPatientResult } from "next-shared/src/types/ICheckForMatchingPatientResult";

import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";
import { useClient } from "../../../hooks/useClient";
import { PatientAccountCreationForm } from "../PatientAccountCreationForm";
import { PatientLogin } from "../../atoms/PatientLogin";
import { Footer } from "../../abstract/Footer";

export interface IMatchingPatientResultHandler {
  result: ICheckForMatchingPatientResult;
  onCancel: () => void;
  onAuthenticated: () => void;
  onSkipAccountCreation?: () => void;
  patient?: fhir3.Patient;
  autoClose?: boolean;
}

/**
 * Wrapper component handling the 3 different outcome when trying to create a new account
 *
 * handles:
 * 1. matching email => login or cancel
 * 2. matching identifiers => login or proceed as guest
 * 3. setting password => create a new Next Practice account
 */
export const MatchingPatientResultHandler: React.FC<
  IMatchingPatientResultHandler
> = ({
  result,
  onCancel,
  onSkipAccountCreation,
  onAuthenticated,
  patient,
  autoClose,
}) => {
  const client = useClient();

  useEffect(() => {
    if (!result && autoClose && client.auth.session && client.auth.session.id) {
      onCancel();
    }
  }, [client.auth.session, autoClose, result]);

  const { title, content } = useMemo(() => {
    if (!result) return { title: null, content: null };

    const email = patient
      ? fhirUtil<FhirPersonUtil>(patient).getPrimaryEmail()
      : null;

    if (result.emailMatch) {
      return {
        title: "Email already in use",
        content: (
          <PatientLogin
            message="The email you entered is already in use. If you already have an account, please log in."
            onSkip={onCancel}
            skipLabel="Cancel"
            prefill={{ email, password: null }}
            onLoginSuccess={onAuthenticated}
          />
        ),
      };
    }

    if (result.identifiersMatch) {
      return {
        title: "Matching account",
        content: onSkipAccountCreation ? (
          <>
            <PatientLogin
              message="You appear to already be a patient of this clinic. Please log in to continue."
              onSkip={onSkipAccountCreation}
              skipLabel="Proceed as a guest"
              prefill={{ email, password: null }}
              onLoginSuccess={onAuthenticated}
            />
            <Footer onCancel={onCancel} />
          </>
        ) : (
          <PatientLogin
            message="You appear to already be a patient of this clinic. Please log in to continue."
            onSkip={onCancel}
            skipLabel="Cancel"
            prefill={{ email, password: null }}
            onLoginSuccess={onAuthenticated}
          />
        ),
      };
    }
    return {
      title: "Account security",
      content: (
        <PatientAccountCreationForm
          patient={patient}
          onAuthenticatedWithNewAccount={onAuthenticated}
          onCancel={onCancel}
        />
      ),
    };
  }, [result, patient, onCancel, onAuthenticated, onSkipAccountCreation]);

  return (
    <Modal
      open={!!result}
      onClose={onCancel}
      size={TDialogSizes.Medium}
      showCloseIcon={false}
    >
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
    </Modal>
  );
};
