import * as React from "react";
import * as _ from "lodash";

import { Button } from "../../generic/Button";

// TODO: move this to the main theme
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { ModalHeader, Modal, ModalBody } from "../Modal";
const css = cssComposer(styles, "errorHandler");

if (!_.has(env, "helpEmail")) {
  throw new Error("missing env.helpEmail");
}

export interface IErrorHandlerProps {
  retry?: () => any;
  retryLabel?: string;
  title?: string;
  description?: string;
  inModal?: boolean;
  inModalClose?: () => void;
}

/**
 * Provides a consistent way of displaying an error to the user and allowing
 * them to resolve it.
 */
export const ErrorPlaceholder: React.FC<IErrorHandlerProps> = ({
  retry,
  retryLabel = "Try again",
  title = "Unfortunately something went wrong",
  description,
  inModal = false,
  inModalClose = () => {},
}) => {
  // move the title to the modal header
  const msgTitle = inModal ? null : title;

  const ErrorMsg = () => (
    <div className={css("")}>
      <div className={css("container")}>
        {!!msgTitle && <h3 className={css("title")}>{msgTitle}</h3>}
        {!!description && <p>{description}</p>}
        <p>
          {retry ? "Please try again. " : "Please try refreshing the window. "}
          If the problem persists we would appreciate if you could notify us of
          the issue via
          <br />
          <a href={`mailto:${env.helpEmail}`}>{env.helpEmail}</a>
        </p>
        {retry && (
          <div className={css("retry")} data-test="retry-btn">
            <Button onClick={retry}>{retryLabel}</Button>
          </div>
        )}
      </div>
    </div>
  );
  return inModal ? (
    <Modal open={true} onClose={inModalClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <ErrorMsg />
      </ModalBody>
    </Modal>
  ) : (
    <ErrorMsg />
  );
};
