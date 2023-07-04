import { Selector } from "testcafe";
import { SideBarCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SideBarSectionCtrl } from "../../SideBarSection/_tests/index.ctrl";
import { TableOfContentsCtrl } from "../../TableOfContents/_tests/index.ctrl";

fixture("SideBar").page("http://localhost:6060/#/SideBar");

test("should render sidebar sections", async (t) => {
  const scenario = Selector(toTestSelector("SideBar-scenario-standard"));
  const sidebar = new SideBarCtrl(scenario, t);

  await sidebar.header.title.checkContents("My great page");
  const sideBarSections = sidebar.body.body.find(
    toTestSelector(SideBarSectionCtrl.selector),
  );
  await t.expect(sideBarSections.count).eql(2);
  const sideBarSectionOne = new SideBarSectionCtrl(sideBarSections.nth(0), t);
  await sideBarSectionOne.section.header.title.checkContents(
    "Table of contents",
  );
  const tableOfContents = new TableOfContentsCtrl(
    sideBarSectionOne.section.body.body,
    t,
  );
  await tableOfContents.exists(true);
  await t.expect(await tableOfContents.list.countListItem()).eql(2);
});
