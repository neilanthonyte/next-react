import { Selector } from "testcafe";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";
import { getInitialsFromFullName } from "next-shared/src/helpers/getInitialsFromFullName";

import { MessageAvatarCtrl } from "./index.ctrl";
import {
  MOCK_MESSAGE_AUTHOR_NO_IMAGE_TEST,
  MOCK_MESSAGE_AUTHOR_WITH_IMAGE_TEST,
} from "../readme";

fixture("MessageAvatar").page("http://localhost:6060/#/MessageAvatar");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/next-react/MessageAvatar/index.tsx yarn dev
 * yarn testcafe ./src/components/next-react/MessageAvatar/_tests/index.intg.ts
 * ```
 */
test("It renders a system avatar", async (t) => {
  const selector = Selector(selectDemo("MessageAvatar", "system"));

  const component = new MessageAvatarCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.avatarImageExists();
  await component.avatarLogoExists();
});

test("It renders an avatar with image", async (t) => {
  const selector = Selector(selectDemo("MessageAvatar", "image"));

  const component = new MessageAvatarCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.avatarImageExists();
  await component.expectAvatarImageSource(
    MOCK_MESSAGE_AUTHOR_WITH_IMAGE_TEST.imageSource,
  );
});

test("It renders an avatar with initials", async (t) => {
  const selector = Selector(selectDemo("MessageAvatar", "initials"));

  const component = new MessageAvatarCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.avatarInitialsExists();
  const initials = getInitialsFromFullName(
    MOCK_MESSAGE_AUTHOR_NO_IMAGE_TEST.name,
  );
  await component.expectInititials(initials);
});
