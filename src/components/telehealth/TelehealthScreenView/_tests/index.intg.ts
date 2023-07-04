import { Selector } from "testcafe";
import * as _ from "lodash";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { TelehealthScreenViewCtrl } from "./index.ctrl";

fixture("TelehealthScreenView").page(
  "http://localhost:6060/#/TelehealthScreenView",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/telehealth/TelehealthScreenView/index.tsx yarn dev
 * yarn testcafe ./src/components/telehealth/TelehealthScreenView/_tests/index.intg.ts
 * ```
 */
test("Tabs are interactable", async (t) => {
  const selector = Selector(selectDemo("TelehealthScreenView", "standard"));

  const component = new TelehealthScreenViewCtrl(
    selector.find(selectComponent()),
    t,
  );

  await component.tabbedNav.clickTab(0);
  await component.tabbedNav.expectActiveTab(0);
  await component.tabbedNav.clickTab(1);
  await component.tabbedNav.expectActiveTab(1);
});
