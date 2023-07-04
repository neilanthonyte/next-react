import * as React from "react";

import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { PayDockCreditCardForm } from "../../payments/PayDockCreditCardForm";
import { IProvisionalCreditCard } from "next-shared/src/types/ICreditCard";

export interface ICreditCardModalProps {
  open?: boolean;
  onClose?: () => any;
  onSuccess: (card: IProvisionalCreditCard, saveToRecord?: boolean) => unknown;
  disclaimer?: string;
  includeSaveToRecord?: boolean;
}
/**
 * Component rendering a PayDock form modal
 */
export const CreditCardModal: React.FC<ICreditCardModalProps> = ({
  open = true,
  onClose,
  onSuccess,
  disclaimer,
  includeSaveToRecord,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose ? onClose : null}
      size={TDialogSizes.Medium}
    >
      <ModalHeader>Credit card details</ModalHeader>
      <ModalBody>
        <PayDockCreditCardForm
          onSuccess={onSuccess}
          disclaimer={disclaimer}
          includeSaveToRecord={includeSaveToRecord}
        />
      </ModalBody>
    </Modal>
  );
};
