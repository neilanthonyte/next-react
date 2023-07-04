import * as React from "react";
import { useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";
import { FiltersPopover } from ".";
import { Button } from "../../generic/Button";

// used for integration tests
export const FILTERS_POPOVER_CONTENT_TAG = "Filters content goes here";

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "FiltersPopover",
      scenario: "standard",
    },
  });

  const [isOpen, setIsOpen] = useState<boolean>();

  const target = (
    <span data-test="open">
      <Button onClick={() => setIsOpen(true)}>Open popover</Button>
    </span>
  );

  return (
    <FiltersPopover
      closeHandler={() => setIsOpen(false)}
      open={isOpen}
      target={target}
    >
      <div data-test="content">{FILTERS_POPOVER_CONTENT_TAG}</div>
    </FiltersPopover>
  );
};
