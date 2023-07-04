import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { HcpBarSummary } from ".";
import { mockHcps } from "next-shared/src/mockData/mockHcps";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "HcpBarSummary",
      scenario: "standard",
    },
  });

  return (
    <div style={{ backgroundColor: "black", padding: "5px 0" }}>
      <HcpBarSummary
        staffMemberId={mockHcps[0].npServicesId}
        onClick={() => setOutput("clicked")}
      />
    </div>
  );
};
