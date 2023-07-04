import * as React from "react";

import { PatientNote } from ".";
import { data } from "./_example/data";
import { ELayoutVariant } from "next-shared/src/types/layouts";

export const DemoStandard = () => {
  return <PatientNote data={data} />;
};

export const DemoCompact = () => {
  return <PatientNote data={data} variant={ELayoutVariant.Compact} />;
};
