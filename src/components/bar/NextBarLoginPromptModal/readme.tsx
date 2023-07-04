import * as React from "react";

import { NextAppHandlerWeb } from "next-react/src/components/handlers/NextAppHandlerWeb";
import { NextBarLoginPromptModal } from "./";
import { useState } from "react";

export const DemoApp: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <NextAppHandlerWeb>
      <NextBarLoginPromptModal
        loginMode="app"
        open={open}
        onClose={() => setOpen(false)}
      />
    </NextAppHandlerWeb>
  );
};

export const DemoStaffMember: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <NextAppHandlerWeb>
      <NextBarLoginPromptModal
        loginMode="staffMember"
        open={open}
        onClose={() => setOpen(false)}
      />
    </NextAppHandlerWeb>
  );
};
