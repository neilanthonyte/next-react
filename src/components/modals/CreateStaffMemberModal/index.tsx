import * as React from "react";

import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";
import { CreateStaffMemberForm } from "../../forms/CreateStaffMemberForm";
import { StaffMember } from "next-shared/src/models/StaffMember";
import { TDialogSizes } from "next-shared/src/types/dialogs";

export interface ICreateStaffMemberModalProps {
  onClose: (user?: StaffMember) => any;
  open: boolean;
}

export const CreateStaffMemberModal: React.FC<ICreateStaffMemberModalProps> = ({
  onClose,
  open,
}) => {
  return (
    <Modal open={open} onClose={() => onClose()} size={TDialogSizes.Medium}>
      <ModalHeader>Create a new staff member</ModalHeader>
      <ModalBody>
        <CreateStaffMemberForm onSuccess={(user) => onClose(user)} />
      </ModalBody>
    </Modal>
  );
};
