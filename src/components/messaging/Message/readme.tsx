import * as React from "react";
import * as faker from "faker";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import {
  mockLongMessageFromActiveUser,
  mockLongMessageFromRespondent,
  mockMessageFromSystem,
  mockOneWordMessageFromActiveUser,
  mockOneWordMessageFromRespondent,
  mockShortMessage,
  mockShortMessageFromActiveUser,
  mockShortMessageFromRespondent,
} from "next-shared/src/mockData/mockMessaging";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { useDebug } from "../../../debug/DemoWrapper";

import { InstructionResource } from "../../resources/InstructionResource";
import { VStack } from "../../structure/VStack";
import { Message } from ".";
import { Title } from "../../abstract/Section";

// used in integration test
export const MOCK_MESSAGE_AUTHOR_ACTIVE_USER_TEST =
  mockShortMessageFromActiveUser.author;
export const MOCK_MESSAGE_AUTHOR_RESPONDENT_TEST =
  mockShortMessageFromRespondent.author;
export const MOCK_MESSAGE_AUTHOR_SYSTEM_TEST = mockMessageFromSystem.author;

export const MOCK_MESSAGE_TEST = mockShortMessage;
export const MOCK_TIMESTAMP_TEST = currentUnixTimestamp() - 5000;

export const DemoUser = () => {
  useDebug({
    test: {
      componentName: "Message",
      scenario: "user",
    },
  });

  return (
    <Message
      message={{
        ...mockShortMessageFromActiveUser,
        createdAt: MOCK_TIMESTAMP_TEST,
      }}
    />
  );
};

export const DemoRespondent = () => {
  useDebug({
    test: {
      componentName: "Message",
      scenario: "respondent",
    },
  });

  return <Message message={mockShortMessageFromRespondent} />;
};

export const DemoSystem = () => {
  useDebug({
    test: {
      componentName: "Message",
      scenario: "system",
    },
  });

  return <Message message={mockMessageFromSystem} />;
};

export const DemoAttachment = () => {
  useDebug({
    test: {
      componentName: "Message",
      scenario: "attachment",
    },
  });

  return (
    <Message message={mockMessageFromSystem}>
      <InstructionResource
        title={faker.lorem.paragraph(2)}
        htmlMessage={null}
      />
    </Message>
  );
};

export const DemoConsecutive = () => {
  useDebug({
    test: {
      componentName: "Message",
      scenario: "consecutive",
    },
  });

  return (
    <Message
      message={mockLongMessageFromRespondent}
      hideAvatar={true}
      hideTimestamp={true}
    />
  );
};

export const DemoCompact = () => {
  useDebug({
    test: {
      componentName: "Message",
      scenario: "compact",
    },
  });

  return (
    <Message
      message={mockLongMessageFromRespondent}
      layout={ELayoutVariant.Compact}
    />
  );
};

export const DemoDifferentLength = () => {
  useDebug({
    test: {
      componentName: "Message",
      scenario: "length",
    },
  });

  return (
    <VStack>
      <Title>Standard</Title>
      <Message message={mockOneWordMessageFromActiveUser} />
      <Message message={mockLongMessageFromActiveUser} />
      <Message message={mockOneWordMessageFromRespondent} />
      <Message message={mockLongMessageFromRespondent} />
      <Title>Compact</Title>
      <Message
        message={mockOneWordMessageFromActiveUser}
        layout={ELayoutVariant.Compact}
      />
      <Message
        message={mockLongMessageFromActiveUser}
        layout={ELayoutVariant.Compact}
      />
      <Message
        message={mockOneWordMessageFromRespondent}
        layout={ELayoutVariant.Compact}
      />
      <Message
        message={mockLongMessageFromRespondent}
        layout={ELayoutVariant.Compact}
      />
    </VStack>
  );
};
