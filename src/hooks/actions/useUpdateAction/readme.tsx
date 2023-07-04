import * as React from "react";

import { Action } from "next-shared/src/models/Action";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";

import { Button } from "../../../components/generic/Button";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { VStack } from "../../../components/structure/VStack";
import { useDebug } from "../../../debug/DemoWrapper";
import { currentUnixTimestamp } from "../../../helpers/currentUnixTimestamp";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { usePatientActions } from "../usePatientActions";
import { Message } from "../../../components/generic/Message";
import { Modal, ModalHeader } from "../../../components/structure/Modal";
import { ErrorPlaceholder } from "../../../components/structure/ErrorPlaceholder";
import { useUpdateAction } from ".";

// TODO come up with better implementation, for now just blindly toggle active on the first action for the session patient
export const DemoStandard = () => {
  useDebug({
    requireSession: "patient",
    setSessionDebug: true,
  });
  const { nextPatient } = useSyncedSessionData();

  const { updateAction, isLoading, error } = useUpdateAction();
  const {
    allActions,
    isLoading: isLoadingActions,
    error: actionsError,
  } = usePatientActions(nextPatient?.patientId);

  const handleToggleActive = React.useCallback(
    (action: Action) => {
      const updatedAction = cloneModelObject(action);
      updatedAction.activeAt = action.activeAt
        ? undefined
        : currentUnixTimestamp();
      return updateAction(updatedAction);
    },
    [updateAction],
  );

  const activeAction = (allActions || [])[0];

  return (
    <VStack>
      <LoadingBlock
        isLoading={isLoading || isLoadingActions}
        error={actionsError}
      >
        {activeAction ? (
          <h3>
            <Message
              variant={
                !!activeAction.activeAt
                  ? TColorVariants.Success
                  : TColorVariants.Error
              }
            >
              Action {activeAction.actionId} active status:{" "}
              {!!activeAction.activeAt ? "Active" : "Inactive"}
            </Message>
          </h3>
        ) : (
          <h3>Patient in session does not have actions</h3>
        )}
      </LoadingBlock>
      <Button
        disabled={!activeAction}
        disableOnSuccess={false}
        onClick={() => handleToggleActive(activeAction)}
      >
        Toggle active
      </Button>
      {error && (
        <Modal open={true} onClose={() => handleToggleActive(activeAction)}>
          <ModalHeader>Error updating</ModalHeader>
          <ErrorPlaceholder retry={() => handleToggleActive(activeAction)} />
        </Modal>
      )}
    </VStack>
  );
};
