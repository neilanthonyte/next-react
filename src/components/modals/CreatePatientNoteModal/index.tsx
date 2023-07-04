import * as React from "react";

import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { NoteToPatientEditor } from "../../atoms/PatientSections/components/NoteToPatientEditor";

export interface ICreatePatientNoteModalProps {
  patientName: string;
  close: () => void;
}

export const CreatePatientNoteModal: React.FC<ICreatePatientNoteModalProps> = ({
  patientName,
  close,
}) => {
  return (
    <Modal open={true} onClose={close} size={TDialogSizes.Large}>
      <ModalHeader>Add an Instruction for {patientName}</ModalHeader>
      <ModalBody>
        <div>
          Send instructions to the patient via the patient app. Please ensure
          the patient has access to the app.
        </div>
        <NoteToPatientEditor onSuccess={close} />
      </ModalBody>
    </Modal>
  );
};
