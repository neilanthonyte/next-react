import * as React from "react";

import { MedicalArticlesView, MedicalArticlesSideBar } from ".";
import { SplitView, DetailsView, ContentView } from "../../structure/SplitView";
import { AnchorScrolling } from "../../generic/AnchorScrolling";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  useDebug({ setSessionDebug: true });

  return (
    <>
      <AnchorScrolling />
      <SplitView>
        <DetailsView size={"md"}>
          <MedicalArticlesSideBar />
        </DetailsView>
        <ContentView>
          <MedicalArticlesView />
        </ContentView>
      </SplitView>
    </>
  );
};
