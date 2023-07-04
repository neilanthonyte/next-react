import * as React from "react";
import { useEffect, useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";
import { Tag } from ".";

// used for integration tests
export const TAG_CONTENT_DEMO = "Tag content";
export const TAG_CLICK_OUTPUT = "Clicked";
export const TAG_COLLAPSIBLE_DECORATION_ACTION = "collapsible-decoration";
export const TAG_IS_CLEARABLE_ACTION = "clearable";
export const TAG_CLEAR_OUTPUT = "Cleared";

export const DemoStandard = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "Tag",
      scenario: "standard",
    },
  });
  const [showCollapsibleDecoration, setShowCollapsibleDecoration] =
    useState<boolean>(false);

  useEffect(() => {
    setActions([
      {
        label: "Toggle collapsible decoration",
        action: () => setShowCollapsibleDecoration((s) => !s),
        test: TAG_COLLAPSIBLE_DECORATION_ACTION,
      },
    ]);
  }, []);

  return (
    <Tag
      showCollapsibleDecoration={showCollapsibleDecoration}
      onClick={() => setOutput(TAG_CLICK_OUTPUT)}
    >
      {TAG_CONTENT_DEMO}
    </Tag>
  );
};

export const DemoClearable = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "Tag",
      scenario: "clearable",
    },
  });

  const [isClearable, setIsClearable] = useState<boolean>(false);

  useEffect(() => {
    setActions([
      {
        label: "Toggle isClearable",
        action: () => setIsClearable((s) => !s),
        test: TAG_IS_CLEARABLE_ACTION,
      },
    ]);
  }, []);

  return (
    <Tag isClearable={isClearable} onClear={() => setOutput(TAG_CLEAR_OUTPUT)}>
      {TAG_CONTENT_DEMO}
    </Tag>
  );
};
