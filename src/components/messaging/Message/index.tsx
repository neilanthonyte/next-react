import * as React from "react";
import dayjs from "dayjs";

import { IMessage } from "next-shared/src/types/messaging";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { messagingTimeFormat } from "../../../helpers/momentFormats";
import { MessageAvatar } from "../MessageAvatar";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "ChatMessage");

// used for testing
export const systemVariantClassName = "-system";
export const activeUserVariantClassName = "-active-user";

export interface IMessageProps {
  message: IMessage;
  hideAvatar?: boolean;
  hideTimestamp?: boolean;
  layout?: ELayoutVariant;
}

export const Message: React.FC<IMessageProps> = ({
  message,
  hideAvatar = false,
  hideTimestamp = false,
  layout = ELayoutVariant.Standard,
  children,
}) => {
  const { author, messageText, createdAt } = message || {};

  const {
    isSystem,
    isActiveUser,
    name: messageAuthorName,
  } = message.author || {};

  const formattedTimestamp = dayjs.unix(createdAt).format(messagingTimeFormat);

  const respondentName = !isSystem && !isActiveUser ? messageAuthorName : null;

  return (
    <div
      className={css("", `-${layout}`, {
        [systemVariantClassName]: isSystem,
        [activeUserVariantClassName]: isActiveUser,
      })}
      data-test="message"
    >
      {!isActiveUser && (
        <div
          className={css("avatar", {
            "-hidden": hideAvatar,
          })}
          data-test="avatar"
        >
          <MessageAvatar author={author} layout={layout} />
        </div>
      )}

      <div className={css("content")}>
        <div className={css("bubble")}>
          {!!respondentName && (
            <div className={css("respondent")} data-test="author-name">
              {respondentName}
            </div>
          )}
          <div data-test="message-text">{messageText}</div>
        </div>
        {React.Children.count(children) > 0 && (
          <div className={css("attachment")} data-test="attachment">
            {children}
          </div>
        )}
        {!hideTimestamp && (
          <div className={css("timestamp")} data-test="timestamp">
            {formattedTimestamp}
          </div>
        )}
      </div>
    </div>
  );
};
