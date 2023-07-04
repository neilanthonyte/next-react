import * as React from "react";
import { useState } from "react";

import { Collapse } from ".";

export const DemoStandard = () => {
  const [isOpened, setIsOpened] = useState<boolean>(true);
  return (
    <>
      <Collapse isOpened={isOpened}>
        Hello world! this is some test content
        <br />
        <img src="https://www.fillmurray.com/200/300" />
      </Collapse>
      <p>
        <a onClick={() => setIsOpened(!isOpened)}>Toggle</a>
      </p>
    </>
  );
};
