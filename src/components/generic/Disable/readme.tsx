import * as React from "react";
import { useState } from "react";
import * as faker from "faker";

import { Disable } from ".";

export const DemoStandard = () => {
  return (
    <Disable disabled={true}>
      <textarea>{faker.lorem.words(30)}</textarea>
    </Disable>
  );
};

export const DemoLoading = () => {
  const [disabled, setDisabled] = useState(false);
  const [paragraph, setParagraph] = useState<string>(faker.lorem.words(10));
  const next = () => {
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
      setParagraph(faker.lorem.words(10));
    }, 1000);
  };

  return (
    <>
      <Disable disabled={disabled} showSpinner={true}>
        <p>{paragraph}</p>
        <p>
          <a onClick={next}>Load next paragraph...</a>
        </p>
      </Disable>
    </>
  );
};
