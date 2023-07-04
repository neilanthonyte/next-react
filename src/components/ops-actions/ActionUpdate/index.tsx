import * as React from "react";
import { useContext } from "react";

import { Form } from "../../forms/Form";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { OpsAction } from "next-shared/src/models/OpsAction";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { IFormSchema } from "next-shared/src/types/formTypes";

export interface IActionUpdateProps {
  action: OpsAction;
  showUpdateAction: boolean;
  setShowUpdateAction: (open: boolean) => void;
}

interface IActionUpdateFormSubmission {
  resolutionAction?: string;
  ableToResolve: boolean;
}

export const ActionUpdate: React.FC<IActionUpdateProps> = ({
  action,
  showUpdateAction,
  setShowUpdateAction,
}) => {
  const { onUpdateOpsAction } = useContext(OpsActionsContext);

  const actionResolveFormSchema: IFormSchema = [
    {
      type: "boolean",
      label: "Were you able to resolve the issue?",
      map: "ableToResolve",
      required: true,
    },
    {
      type: "text",
      label: "How was the issue resolved?",
      map: "resolutionAction",
      required: true,
      conditional: {
        path: "../ableToResolve",
        match: true,
        type: "visible",
      },
    },
    {
      type: "text",
      label: "Why could you not resolve the issue?",
      map: "resolutionAction",
      required: true,
      conditional: {
        path: "../ableToResolve",
        match: false,
        type: "visible",
      },
    },
  ];

  const updateAction = async (formSubmission: IActionUpdateFormSubmission) => {
    action.status = "inactive";
    action.resolved = formSubmission.ableToResolve;

    if (formSubmission.resolutionAction) {
      action.resolutionAction = formSubmission.resolutionAction;
    }

    const updatedAction = await onUpdateOpsAction(action);
    setShowUpdateAction(false);

    return updatedAction;
  };

  return (
    <Modal
      size={TDialogSizes.Medium}
      open={showUpdateAction}
      onClose={() => setShowUpdateAction(false)}
    >
      {action && (
        <>
          <ModalHeader>Update issue ({action.title})</ModalHeader>
          <ModalBody>
            <Form
              schema={actionResolveFormSchema}
              data={{ ableToResolve: true }}
              submitLabel="Update"
              onSuccess={updateAction}
              onCancel={() => setShowUpdateAction(false)}
            />
          </ModalBody>
        </>
      )}
    </Modal>
  );
};
