import * as React from "react";
import { useState, useCallback, useMemo } from "react";

import { Task, ITaskAction } from "../../generic/Task";
import { ChecklistTaskIssueModal } from "../../modals/ChecklistTaskIssueModal";
import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { ChecklistTask as TaskModel } from "next-shared/src/models/ChecklistTask";

import { OpsAction } from "next-shared/src/models/OpsAction";
import { IRelatedArticle } from "next-shared/src/types/IRelatedArticle";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { IReportProblemForm } from "../../modals/ChecklistTaskIssueModal/helpers/issueFormSchema";
import { OpsArticleModal } from "../../ops-articles/OpsArticleModal";

export interface IOpsTaskProps {
  task: TaskModel;
  disabled?: boolean;
}

/**
 * Provides a checklist task - which provides several features in addition to a standard task
 * including help information.
 */
export const OpsTask: React.FC<IOpsTaskProps> = ({
  task,
  disabled = false,
}) => {
  const {
    id,
    comment,
    cmsTask: {
      relatedArticle,
      frequency: { title: frequencyTitle },
    },
  } = task;

  const { updateTask } = useRequiredContext(ChecklistContext);

  if (typeof updateTask !== "function") {
    throw new Error("updateTask not provided");
  }

  const [showIssueModal, setShowIssueModal] = useState(false);
  const [article, setArticle] = useState<IRelatedArticle | null>(null);

  const createIssueCallback: (formResults: any, action?: OpsAction) => void =
    useCallback(
      async (form: IReportProblemForm, action?: OpsAction) => {
        // update our issue
        const updatedTask = cloneModelObject(task);
        updatedTask.comment = form.taskProblem;
        updatedTask.completed = form.completed;
        updatedTask.completedAt = currentUnixTimestamp();
        updatedTask.wasLate = updatedTask.dueDate < currentUnixTimestamp();
        await updateTask(updatedTask);

        setShowIssueModal(false);
      },
      [task],
    );

  const showRelatedResource = useCallback(() => {
    setArticle(relatedArticle);
  }, [relatedArticle]);

  const onChange = (value: any) => {
    (async () => {
      // push the update
      await updateTask(task, value);
    })();
  };

  const actions: ITaskAction[] = useMemo(
    () => [
      {
        icon: "task-moreInfo",
        onClick: relatedArticle ? showRelatedResource : null,
      },
      {
        icon: "task-reportIssue",
        // can only create an ops action for tasks with ids
        onClick: id ? () => setShowIssueModal(true) : null,
      },
    ],
    [task],
  );

  const details = useMemo(
    () => (!task.isDailyTask() ? `Due ${frequencyTitle}` : null),
    [task],
  );

  return (
    <div data-test="checklisttask">
      <Task
        task={task}
        onChange={onChange}
        actions={actions}
        disabled={disabled}
        details={details}
      >
        <small>{comment}</small>
      </Task>
      <span data-test="modal">
        <OpsArticleModal
          articleSlug={article?.slug}
          anchor={article?.anchor}
          onClose={() => setArticle(null)}
        />
      </span>
      <ChecklistTaskIssueModal
        task={showIssueModal && task}
        onSubmit={createIssueCallback}
        onExit={() => setShowIssueModal(false)}
      />
    </div>
  );
};
