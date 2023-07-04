import * as React from "react";
import { useState } from "react";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { PromptExistingPatientLoginModal } from ".";

const Inner = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <PromptExistingPatientLoginModal
        open={open}
        onSkip={() => setOpen(false)}
      />
      <div className="debug"></div>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <Inner />
    </NextAppHandlerWeb>
  );
};
