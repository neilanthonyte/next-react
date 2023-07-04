import { Selector } from "testcafe";

import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { CarePlanCellCtrl } from "./index.ctrl";
import { carePlanStatusLabelMap } from "..";
import {
  CARE_PLAN_CELL_DELETE_OUTPUT,
  CARE_PLAN_CELL_EDIT_OUTPUT,
  CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT,
  CARE_PLAN_CELL_REVIEW_OUTPUT,
} from "../readme";

fixture("CarePlanCell").page("http://localhost:6060/#/CarePlanCell");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/cells/CarePlanCell/index.tsx yarn dev
 * yarn testcafe ./src/components/cells/CarePlanCell/_tests/index.intg.ts
 * ```
 */
test("It renders a care plan cell with all details", async (t) => {
  const selector = Selector(selectDemo("CarePlanCell", "standard"));

  const component = new CarePlanCellCtrl(selector.find(selectComponent()), t);

  await component.exists();
});

test("It renders a draft plan correctly", async (t) => {
  const selector = Selector(selectDemo("CarePlanCell", "draft"));

  const component = new CarePlanCellCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectStatus(carePlanStatusLabelMap.draft);
  await component.expectReviewAction(false);
  await component.expectOpenDocumentAction(false);

  let output = null;

  await component.clickEdit();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_EDIT_OUTPUT);

  await component.clickOptions();
  await component.hasOptionPopoverOpen();
  // HACK should find a way to select options popover via a key or specific data-test instead of nth index number
  // delete
  await component.optionsPopover.pickOption(1);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_DELETE_OUTPUT);
});

test("It renders an initial plan correctly", async (t) => {
  const selector = Selector(selectDemo("CarePlanCell", "initial"));

  const component = new CarePlanCellCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectStatus(carePlanStatusLabelMap.initial);
  await component.expectEditAction(false);

  let output = null;

  await component.clickOpenDocument();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);

  await component.clickReview();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_REVIEW_OUTPUT);

  await component.clickOptions();
  await component.hasOptionPopoverOpen();
  // HACK should find a way to select options popover via a key or specific data-test instead of nth index number
  // review
  await component.optionsPopover.pickOption(0);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_REVIEW_OUTPUT);

  await component.clickOptions();
  // HACK should find a way to select options popover via a key or specific data-test instead of nth index number
  // open document
  await component.optionsPopover.pickOption(1);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);
});

test("It renders a single review plan correctly", async (t) => {
  const selector = Selector(selectDemo("CarePlanCell", "review"));

  const component = new CarePlanCellCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectStatus(carePlanStatusLabelMap.review);
  await component.expectEditAction(false);

  let output = null;

  await component.clickOpenDocument();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);

  await component.clickReview();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_REVIEW_OUTPUT);

  await component.clickOptions();
  await component.hasOptionPopoverOpen();
  // HACK should find a way to select options popover via a key or specific data-test instead of nth index number
  // review
  await component.optionsPopover.pickOption(0);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_REVIEW_OUTPUT);

  await component.clickOptions();
  // HACK should find a way to select options popover via a key or specific data-test instead of nth index number
  // open document
  await component.optionsPopover.pickOption(1);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);

  await component.expectRevisionCount(2);
  await component.openCollapsibleContent();
  await component.expectSubCarePlansCount(1);

  const subCarePlan = await component.getSubCarePlan(0);
  await subCarePlan.expectEditAction(false);
  await subCarePlan.expectReviewAction(false);
  await subCarePlan.expectStatus(carePlanStatusLabelMap.initial);
  await subCarePlan.clickOpenDocument();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);
});

test("It renders a multiple reviews plan correctly", async (t) => {
  const selector = Selector(selectDemo("CarePlanCell", "multiple-reviews"));

  const component = new CarePlanCellCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectStatus(carePlanStatusLabelMap.review);
  await component.expectEditAction(false);

  let output = null;

  await component.clickOpenDocument();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);

  await component.clickReview();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_REVIEW_OUTPUT);

  await component.clickOptions();
  await component.hasOptionPopoverOpen();
  // HACK should find a way to select options popover via a key or specific data-test instead of nth index number
  // review
  await component.optionsPopover.pickOption(0);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_REVIEW_OUTPUT);

  await component.clickOptions();
  // HACK should find a way to select options popover via a key or specific data-test instead of nth index number
  // open document
  await component.optionsPopover.pickOption(1);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);

  await component.expectRevisionCount(4);
  await component.openCollapsibleContent();
  await component.expectSubCarePlansCount(3);

  const subCarePlan = await component.getSubCarePlan(0);
  await subCarePlan.expectEditAction(false);
  await subCarePlan.expectReviewAction(false);
  await subCarePlan.expectStatus(carePlanStatusLabelMap.review);
  await subCarePlan.clickOpenDocument();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);
});

test("It renders a multiple reviews with draft plan correctly", async (t) => {
  const selector = Selector(selectDemo("CarePlanCell", "reviews-draft"));

  const component = new CarePlanCellCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectStatus(carePlanStatusLabelMap.draft);
  await component.expectOpenDocumentAction(false);

  let output = null;

  await component.clickEdit();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_EDIT_OUTPUT);

  await component.clickOptions();
  await component.hasOptionPopoverOpen();
  // HACK should find a way to select options popover via a key or specific data-test instead of nth index number
  // delete
  await component.optionsPopover.pickOption(1);
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_DELETE_OUTPUT);

  await component.expectRevisionCount(4);
  await component.openCollapsibleContent();
  await component.expectSubCarePlansCount(3);

  const subCarePlan = await component.getSubCarePlan(0);
  await subCarePlan.expectEditAction(false);
  await subCarePlan.expectReviewAction(false);
  await subCarePlan.expectStatus(carePlanStatusLabelMap.review);
  await subCarePlan.clickOpenDocument();
  output = await selector.getAttribute(selectAttribute("output"));
  await t.expect(output).contains(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT);
});
