import * as React from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";
import { IFormResources } from "next-shared/src/types/types";

import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { PatientForm } from "../../atoms/PatientForm";
import { EMultiFormDisplayStyle } from "../../forms/MultiForm";

export interface IPatientFormModalProps {
  formSlug: string | void;
  onClose: () => any;
  onFormSubmitSuccess: (data: any) => any;
  prefillData?: IFormResources;
  heading?: string;
}

/**
 * Modal showing a patient form based on form slug
 */
export const PatientFormModal: React.FC<IPatientFormModalProps> = ({
  formSlug,
  onClose,
  onFormSubmitSuccess,
  prefillData,
  heading = "Edit details on record",
}) => {
  return (
    <Modal open={!!formSlug} onClose={onClose} size={TDialogSizes.Large}>
      <ModalHeader>{heading}</ModalHeader>
      <ModalBody>
        {!!formSlug && (
          <PatientForm
            formSlug={formSlug}
            onSuccess={onFormSubmitSuccess}
            onCancel={onClose}
            prefillData={prefillData}
            displayStyle={EMultiFormDisplayStyle.Accordion}
          />
        )}
      </ModalBody>
    </Modal>
  );
};
