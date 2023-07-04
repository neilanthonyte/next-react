import * as React from "react";

import { Form } from "../../forms/Form";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { Scope } from "next-shared/src/models/Scope";
import { useCreateRoom } from "../../../hooks/useCreateRoom";
import { IFormSchema } from "next-shared/src/types/formTypes";

const createRoomSchema: IFormSchema = [
  {
    label: "Room label",
    map: "label",
    description:
      "Please provide a descriptive name such as: 'Practice Room 2'.",
    type: "text",
    required: true,
  },
];

interface IRoomFormData {
  label: string;
}

export interface ICreateRoomModalProps {
  open: boolean;
  onDismiss: () => void;
  onSuccess: (room: Scope) => void;
}

export const CreateRoomModal: React.FC<ICreateRoomModalProps> = ({
  open,
  onDismiss,
  onSuccess,
}) => {
  const { createRoom } = useCreateRoom();

  const onSubmit = async (data: IRoomFormData) => {
    return createRoom(data.label).then(onSuccess);
  };

  return (
    <Modal open={open} onClose={onDismiss} size={TDialogSizes.Medium}>
      <ModalHeader>New Room</ModalHeader>
      <ModalBody>
        <Form
          schema={createRoomSchema}
          onSuccess={onSubmit}
          submitLabel="Create"
        />
      </ModalBody>
    </Modal>
  );
};
