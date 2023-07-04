import * as React from "react";

import { Form } from "../../forms/Form";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { useCreateCompanion } from "../../../hooks/useCreateCompanion";
import { App } from "next-shared/src/models/App";
import { IFormSchema } from "next-shared/src/types/formTypes";

const createCompanionSchema: IFormSchema = [
  {
    label: "Companion label",
    description: "Please provide a descriptive name such as: 'Blue Companion'.",
    type: "text",
    map: "label",
    required: true,
  },
];

interface ICompanionFormData {
  label: string;
}

export interface ICreateCompanionModalProps {
  open: boolean;
  onDismiss: () => void;
  onSuccess: (companion: App) => void;
}

export const CreateCompanionModal: React.FC<ICreateCompanionModalProps> = ({
  open,
  onDismiss,
  onSuccess,
}) => {
  const { createCompanion } = useCreateCompanion();

  const onSubmit = async (data: ICompanionFormData) => {
    return createCompanion(data.label).then(onSuccess);
  };

  return (
    <Modal open={open} onClose={onDismiss} size={TDialogSizes.Medium}>
      <ModalHeader>New Companion</ModalHeader>
      <ModalBody>
        <Form
          schema={createCompanionSchema}
          onSuccess={onSubmit}
          submitLabel="Create"
        />
      </ModalBody>
    </Modal>
  );
};
