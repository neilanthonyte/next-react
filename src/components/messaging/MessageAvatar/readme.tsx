import * as React from "react";

import {
  mockMessageAuthorActiveUserNoImage,
  mockMessageAuthorActiveUserWithImage,
  mockMessageAuthorSystem,
} from "next-shared/src/mockData/mockMessaging";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { useDebug } from "../../../debug/DemoWrapper";
import { VStack } from "../../structure/VStack";
import { MessageAvatar } from ".";

// used in integration tests
export const MOCK_MESSAGE_AUTHOR_SYSTEM_TEST = mockMessageAuthorSystem;
export const MOCK_MESSAGE_AUTHOR_WITH_IMAGE_TEST =
  mockMessageAuthorActiveUserWithImage;
export const MOCK_MESSAGE_AUTHOR_NO_IMAGE_TEST =
  mockMessageAuthorActiveUserNoImage;

export const DemoImage = () => {
  useDebug({
    test: {
      componentName: "MessageAvatar",
      scenario: "image",
    },
  });

  return <MessageAvatar author={MOCK_MESSAGE_AUTHOR_WITH_IMAGE_TEST} />;
};

export const DemoInitials = () => {
  useDebug({
    test: {
      componentName: "MessageAvatar",
      scenario: "initials",
    },
  });

  return <MessageAvatar author={MOCK_MESSAGE_AUTHOR_NO_IMAGE_TEST} />;
};

export const DemoSystem = () => {
  useDebug({
    test: {
      componentName: "MessageAvatar",
      scenario: "system",
    },
  });

  return <MessageAvatar author={MOCK_MESSAGE_AUTHOR_SYSTEM_TEST} />;
};

export const DemoCompact = () => {
  useDebug({
    test: {
      componentName: "MessageAvatar",
      scenario: "compact",
    },
  });

  return (
    <VStack>
      <MessageAvatar
        author={MOCK_MESSAGE_AUTHOR_WITH_IMAGE_TEST}
        layout={ELayoutVariant.Compact}
      />
      <MessageAvatar
        author={MOCK_MESSAGE_AUTHOR_NO_IMAGE_TEST}
        layout={ELayoutVariant.Compact}
      />
      <MessageAvatar
        author={MOCK_MESSAGE_AUTHOR_SYSTEM_TEST}
        layout={ELayoutVariant.Compact}
      />
    </VStack>
  );
};
