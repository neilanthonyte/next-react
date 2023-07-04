import { PageSectionCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("PageSection").page("http://localhost:6060/#/PageSection");

test.skip("should render page sections", async (t) => {
  const scenario = Selector(toTestSelector("PageSection-scenario-standard"));
  const pageSections = scenario.find(toTestSelector(PageSectionCtrl.selector));

  // there should be 4 page sections
  await t.expect(pageSections.count).eql(4);

  // first page section has actions in the header
  const pageSectionOne = new PageSectionCtrl(pageSections().nth(0), t);
  await pageSectionOne.section.header.hasActions(true);

  // second page section has inputs in the header
  const pageSectionTwo = new PageSectionCtrl(pageSections().nth(1), t);
  await pageSectionTwo.section.header.hasInputs(true);

  // fourth page section has options in the header
  const pageSectionFour = new PageSectionCtrl(pageSections().nth(3), t);
  await pageSectionFour.section.header.options.exists(true);
});
