import * as React from "react";
import { useEffect } from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { MessageInput } from ".";

export enum EMessageInputTestAttributes {
  Message = "message",
  Action = "action",
}

export const DemoStandard = () => {
  const { setOutput, setTestAttributes, output } = useDebug({
    test: {
      componentName: "MessageInput",
      scenario: "standard",
    },
  });

  useEffect(() => {
    setTestAttributes({ [EMessageInputTestAttributes.Message]: output });
  }, [output]);

  return <MessageInput onSubmit={setOutput} />;
};

export const MOCK_ADD_ITEM_ACTION_LABELS_TEST = ["Add bar", "Add foo"];

export const DemoAddItem = () => {
  const { setOutput, output, setTestAttributes } = useDebug({
    test: {
      componentName: "MessageInput",
      scenario: "add-item-options",
    },
  });

  useEffect(() => {
    setTestAttributes({
      [EMessageInputTestAttributes.Message]: output?.message,
      [EMessageInputTestAttributes.Action]: output?.action,
    });
  }, [output]);

  return (
    <MessageInput
      addItemOptions={[
        {
          label: MOCK_ADD_ITEM_ACTION_LABELS_TEST[0],
          onClick: () =>
            setOutput({ action: MOCK_ADD_ITEM_ACTION_LABELS_TEST[0] }),
          icon: "nutrition",
        },
        {
          label: MOCK_ADD_ITEM_ACTION_LABELS_TEST[1],
          onClick: () =>
            setOutput({ action: MOCK_ADD_ITEM_ACTION_LABELS_TEST[0] }),
          icon: "address",
        },
      ]}
      onSubmit={(message) => setOutput({ ...output, message })}
    />
  );
};
