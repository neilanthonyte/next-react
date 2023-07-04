import * as React from "react";

import { AccessCode } from ".";

export const DemoStandard = () => {
  return (
    <div data-test="AccessCode-scenario-standard">
      <AccessCode code="ABCDEFG" />
    </div>
  );
};

export const DemoPending = () => {
  return (
    <div data-test="AccessCode-scenario-pending">
      <AccessCode code={null} />
    </div>
  );
};

export const DemoNoLinks = () => {
  return (
    <div data-test="AccessCode-scenario-no-links">
      <AccessCode code="ABCDEFG" showAppStoreLinks={false} />
    </div>
  );
};

export const DemoSize = () => {
  return (
    <div data-test="AccessCode-scenario-size">
      <AccessCode code="ABCDEFG" />
      <AccessCode code="ABCDEFG" size="sm" />
      <AccessCode code={null} size="sm" />
    </div>
  );
};
