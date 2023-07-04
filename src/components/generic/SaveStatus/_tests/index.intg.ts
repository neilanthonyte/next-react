import { Selector } from "testcafe";

import {
  selectAction,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { SaveStatusCtrl } from "./index.ctrl";
import { ButtonCtrl } from "../../Button/_tests/index.ctrl";
import {
  SAVESTATUS_MUTATE_ACTION,
  SAVESTATUS_REJECT_ACTION,
  SAVESTATUS_RESOLVE_ACTION,
} from "../readme";

fixture("SaveStatus").page("http://localhost:6060/#/SaveStatus");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/generic/SaveStatus/index.tsx yarn dev
 * yarn testcafe ./src/components/generic/SaveStatus/_tests/index.intg.ts
 * ```
 */
test("Handles all states, idle, loading, success and fail", async (t) => {
  const selector = Selector(selectDemo("SaveStatus", "controlled"));

  const component = new SaveStatusCtrl(selector.find(selectComponent()), t);

  const actionMutate = new ButtonCtrl(
    selector.find(selectAction(SAVESTATUS_MUTATE_ACTION)),
    t,
  );

  const actionResolve = new ButtonCtrl(
    selector.find(selectAction(SAVESTATUS_RESOLVE_ACTION)),
    t,
  );

  const actionReject = new ButtonCtrl(
    selector.find(selectAction(SAVESTATUS_REJECT_ACTION)),
    t,
  );

  await component.exists();
  await component.expectIdleIcon();
  await actionMutate.click();
  await component.expectLoader();
  await actionReject.click();
  await component.expectFailIcon();
  await component.expectRetryButton();
  await component.clickRetryButton();
  await component.expectLoader();
  await actionResolve.click();
  await component.expectSuccessIcon();
});
