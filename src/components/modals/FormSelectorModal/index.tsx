import * as React from "react";
import { useState, useCallback } from "react";
import { useMutation } from "react-query";

import { TDialogSizes } from "next-shared/src/types/dialogs";
import { Scope } from "next-shared/src/models/Scope";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../../structure/Modal";
import { usePatientFormsForLocation } from "../../../hooks/patient/usePatientFormsForLocation";
import { PendingContent } from "../../structure/PendingContent";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { useClient } from "../../../hooks/useClient";
import { FormPicker } from "../../bar/FormPicker";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";

export interface IFormSelectorModalProps {
  /** Callback closing the modal and executing any other code */
  close: () => void;
  /** The active scope we are interacting with */
  scope: Scope;
}

/**
 * Modal showing a location available assignable form picker
 */
export const FormSelectorModal: React.FC<IFormSelectorModalProps> = ({
  close,
  scope,
}) => {
  const { activeLocation: currentLocation } = useActiveLocation();
  const client = useClient();

  const {
    data: forms,
    isLoading,
    error,
    refetch,
  } = usePatientFormsForLocation(currentLocation?.slug);

  const [updateScopeAppState, { error: errorScopeUpdate }] = useMutation<
    void,
    Error,
    { scopeId: string; state: any }
  >(({ scopeId, state }) => client.scopes.updateScopeAppState(scopeId, state), {
    onSuccess: () => {
      close();
    },
  });

  const handleOnAssign = useCallback(
    (selectedForm: string) => {
      if (!scope || !selectedForm) return;
      return updateScopeAppState({
        scopeId: scope.scopeId,
        // don't spread the state, we don't want to keep the same lastStateUpdateFrom as this is a forced external state change
        state: { url: `/profile/forms/${selectedForm}` },
      });
    },
    [scope],
  );

  return (
    <Modal open={true} onClose={close} size={TDialogSizes.Large}>
      <ModalHeader>Please select a form to assign</ModalHeader>
      <ModalBody>
        {error ? (
          <ErrorPlaceholder title="Error retrieving forms" retry={refetch} />
        ) : (
          <PendingContent isLocalised check={isLoading === false && !!forms}>
            <FormPicker forms={forms} onSelect={handleOnAssign} />
          </PendingContent>
        )}
      </ModalBody>
      {!!errorScopeUpdate ? (
        <ErrorPlaceholder title="An error occurred while trying to assign the form." />
      ) : (
        <ModalFooter cancelLabel="Close" onCancel={close} />
      )}
    </Modal>
  );
};
