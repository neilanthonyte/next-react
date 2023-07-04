import * as React from "react";
import { useParsedHash } from ".";

export const DemoStandard = () => {
  const parsedHash = useParsedHash();
  return <>Parsed hash: {JSON.stringify(parsedHash, null, 2)}</>;
};
