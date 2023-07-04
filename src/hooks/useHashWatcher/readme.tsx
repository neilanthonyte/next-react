import * as React from "react";
import { useHashWatcher } from ".";

export const DemoStandard = () => {
  const hashValue = "/useHashWatcher";
  const equals = useHashWatcher(hashValue);
  return (
    <>
      Matches hash {hashValue}: {equals ? "yes" : "no"}
    </>
  );
};
