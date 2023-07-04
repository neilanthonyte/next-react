import * as React from "react";
import faker from "faker";

import { useDebug } from "../../../debug/DemoWrapper";
import { Flow, FlowStep } from ".";

export const DemoStandard = () => {
  const { output, setOutput } = useDebug({
    test: {
      componentName: "Flow",
      scenario: "standard",
    },
    output: [],
  });

  const revertToStep = (step: number) => {
    setOutput(output.splice(0, step));
  };

  return (
    <Flow step={(output || []).length}>
      {Array.from(Array(10), (_, i) => i + 1).map((s) => (
        <FlowStep
          key={s}
          title={`Step ${s}`}
          edit={{ label: "Change", onClick: () => revertToStep(s - 1) }}
        >
          <p>{faker.lorem.words(50)}</p>
          <p>
            <a onClick={() => setOutput((o: string[]) => [...o, `Step ${s}`])}>
              Next
            </a>
          </p>
        </FlowStep>
      ))}
    </Flow>
  );
};
