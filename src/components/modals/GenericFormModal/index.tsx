import * as React from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";
import { IFormResources } from "next-shared/src/types/types";

import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { ActiveFormView } from "../../forms/ActiveFormView";
import { useFetchForms } from "../../../hooks/forms/useFetchForm";
import { LoadingBlock } from "../../structure/LoadingBlock";

export interface IGenericFormModalProps {
  formSlug: string;
  onClose: () => any;
  onSuccess: (data: any) => void;
  prefillData?: IFormResources;
  heading: string;
}

/**
 * Modal showing a basic form view, and leaving submission logic to the parent.
 */
export const GenericFormModal: React.FC<IGenericFormModalProps> = ({
  formSlug,
  onSuccess,
  onClose,
  prefillData,
  heading,
}) => {
  const { formSchema, error, isLoading, refetch } = useFetchForms(formSlug);

  return (
    <Modal open={!!formSlug} onClose={onClose} size={TDialogSizes.Large}>
      <ModalHeader>{heading}</ModalHeader>
      <ModalBody>
        <LoadingBlock isLoading={isLoading} refetch={refetch} error={error}>
          {!!formSlug && (
            <ActiveFormView
              schema={formSchema}
              onSuccess={onSuccess}
              onCancel={onClose}
              data={prefillData}
            />
          )}
        </LoadingBlock>
      </ModalBody>
    </Modal>
  );
};
