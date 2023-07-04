import { Selector } from "testcafe";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { WellCtrl } from "./index.ctrl";

fixture("Well").page("http://localhost:6060/#/Well");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/structure/Well/index.tsx yarn dev
 * yarn testcafe ./src/components/structure/Well/_tests/index.intg.ts
 * ```
 */
test("Shows well and its content", async (t) => {
  const selector = Selector(selectDemo("Well", "standard"));

  const component = new WellCtrl(selector.find(selectComponent()), t);

  await component.exists();
});

test("Shows well options", async (t) => {
  const selector = Selector(selectDemo("Well", "options"));

  const component = new WellCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectOptions();
});
