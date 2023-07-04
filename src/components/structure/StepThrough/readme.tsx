import * as React from "react";
import { useState } from "react";
import * as faker from "faker";

// import { useDebug } from "../../../debug/DemoWrapper";

import { IStepThroughStep, StepThrough } from ".";
import { Dialog, DialogBody } from "../Dialog";

export const DemoStandard = () => {
  // const { setOutput } = useDebug({
  //   test: {
  //     componentName: "StepThrough",
  //     scenario: "standard",
  //   },
  // });

  const [active, setActive] = useState<number>(0);

  const views: IStepThroughStep[] = [
    {
      view: (
        <div>
          <h4>{faker.lorem.lines(1)}</h4>
          <p>{faker.lorem.paragraph(1)}</p>
        </div>
      ),
      actions: [
        {
          label: "Next",
          onClick: () => setActive(1),
        },
      ],
    },
    {
      view: (
        <div>
          <h4>{faker.lorem.lines(1)}</h4>
          <p>{faker.lorem.paragraph(4)}</p>
          <p>{faker.lorem.paragraph(4)}</p>
          <p>{faker.lorem.paragraph(4)}</p>
          <p>{faker.lorem.paragraph(4)}</p>
          <p>{faker.lorem.paragraph(4)}</p>
        </div>
      ),
      actions: [
        {
          label: "First",
          onClick: () => setActive(0),
        },
        {
          label: "Stay",
          onClick: () => setActive(1),
        },
      ],
    },
  ];

  return (
    <Dialog>
      <DialogBody>
        <StepThrough steps={views} show={active} />
      </DialogBody>
    </Dialog>
  );
};
