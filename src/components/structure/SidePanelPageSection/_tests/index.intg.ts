import { SidePanelPageSectionCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("SidePanelPageSection").page(
  "http://localhost:6060/#/SidePanelPageSection",
);

test("should render side panel page sections", async (t) => {
  const scenario = Selector(
    toTestSelector("SidePanelPageSection-scenario-standard"),
  );
  const sidePanelPageSections = scenario.find(
    toTestSelector(SidePanelPageSectionCtrl.selector),
  );

  // there should be 4 sidePanelPage sections
  await t.expect(sidePanelPageSections.count).eql(4);

  // first side panel page section has actions in the header
  const sidePanelPageSectionOne = new SidePanelPageSectionCtrl(
    sidePanelPageSections().nth(0),
    t,
  );
  await sidePanelPageSectionOne.sidePanelSection.header.hasActions(true);

  // second side panel page section has inputs in the header
  const sidePanelPageSectionTwo = new SidePanelPageSectionCtrl(
    sidePanelPageSections().nth(1),
    t,
  );
  await sidePanelPageSectionTwo.sidePanelSection.header.hasInputs(true);

  // fourth side panel page section has options in the header
  const sidePanelPageSectionFour = new SidePanelPageSectionCtrl(
    sidePanelPageSections().nth(3),
    t,
  );
  await sidePanelPageSectionFour.sidePanelSection.header.options.exists(true);
});
