import * as React from "react";
import { useCallback, useContext } from "react";

import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { Form } from "../../forms/Form";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { OpsAction } from "next-shared/src/models/OpsAction";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { IReportProblemForm, issueFormSchema } from "./helpers/issueFormSchema";

export interface IChecklistTaskIssueModalProps {
  task: ChecklistTask;
  onSubmit: (formResults: IReportProblemForm, action?: OpsAction) => void;
  onExit: () => void;
  prefill?: IReportProblemForm;
}

/**
 * Collects the details of an issue related to completing a task. The
 * issue is saved and result returned.
 */
export const ChecklistTaskIssueModal: React.FC<
  IChecklistTaskIssueModalProps
> = ({ onSubmit, onExit, task, prefill }) => {
  const { onInsertOpsAction } = useContext(OpsActionsContext);
  if (typeof onInsertOpsAction !== "function") {
    throw new Error("onInsertOpsAction not provided");
  }

  const saveIssue = useCallback(
    (form: IReportProblemForm) => {
      (async () => {
        let action = null;
        if (form.furtherActionRequired) {
          action = new OpsAction();
          action.parentId = String(task.id);
          action.parentType = "task";
          action.title = form.taskProblem;
          action.instructions = form.actionRequired;
          action.critical = false;
          action.status = "active";
          action.resolved = false;
          await onInsertOpsAction(action);
        }
        onSubmit(form, action);
      })();
    },
    [task],
  );

  return (
    <Modal size={TDialogSizes.Medium} open={!!task} onClose={onExit}>
      {task && (
        <>
          <ModalHeader>Report an issue with: {task.title}</ModalHeader>
          <ModalBody>
            <p>
              Please provide some details about the issue by filling out the
              form below. You can access this issue in the future via the{" "}
              <strong>Actions</strong> section.
            </p>
            <Form
              schema={issueFormSchema}
              submitLabel="Report Problem"
              onSuccess={saveIssue}
              onCancel={onExit}
              data={prefill}
            />
          </ModalBody>
        </>
      )}
    </Modal>
  );
};
