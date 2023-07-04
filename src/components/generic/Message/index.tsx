import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
const css = cssComposer(styles, "Message");

export type MessageTitleProps = {
  children: any;
};

/**
 * Renders header of a Message
 */
export const MessageTitle: React.FC<MessageTitleProps> = ({ children }) => (
  <h4 className={css("title")}>{children}</h4>
);

export type MessageBodyProps = {
  children: any;
};

/**
 *  Renders body of the message
 */
export const MessageBody: React.FC<MessageBodyProps> = ({ children }) => (
  <div className={css("body")}>{children}</div>
);

export type MessageProps = {
  children: any;
  variant?: TColorVariants;
};

/**
 * System messages - Plain, success and error variants
 *
 * Normally used for inline and non-blocking messages (e.g. input fields form validation)
 * as opposed to [Dialog](#dialog)
 */
export const Message: React.FC<MessageProps> = ({ children, variant = "" }) => {
  return (
    <div className={css("", `-color-${variant}`)} data-test="message">
      {children}
    </div>
  );
};

export const SuccessMessage: React.FC<MessageProps> = (props: MessageProps) => (
  <Message variant={TColorVariants.Success} {...props} />
);

export const ErrorMessage: React.FC<MessageProps> = (props: MessageProps) => (
  <Message variant={TColorVariants.Error} {...props} />
);

export const WarningMessage: React.FC<MessageProps> = (props: MessageProps) => (
  <Message variant={TColorVariants.Warning} {...props} />
);

export const InfoMessage: React.FC<MessageProps> = (props: MessageProps) => (
  <Message variant={TColorVariants.Info} {...props} />
);
