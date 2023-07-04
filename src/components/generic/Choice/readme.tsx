import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { Choice } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "Choice",
      scenario: "standard",
    },
  });

  const [value, setValue] = React.useState<boolean>();

  return (
    <Choice
      choices={[
        {
          label: "Yes",
          onSelect: () => setValue(true),
          isSelected: value === true,
        },
        {
          label: "No",
          onSelect: () => setValue(false),
          isSelected: value === false,
        },
      ]}
    />
  );
};
