import { Selector } from "testcafe";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { CarePlansListCtrl } from "./index.ctrl";

fixture("CarePlansList").page("http://localhost:6060/#/CarePlansList");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/care-plans/CarePlansList/index.tsx yarn dev
 * yarn testcafe ./src/components/care-plans/CarePlansList/_tests/index.intg.ts
 * ```
 */
test("It renders an empty list", async (t) => {
  const selector = Selector(selectDemo("CarePlansList", "empty"));

  const component = new CarePlansListCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectEmptyList(true);
});

test("It renders a list of care plans with revisions", async (t) => {
  const selector = Selector(selectDemo("CarePlansList", "revisions"));

  const component = new CarePlansListCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectEmptyList(false);
  await component.expectNumberOfPlans(1);
  const carePlanCell = await component.getPlan(0);
  await carePlanCell.exists();
  await carePlanCell.hasCollapsibleContent();
  await carePlanCell.expectEditAction(true);
  await carePlanCell.expectRevisionCount(3);
  await carePlanCell.expectSubCarePlansCount(2);
});
