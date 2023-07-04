import * as React from "react";
import { MemoryRouter } from "react-router";

import { OpsArticlesView, OpsArticlesSideBar } from ".";
import { SplitView, DetailsView, ContentView } from "../../structure/SplitView";
import { AnchorScrolling } from "../../generic/AnchorScrolling";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <div data-test="OpsArticlesView-scenario-standard">
      <MemoryRouter>
        <NextAppHandlerWeb>
          <AnchorScrolling />
          <SplitView>
            <DetailsView size={"md"}>
              <OpsArticlesSideBar />
            </DetailsView>
            <ContentView>
              <OpsArticlesView />
            </ContentView>
          </SplitView>
        </NextAppHandlerWeb>
      </MemoryRouter>
    </div>
  );
};
