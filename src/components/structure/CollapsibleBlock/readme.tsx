import React, { useEffect, useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import {
  CollapsibleBlock,
  CollapsibleBlockBody,
  CollapsibleBlockHeader,
} from ".";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "CollapsibleBlock",
      scenario: "standard",
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>();
  const [isDisabled, setIsDisabled] = useState<boolean>();

  useEffect(() => {
    setActions([
      {
        label: "Toggle isOpen",
        action: () => setIsOpen((s) => !s),
      },
      {
        label: "Toggle disabled",
        action: () => setIsDisabled((s) => !s),
      },
    ]);
  }, []);

  return (
    <CollapsibleBlock isOpen={isOpen} iCollapseDisabled={isDisabled}>
      <CollapsibleBlockHeader>Your header content here</CollapsibleBlockHeader>
      <CollapsibleBlockBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
        dicta laudantium, expedita labore ipsum velit neque odio rerum cumque
        quidem? Soluta impedit laboriosam blanditiis nesciunt magni, magnam quam
        esse nemo.
      </CollapsibleBlockBody>
    </CollapsibleBlock>
  );
};
