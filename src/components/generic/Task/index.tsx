import * as React from "react";
import { useMemo, useState } from "react";
import moment from "moment";

import { BaseTask } from "next-shared/src/models/BaseTask";
import { ISectionState } from "../../abstract/Section";
import { CameraUpload } from "../CameraUpload";
import { Checkbox, ECheckboxStatus } from "../Checkbox";
import { DangerBadge } from "../Badge";
import { defaultMomentFormat } from "../../../helpers/momentFormats";
import { Form } from "../../forms/Form";
import { IFormField } from "next-shared/src/types/formTypes";
import { ImgBlock } from "../ImgBlock";
import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { Temperature } from "../Temperature";
import { CircularIcon } from "../CircularIcon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { Collapse } from "../Collapse";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Task");

const formSchemas: { [taskType: string]: IFormField[] } = {
  numeric: [
    {
      map: "value",
      type: "number",
      required: true,
      alwaysShowKeypad: true,
    },
  ],
  temperature: [
    {
      map: "value",
      type: "temperature",
      required: true,
      alwaysShowKeypad: true,
    },
  ],
};

type TTaskState = "info";

export interface ITaskAction {
  icon?: string;
  label?: string;
  onClick?: (args?: any) => any;
}

export interface ITaskProps {
  task: BaseTask;
  disabled?: boolean;
  alwaysShowActions?: boolean;
  customForm?: IFormField[];
  prepopulatedFromData?: any;
  onChange: (value: any) => void;
  actions?: ITaskAction[];
  state?: TTaskState;
  details?: string;
}

/**
 * Represents a task that, to be completed, either needs to be checked, a number collected
 * or an image taken.
 */
export const Task: React.FC<ITaskProps> = ({
  task,
  disabled,
  customForm,
  prepopulatedFromData,
  onChange,
  actions,
  alwaysShowActions,
  details,
  children,
}) => {
  const { iconOverride, type, highlight } = task;

  const [showFormModal, setShowFormModal] = useState<string>();
  const [showImageModal, setShowImageModal] = useState<boolean>(false);

  const closeNumericModal = () => setShowFormModal(undefined);
  const closeImageModal = () => setShowImageModal(false);

  // if specified option form appended to available schemas lad!
  if (customForm !== undefined) {
    formSchemas["custom"] = customForm;
  }

  const onClick = () => {
    switch (task.type) {
      case "image":
        setShowImageModal(true);
        break;
      case "numeric":
      case "temperature":
        setShowFormModal(customForm ? "custom" : task.type);
        break;
      case "boolean":
        const state = !task.completed;
        onChange(state);
        break;
    }
  };

  const result: any = useMemo(() => {
    if (task.completed === null) {
      return null;
    }
    switch (task.type) {
      case "image":
        return (
          <ImgBlock
            src={task.imageTmpUrl}
            size="sm"
            squareRatio
            data-test="thumbnail"
          />
        );
      case "numeric":
        return (
          <>
            <label>Recorded value:</label> {task.value}
          </>
        );
      case "temperature":
        return (
          <>
            <label>Recorded value:</label>{" "}
            <Temperature
              temperature={task.value ? parseFloat(task.value as string) : null}
            />
          </>
        );
    }
    return null;
  }, [task]);

  // if override is present use that icon name otherwise use the icon based
  // on the type of task
  const iconType = `task-${iconOverride ? iconOverride : type}`;

  const overdue = useMemo(() => task.isOverdue(), [task]);

  const sectionState: ISectionState = disabled
    ? "disabled"
    : overdue
    ? "error"
    : (task.colorCue as ISectionState) || null;

  const showActions = (!task.completedAt && !disabled) || alwaysShowActions;

  const completionState: ECheckboxStatus =
    typeof task.completed !== "boolean"
      ? ECheckboxStatus.Unchecked
      : task.completed
      ? ECheckboxStatus.Successful
      : ECheckboxStatus.Unsuccessful;

  return (
    <>
      <div
        className={css("", {
          [`-highlighted-${completionState}`]: highlight,
        })}
      >
        <span
          className={css("icon")}
          data-test="checkboxWrapper"
          data-test-show-actions={showActions}
          data-test-completion-state={completionState}
          data-test-section-state={sectionState}
        >
          <Checkbox
            standardSize={EStandardSizes.Small}
            status={completionState}
            uncheckedIcon={iconType}
            onClick={onClick}
            disabled={disabled}
          />
        </span>
        <div
          className={css("title", {
            "-completed": task.completed !== null,
            "-overdue": overdue,
          })}
        >
          {task.title}
          <div className={css("details")}>
            {!!details && <span>{details} </span>}
            {task.completedAt ? (
              <>
                <label className={css("timestamp")} data-test="timestamp">
                  Completed:{" "}
                  {moment.unix(task.completedAt).format(defaultMomentFormat)}
                </label>
                {task.completedAt > task.dueDate && (
                  <span className={css("badge")} data-test="late">
                    {" "}
                    <DangerBadge size="sm">Late</DangerBadge>
                  </span>
                )}
              </>
            ) : (
              overdue && (
                <span className={css("badge")} data-test="late">
                  <DangerBadge size="sm">Overdue</DangerBadge>
                </span>
              )
            )}
          </div>
        </div>
        {actions && (
          <div className={css("actions")}>
            {actions.map((action, i) => (
              <span key={"action-" + i}>
                <CircularIcon
                  className={css("header_actions_icon")}
                  name={action.icon}
                  onClick={action.onClick}
                  size={EStandardSizes.Small}
                  variant={action.onClick ? null : TColorVariants.Disabled}
                />
              </span>
            ))}
          </div>
        )}
      </div>
      <Collapse
        size={EStandardSizes.Small}
        isOpened={result !== null || !!children}
      >
        {result !== null && (
          <div className={css("result")} data-test="result">
            {result}
          </div>
        )}
        {children && (
          <div className={css("result")} data-test="previous-results">
            {children}
          </div>
        )}
      </Collapse>
      <Modal
        open={!!showFormModal}
        onClose={closeNumericModal}
        size={TDialogSizes.Medium}
      >
        <ModalHeader>Enter value</ModalHeader>
        <ModalBody>
          <Form
            data={prepopulatedFromData}
            schema={formSchemas[showFormModal]}
            onSuccess={(data) => {
              onChange(customForm !== undefined ? data : data.value);
              closeNumericModal();
            }}
            onCancel={closeNumericModal}
          />
        </ModalBody>
      </Modal>
      <Modal open={showImageModal} onClose={closeImageModal}>
        <ModalHeader>Capture the task</ModalHeader>
        <ModalBody>
          <CameraUpload
            onChange={(imageUrl) => {
              closeImageModal();
              onChange(imageUrl);
            }}
            uploadNamespace={"task-images"}
            videoEnvironment="environment"
            videoWidth={400}
            fastShoot={true}
            mode="auto"
          />
        </ModalBody>
      </Modal>
    </>
  );
};
