import { SideBarSectionCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { TableOfContentsCtrl } from "../../TableOfContents/_tests/index.ctrl";

fixture("SideBarSection").page("http://localhost:6060/#/SideBarSection");

test("should render sidebar sections", async (t) => {
  const scenario = Selector(toTestSelector("SideBarSection-scenario-standard"));
  const sideBarSections = scenario.find(
    toTestSelector(SideBarSectionCtrl.selector),
  );

  // there should be 2 sidebar sections
  await t.expect(sideBarSections.count).eql(2);

  // first sidebar section
  const sideBarSectionOne = new SideBarSectionCtrl(sideBarSections().nth(0), t);
  await sideBarSectionOne.section.header.title.checkContents(
    "Table of contents",
  );
  const tableOfContents = new TableOfContentsCtrl(
    sideBarSectionOne.section.body.body,
    t,
  );
  await tableOfContents.exists(true);
  await t.expect(await tableOfContents.list.countListItem()).eql(2);
  await t.expect(await tableOfContents.list.getListItemContent(0)).eql("First");
  await t.expect(await tableOfContents.list.getListItemBadge(0)).eql("1");
  await t
    .expect(await tableOfContents.list.getListItemContent(1))
    .eql("Second");
  await t.expect(await tableOfContents.list.getListItemBadge(1)).eql("1");
});
