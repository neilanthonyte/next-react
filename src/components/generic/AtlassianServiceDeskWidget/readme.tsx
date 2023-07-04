import * as React from "react";

import { AtlassianServiceDeskWidget } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <p>
        Please ensure <code>ATLASSIAN_SERVICE_DESK_KEY</code> is set.
      </p>
      <AtlassianServiceDeskWidget />
    </NextAppHandlerWeb>
  );
};
