import { ChecklistSidebarCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SideBarSectionCtrl } from "../../../structure/SideBarSection/_tests/index.ctrl";
import { TableOfContentsCtrl } from "../../../structure/TableOfContents/_tests/index.ctrl";

fixture("ChecklistSidebar").page("http://localhost:6060/#/ChecklistSidebar");

test("should render checklist sidebar", async (t) => {
  await t.wait(5000); // wait for checklist loading
  const scenario = Selector(
    toTestSelector("ChecklistSidebar-scenario-standard"),
  );
  const checklistSidebar = new ChecklistSidebarCtrl(scenario, t);

  await checklistSidebar.exists(true);

  await checklistSidebar.sidebar.header.title.checkContents("Compliance");

  const checklistSidebarSections = checklistSidebar.sidebar.body.body.find(
    toTestSelector(SideBarSectionCtrl.selector),
  );
  await t.expect(checklistSidebarSections.count).eql(1);

  const checklistSidebarSection = new SideBarSectionCtrl(
    checklistSidebarSections.nth(0),
    t,
  );
  await checklistSidebarSection.section.header.title.checkContents(
    "Navigation",
  );

  const tableOfContents = new TableOfContentsCtrl(
    checklistSidebarSection.section.body.body,
    t,
  );
  await tableOfContents.exists(true);
  await t.expect(await tableOfContents.list.countListItem()).eql(4);

  await t
    .expect(await tableOfContents.list.getListItemContent(0))
    .eql("Daily Tasks");
  await t.expect(await tableOfContents.list.getListItemBadge(0)).eql("6");

  await t
    .expect(await tableOfContents.list.getListItemContent(1))
    .eql("Weekly Tasks");
  await t.expect(await tableOfContents.list.getListItemBadge(1)).eql("1");

  await t
    .expect(await tableOfContents.list.getListItemContent(2))
    .eql("Monthly Tasks");
  await t.expect(await tableOfContents.list.getListItemBadge(2)).eql("1");

  // clicking on an list item should hightlight it
  await tableOfContents.list.expectListItemToBeActive(0, false);
  await tableOfContents.list.expectListItemToBeActive(1, false);
  await tableOfContents.list.expectListItemToBeActive(2, false);
  await tableOfContents.list.expectListItemToBeActive(3, false);

  await tableOfContents.list.clickListItem(0);

  await tableOfContents.list.expectListItemToBeActive(0, true);
  await tableOfContents.list.expectListItemToBeActive(1, false);
  await tableOfContents.list.expectListItemToBeActive(2, false);
  await tableOfContents.list.expectListItemToBeActive(3, false);

  await tableOfContents.list.clickListItem(1);

  await tableOfContents.list.expectListItemToBeActive(0, false);
  await tableOfContents.list.expectListItemToBeActive(1, true);
  await tableOfContents.list.expectListItemToBeActive(2, false);
  await tableOfContents.list.expectListItemToBeActive(3, false);
});
