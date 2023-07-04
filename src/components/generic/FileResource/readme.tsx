import * as React from "react";

import { FileResource } from ".";
import { mockOpsResources } from "next-shared/src/mockData/mockOpsResources";

import { Grid } from "../../structure/Grid";

export const DemoStandard = () => {
  return (
    <Grid size="lg">
      {mockOpsResources.map((r, index) => (
        <FileResource key={index} resource={r} />
      ))}
    </Grid>
  );
};
