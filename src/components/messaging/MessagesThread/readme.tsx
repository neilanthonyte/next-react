import * as React from "react";
import { useState } from "react";
import faker from "faker";

import { mockMessages } from "next-shared/src/mockData/mockMessaging";
import { IMessage, IMessageAuthor } from "next-shared/src/types/messaging";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { ELayoutVariant } from "next-shared/src/types/layouts";
import { createGuid } from "next-shared/src/helpers/guid";

import { useDebug } from "../../../debug/DemoWrapper";
import { MessagesThread } from ".";

const mockAuthor: IMessageAuthor = {
  id: createGuid(),
  isActiveUser: true,
  name: `${faker.name.firstName()} ${faker.name.firstName()}`,
};

export const DemoEmpty = () => {
  useDebug({
    test: {
      componentName: "MessagesThread",
      scenario: "empty",
    },
  });

  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleOnSubmitNewMessage = (newMessage: string) => {
    setMessages((s) => [
      ...s,
      {
        id: createGuid(),
        messageText: newMessage,
        author: mockAuthor,
        createdAt: currentUnixTimestamp(),
      },
    ]);
  };

  return (
    <div style={{ height: "300px" }}>
      <MessagesThread
        messages={messages}
        onSubmitNewMessage={handleOnSubmitNewMessage}
      />
    </div>
  );
};

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "MessagesThread",
      scenario: "standard",
    },
  });

  const [messages, setMessages] = useState<IMessage[]>(mockMessages);

  const handleOnSubmitNewMessage = (newMessage: string) => {
    setMessages((s) => [
      ...s,
      {
        id: createGuid(),
        messageText: newMessage,
        author: mockAuthor,
        createdAt: currentUnixTimestamp(),
      },
    ]);
  };

  return (
    <div style={{ height: "500px" }}>
      <MessagesThread
        messages={messages}
        onSubmitNewMessage={handleOnSubmitNewMessage}
      />
    </div>
  );
};

export const DemoCompact = () => {
  useDebug({
    test: {
      componentName: "MessagesThread",
      scenario: "compact",
    },
  });

  const [messages, setMessages] = useState<IMessage[]>(mockMessages);

  const handleOnSubmitNewMessage = (newMessage: string) => {
    setMessages((s) => [
      ...s,
      {
        id: createGuid(),
        messageText: newMessage,
        author: mockAuthor,
        createdAt: currentUnixTimestamp(),
      },
    ]);
  };

  return (
    <div
      style={{
        height: "500px",
        width: "300px",
      }}
    >
      <MessagesThread
        messages={messages}
        onSubmitNewMessage={handleOnSubmitNewMessage}
        layout={ELayoutVariant.Compact}
      />
    </div>
  );
};
