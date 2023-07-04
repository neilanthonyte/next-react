import * as React from "react";
import { useContext } from "react";

import { Form } from "../../forms/Form";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { OpsAction } from "next-shared/src/models/OpsAction";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { TOpsActionStatus } from "next-shared/src/types/IOpsActionsWithMetrics";
import { IFormSchema } from "next-shared/src/types/formTypes";

export interface IActionCreateProps {
  showCreateAction: boolean;
  setShowCreateAction: (open: boolean) => void;
}

interface IActionCreateFormSubmission {
  title: string;
}

export const ActionCreate: React.FC<IActionCreateProps> = ({
  showCreateAction,
  setShowCreateAction,
}) => {
  const { onInsertOpsAction } = useContext(OpsActionsContext);

  const actionResolveFormSchema: IFormSchema = [
    {
      type: "text",
      label: "What is the action?",
      map: "title",
      required: true,
    },
  ];

  const createAction = async (formSubmission: IActionCreateFormSubmission) => {
    const newOpsAction = new OpsAction();

    newOpsAction.title = formSubmission.title;
    newOpsAction.resolved = false;
    newOpsAction.critical = false;
    newOpsAction.status = "active" as TOpsActionStatus;

    const insertedOpsAction = await onInsertOpsAction(newOpsAction);
    setShowCreateAction(false);

    return insertedOpsAction;
  };

  return (
    <Modal
      size={TDialogSizes.Medium}
      onClose={() => setShowCreateAction(false)}
      open={showCreateAction}
    >
      <ModalHeader>Raise Issue</ModalHeader>
      <ModalBody>
        <Form
          schema={actionResolveFormSchema}
          submitLabel="Create Issue"
          onSuccess={createAction}
          onCancel={() => setShowCreateAction(false)}
        />
      </ModalBody>
    </Modal>
  );
};
