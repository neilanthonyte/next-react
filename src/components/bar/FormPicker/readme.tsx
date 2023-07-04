import * as React from "react";
import { useState } from "react";

import { mockAssignableForms } from "next-shared/src/mockData/mockFormSchemas";
import { FormPicker } from ".";

export const DemoStandard = () => {
  const [selected, setSelected] = useState<string>();
  return (
    <div data-test="FormPicker-scenario-base">
      <FormPicker forms={mockAssignableForms} onSelect={setSelected} />
      <div className="debug">
        <pre data-test="output">{selected}</pre>
      </div>
    </div>
  );
};
