import { Selector } from "testcafe";

import { SidePanelPageCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SidePanelPageSectionCtrl } from "../../SidePanelPageSection/_tests/index.ctrl";

fixture("SidePanelPage").page("http://localhost:6060/#/SidePanelPage");

test("basic", async (t) => {
  const scenario = Selector(toTestSelector("SidePanelPage-scenario-basic"));
  const sidePanelPage = new SidePanelPageCtrl(scenario, t);

  await sidePanelPage.exists(true);
  await sidePanelPage.header.exists(true);
  await sidePanelPage.body.exists(true);
});

test("with side panel page header options", async (t) => {
  const scenario = Selector(
    toTestSelector("SidePanelPage-scenario-header-options"),
  );
  const sidePanelPage = new SidePanelPageCtrl(scenario, t);

  await sidePanelPage.exists(true);
  await sidePanelPage.header.exists(true);
  await sidePanelPage.body.exists(true);
  await sidePanelPage.header.options.exists(true);
});

test("with side panel page sections", async (t) => {
  const scenario = Selector(toTestSelector("SidePanelPage-scenario-sections"));
  const sidePanelPage = new SidePanelPageCtrl(scenario, t);
  const sidePanelPageSections = sidePanelPage.body.body.find(
    toTestSelector(SidePanelPageSectionCtrl.selector),
  );

  await sidePanelPage.exists(true);
  await sidePanelPage.header.exists(true);
  await sidePanelPage.body.exists(true);
  await t.expect(sidePanelPageSections.count).eql(2);
});
