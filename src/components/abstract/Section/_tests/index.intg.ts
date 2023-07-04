import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { SectionCtrl } from "./index.ctrl";
import { delay } from "../../../../helpers/delay";

const ANIMTIME = 1000;
fixture("Section").page("http://localhost:6060/#/Section");

test("Basic example should render 3 sections", async (t) => {
  const scenario = Selector(toTestSelector("Section-scenario-basic"));
  const sections = scenario.find(toTestSelector(SectionCtrl.selector));

  await t.expect(sections.count).eql(3);

  const sectionOne = new SectionCtrl(sections.nth(0), t);
  const sectionTwo = new SectionCtrl(sections.nth(1), t);
  const sectionThree = new SectionCtrl(sections.nth(2), t);
  const sectionFour = new SectionCtrl(sections.nth(3), t);

  await sectionOne.exists(true);
  await sectionTwo.exists(true);
  await sectionThree.exists(true);
  await sectionFour.exists(false);
});

test("Opens a closed section when the header is clicked", async (t) => {
  const scenario = Selector(toTestSelector("Section-scenario-basic"));
  const sections = scenario.find(toTestSelector(SectionCtrl.selector));
  const section = new SectionCtrl(sections.nth(0), t);

  await section.expectSectionIsOpen(false);
  await section.clickHeader();
  await section.expectSectionIsOpen(true);
});

test("Toggles a section when the header is clicked multiple times", async (t) => {
  const scenario = Selector(toTestSelector("Section-scenario-basic"));
  const sections = scenario.find(toTestSelector(SectionCtrl.selector));
  const section = new SectionCtrl(sections.nth(0), t);

  await section.expectSectionIsOpen(false);
  await section.clickHeader();
  await section.expectSectionIsOpen(true);
  await section.clickHeader();
  // HACK as we need a delay for element to hide before the next check
  await delay(ANIMTIME);
  await section.expectSectionIsOpen(false);
});

test("Responds to programmatic opening and closing", async (t) => {
  const scenario = Selector(
    toTestSelector("Section-scenario-controlledCollapse"),
  );
  const readmeToggleButton = scenario.find(toTestSelector("toggle-button"));
  const sections = scenario.find(toTestSelector(SectionCtrl.selector));
  const section = new SectionCtrl(sections.nth(0), t);

  await section.expectSectionIsOpen(true);
  await t.click(readmeToggleButton);
  // HACK as we need a delay for element to hide before the next check
  await delay(ANIMTIME);
  await section.expectSectionIsOpen(false);
});

test("Clicking on the header when being controlled does not toggle the body", async (t) => {
  const scenario = Selector(
    toTestSelector("Section-scenario-controlledCollapse"),
  );
  const sections = scenario.find(toTestSelector(SectionCtrl.selector));
  const section = new SectionCtrl(sections.nth(0), t);

  await section.expectSectionIsOpen(true);
  await section.clickHeader();
  await section.expectSectionIsOpen(true);
});

test("Correctly clicks a sections actions", async (t) => {
  const scenario = Selector(toTestSelector("Section-scenario-actions"));
  const sections = scenario.find(toTestSelector(SectionCtrl.selector));
  const section = new SectionCtrl(sections.nth(0), t);

  const action1Output = scenario.find(toTestSelector("action-1-clicked"));
  const action2Output = scenario.find(toTestSelector("action-2-clicked"));
  const action3Output = scenario.find(toTestSelector("action-3-clicked"));

  // ensure there is no text there for both action outputs
  await t.expect(!!(await action1Output.innerText)).notOk();
  await t.expect(!!(await action2Output.innerText)).notOk();
  await t.expect(!!(await action3Output.innerText)).notOk();

  // click the first action
  await section.clickHeaderAction(0);
  // ensures that text is there, which means it was clicked
  await t.expect(!!(await action1Output.innerText)).ok();

  // click the second action
  await section.clickHeaderAction(1);
  // ensures that text is there, which means it was clicked
  await t.expect(!!(await action2Output.innerText)).ok();

  // click the third action
  await section.clickHeaderAction(2);
  // ensures that text is there, which means it was clicked
  await t.expect(!!(await action3Output.innerText)).ok();
});

test("Accessing collapse state is correct", async (t) => {
  const scenario = Selector(
    toTestSelector("Section-scenario-accessCollapsedState"),
  );
  const collapseState = scenario.find(toTestSelector("collapse-state"));
  const sections = scenario.find(toTestSelector(SectionCtrl.selector));
  const section = new SectionCtrl(sections.nth(0), t);

  await t.expect(await collapseState.innerText).eql("Open");
  await section.clickHeader();
  await delay(ANIMTIME);
  await t.expect(await collapseState.innerText).eql("Collapsed");
  await section.clickHeader();
  await delay(ANIMTIME);
  await t.expect(await collapseState.innerText).eql("Open");
});
