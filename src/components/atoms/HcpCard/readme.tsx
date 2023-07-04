import * as React from "react";

import { HcpCard } from ".";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      {mockHcps.map((hcp) => (
        <HcpCard key={hcp.slug} hcp={hcp} />
      ))}
    </NextAppHandlerWeb>
  );
};
