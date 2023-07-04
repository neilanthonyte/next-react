import * as React from "react";

import { PatientStatsWidget } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <PatientStatsWidget />
    </NextAppHandlerWeb>
  );
};
