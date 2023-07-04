import * as React from "react";
import { useMemo } from "react";
import dayjs from "dayjs";
import { groupBy } from "lodash";

import {
  IMessage,
  IMessageAddItemOption,
} from "next-shared/src/types/messaging";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { MessageInput } from "../MessageInput";
import { Message } from "../Message";
import { PlaceholderView } from "../../views/PlaceholderView";
import {
  messagingDateGroupFormat,
  messagingTimeFormat,
} from "../../../helpers/momentFormats";
import { useMessagingScrollHandler } from "./helpers";
import { Icon } from "../../generic/Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "MessagesThread");

export interface IMessagesThreadProps {
  messages: IMessage[];
  onSubmitNewMessage: (newMessage: string) => void | Promise<void>;
  addItemOptions?: IMessageAddItemOption[];
  layout?: ELayoutVariant;
}

/**
 * Controlled component rendering a list of messages and input to add a new one
 */
export const MessagesThread: React.FC<IMessagesThreadProps> = ({
  messages = [],
  onSubmitNewMessage,
  addItemOptions,
  layout = ELayoutVariant.Standard,
}) => {
  // group messages by date
  const messagesByDate = useMemo(() => {
    return groupBy(messages, (message) =>
      dayjs.unix(message.createdAt).format(messagingDateGroupFormat),
    );
  }, [messages]);

  const {
    scrollToBottom,
    scrollableContainerRef,
    showNewMessageAlert,
    resetNewMessageAlert,
  } = useMessagingScrollHandler(messages.length);

  const handleOnShowNewMessages = () => {
    scrollToBottom("smooth");
    resetNewMessageAlert();
  };

  return (
    <div className={css("", `-${layout}`)} data-test="messages-thread">
      <div className={css("messages-container")} data-test="placeholder">
        <div
          ref={scrollableContainerRef}
          className={css("messages-container_content")}
        >
          {messages.length > 0 ? (
            <div
              className={css("messages-container_content_body")}
              data-test="placeholder"
            >
              {Object.keys(messagesByDate).map((date, index) => (
                <MessagesByDate
                  key={index}
                  date={date}
                  messages={messagesByDate[date]}
                  layout={layout}
                />
              ))}
            </div>
          ) : (
            <div className={css("no-messages")} data-test="no-messages">
              <PlaceholderView instruction="No messages" />
            </div>
          )}
        </div>
        <div
          onClick={handleOnShowNewMessages}
          className={css("updates", { "-hidden": !showNewMessageAlert })}
        >
          <div className={css("updates_body")}>
            <Icon name="caret-down" />
            <span className={css("updates_label")}>New messages</span>
          </div>
        </div>
      </div>

      <div className={css("input")} data-test="message-input">
        <MessageInput
          onSubmit={onSubmitNewMessage}
          addItemOptions={addItemOptions}
        />
      </div>
    </div>
  );
};

interface IMessagesByDateProps {
  messages: IMessage[];
  date: string;
  layout: ELayoutVariant;
}

/**
 * Component rendering a grouped list of messages by date
 */
const MessagesByDate: React.FC<IMessagesByDateProps> = ({
  messages,
  date,
  layout,
}) => {
  // group same date messages again by same time of day and author,
  // so that same minutecreatedAt from the same person are grouped together
  const messagesByTimeAndAuthor = groupBy(
    messages,
    (m) => dayjs.unix(m.createdAt).format(messagingTimeFormat) + m.author.id,
  );

  return (
    <div className={css("date-group")} data-test={`date-group-${date}`}>
      <div className={css("date-group-header")}>
        <div
          className={css("date-group-header_date")}
          data-test="date-group-date"
        >
          {date}
        </div>
      </div>
      {Object.keys(messagesByTimeAndAuthor).map((key) => (
        <MessagesSection
          key={key}
          messages={messagesByTimeAndAuthor[key]}
          layout={layout}
        />
      ))}
    </div>
  );
};

interface IMessagesSectionProps {
  messages: IMessage[];
  layout: ELayoutVariant;
}

/**
 * Component rendering a section containing a list of messages
 */
const MessagesSection: React.FC<IMessagesSectionProps> = ({
  messages,
  layout,
}) => {
  const isSameAuthorConsecutiveMessages = messages.length > 0;

  return (
    <div className={css("messages-section")} data-test="messages-section">
      {messages.map((message, index) => {
        const isConsectuviveMessage =
          isSameAuthorConsecutiveMessages && index > 0;
        const isNotLastMessage = index < messages.length - 1;
        return (
          <div
            key={message.id}
            className={css("message", {
              "-no-gap": isConsectuviveMessage,
            })}
            data-test="message"
          >
            <Message
              message={message}
              hideAvatar={isConsectuviveMessage}
              hideTimestamp={
                isSameAuthorConsecutiveMessages && isNotLastMessage
              }
              layout={layout}
            >
              {message.attachment}
            </Message>
          </div>
        );
      })}
    </div>
  );
};
