import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { TeamMemberDecoration } from ".";

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "TeamMemberDecoration",
      scenario: "standard",
    },
  });

  return <TeamMemberDecoration />;
};
