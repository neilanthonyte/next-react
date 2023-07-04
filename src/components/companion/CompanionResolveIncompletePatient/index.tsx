import * as React from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { EhrPatientForm } from "../EhrPatientForm";
import { EInclude } from "../../../types/IPersonalDetails";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";

export interface ICompanionResolveIncompletePatientProps {}

/**
 * Forcefully collects the missing demographic details for a patient.
 */
export const CompanionResolveIncompletePatient: React.FC<
  ICompanionResolveIncompletePatientProps
> = ({ children }) => {
  const { ehrPatient } = useSyncedSessionData();
  const fhirPatient = ehrPatient?.fhir
    ? fhirUtil<FhirPatientUtil>(ehrPatient.fhir)
    : null;
  const missingDetails = fhirPatient?.getMissingNextDetails();

  const details = missingDetails?.length > 0 ? missingDetails.join(", ") : null;

  return (
    <>
      <Modal
        open={missingDetails?.length > 0}
        onClose={null}
        size={TDialogSizes.Medium}
      >
        <ModalHeader>Before we start...</ModalHeader>
        <ModalBody>
          <p>
            Your account is missing some details that are required before we can
            proceed.{" "}
            {!!details && (
              <span>
                Please ensure you fill out: <strong>{details}</strong>
              </span>
            )}
          </p>
          <EhrPatientForm
            missingDetails={missingDetails}
            include={{
              basics: EInclude.Required,
            }}
          />
        </ModalBody>
      </Modal>
      {children}
    </>
  );
};
