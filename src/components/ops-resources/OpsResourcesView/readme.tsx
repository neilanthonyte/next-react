import * as React from "react";
import { MemoryRouter } from "react-router";

import { OpsResourcesView, OpsResourcesSideBar } from ".";
import { SplitView, DetailsView, ContentView } from "../../structure/SplitView";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

const Inner = () => {
  return (
    <SplitView>
      <DetailsView size={"xs"}>
        <OpsResourcesSideBar />
      </DetailsView>
      <ContentView>
        <OpsResourcesView />
      </ContentView>
    </SplitView>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb configOverride={{ debugRequestErrorCount: 1 }}>
      <MemoryRouter>
        <Inner />
      </MemoryRouter>
    </NextAppHandlerWeb>
  );
};
