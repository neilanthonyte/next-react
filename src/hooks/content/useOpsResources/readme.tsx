import * as React from "react";

import { useOpsResources } from ".";
import { FileResource } from "../../../components/generic/FileResource";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { Grid } from "../../../components/structure/Grid";

const Inner = () => {
  const { opsResources } = useOpsResources();

  return (
    <Grid>
      {(opsResources || []).map((files, index) => (
        <FileResource key={index} resource={files} />
      ))}
    </Grid>
  );
};

export const DemoStandard = () => {
  return (
    <div data-test="useOpsResources-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <Inner />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};
