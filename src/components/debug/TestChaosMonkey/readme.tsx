import * as React from "react";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

import { TestChaosMonkey } from ".";

export const Demo: React.FC = () => (
  <NextAppHandlerWeb
    configOverride={{ useRealClient: true, debugChaosProbability: 0.5 }}
  >
    <TestChaosMonkey />
  </NextAppHandlerWeb>
);
