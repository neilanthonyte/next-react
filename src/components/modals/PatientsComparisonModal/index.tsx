import * as React from "react";

import { IPatientDataSection } from "next-shared/src/types/IPatientDataSection";
import { TDialogSizes } from "next-shared/src/types/dialogs";

import { PatientsComparison } from "../../atoms/PatientsComparison";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";

export interface IPatientsComparisonModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (patient: fhir3.Patient) => Promise<void>;
  sections: IPatientDataSection[];
  nextPatient: fhir3.Patient;
  ehrPatient: fhir3.Patient;
  ehrId: string;
}

export const PatientsComparisonModal: React.FC<
  IPatientsComparisonModalProps
> = ({ open, onClose, onSave, sections, nextPatient, ehrPatient, ehrId }) => {
  return (
    <Modal open={open} onClose={onClose} size={TDialogSizes.Large}>
      <ModalHeader>Import Next patient data</ModalHeader>
      <ModalBody>
        <PatientsComparison
          sections={sections}
          ehrPatient={ehrPatient}
          nextPatient={nextPatient}
          onSave={onSave}
          ehrId={ehrId}
        />
      </ModalBody>
    </Modal>
  );
};
