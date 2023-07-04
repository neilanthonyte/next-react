import * as React from "react";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";

export interface IPatientNoteModalProps {
  patientName: string;
  note: fhir3.Observation;
  close: () => void;
}

export const PatientNoteModal: React.FC<IPatientNoteModalProps> = ({
  patientName,
  note,
  close,
}) => {
  return (
    <Modal open={true} onClose={close} size={TDialogSizes.Large}>
      <ModalHeader>Patient note for {patientName}</ModalHeader>
      <ModalBody>{note.component[0].valueString}</ModalBody>
    </Modal>
  );
};
