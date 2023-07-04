import { Selector } from "testcafe";

import {
  selectComponent,
  selectDemo,
  toTestSelector,
} from "next-shared/src/helpers/toTestSelector";

import { AvatarInitialsCtrl } from "./index.ctrl";
import { AVATAR_INITIALS_INPUT_TEST_SELECTOR } from "../readme";
import { TextInputCtrl } from "../../../inputs/TextInput/_tests/index.ctrl";

fixture("AvatarInitials").page("http://localhost:6060/#/AvatarInitials");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/generic/AvatarInitials/index.tsx yarn dev
 * yarn testcafe ./src/components/generic/AvatarInitials/_tests/index.intg.ts
 * ```
 */
test("it shows the correct initials", async (t) => {
  const selector = Selector(selectDemo("AvatarInitials", "standard"));

  const component = new AvatarInitialsCtrl(selector.find(selectComponent()), t);

  const textInput = new TextInputCtrl(
    selector.find(toTestSelector(AVATAR_INITIALS_INPUT_TEST_SELECTOR)),
    t,
  );

  textInput.setValue("MR");

  await component.exists(true);
  await component.expectInitials("MR");
});

test("it does not render if too long", async (t) => {
  const selector = Selector(selectDemo("AvatarInitials", "standard"));

  const component = new AvatarInitialsCtrl(selector.find(selectComponent()), t);

  const textInput = new TextInputCtrl(
    selector.find(toTestSelector(AVATAR_INITIALS_INPUT_TEST_SELECTOR)),
    t,
  );

  textInput.setValue("TOO LONG");

  await component.exists(false);
});
