import * as React from "react";
import { Modal, ModalFooter, ModalHeader } from "../../structure/Modal";

export interface IModalConfirmProps {
  onConfirm: () => void;
  onCancel: () => void;
  heading?: string;
  confirmationButton?: string;
  cancellationButton?: string;
  open?: boolean;
}

export const ModalConfirm: React.FC<IModalConfirmProps> = ({
  onConfirm,
  onCancel,
  heading = "Please confirm",
  confirmationButton = "Confirm",
  cancellationButton = "Cancel",
  open = true,
}) => {
  return (
    <Modal open={open} onClose={onCancel}>
      <ModalHeader>{heading}</ModalHeader>
      <ModalFooter
        onAccept={onConfirm}
        acceptLabel={confirmationButton}
        onCancel={onCancel}
        cancelLabel={cancellationButton}
      />
    </Modal>
  );
};
