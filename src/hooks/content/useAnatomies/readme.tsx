import * as React from "react";

import { useAnatomies } from ".";
import { AnatomyCard } from "../../../components/anatomy/AnatomyCard";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";

const Inner = () => {
  const { anatomies, isLoading } = useAnatomies();

  return (
    <LoadingBlock isLoading={isLoading}>
      <Grid>
        {(anatomies || []).map((a) => (
          <AnatomyCard key={a.slug} anatomy={a} />
        ))}
      </Grid>
    </LoadingBlock>
  );
};

export const DemoStandard = () => {
  return (
    <div data-test="useAnatomies-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <Inner />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};
