import * as React from "react";

import { useHcps } from ".";
import { HcpCard } from "../../../components/atoms/HcpCard";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";

const Inner = () => {
  const { hcps: providers, isLoading } = useHcps();

  return (
    <LoadingBlock isLoading={isLoading}>
      <Grid>
        {(providers || []).map((a) => (
          <HcpCard key={a.slug} hcp={a} />
        ))}
      </Grid>
    </LoadingBlock>
  );
};

export const DemoStandard = () => {
  return (
    <div data-test="useProviders-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <Inner />
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};
