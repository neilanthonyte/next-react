import * as React from "react";

import { NextAdminUtilsView } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <NextAdminUtilsView />
    </NextAppHandlerWeb>
  );
};
