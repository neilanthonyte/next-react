import { Selector } from "testcafe";
import dayjs from "dayjs";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";
import { IMessageAuthor } from "next-shared/src/types/messaging";

import { MessageCtrl } from "./index.ctrl";
import {
  MOCK_MESSAGE_AUTHOR_ACTIVE_USER_TEST,
  MOCK_MESSAGE_AUTHOR_RESPONDENT_TEST,
  MOCK_MESSAGE_AUTHOR_SYSTEM_TEST,
  MOCK_MESSAGE_TEST,
  MOCK_TIMESTAMP_TEST,
} from "../readme";
import { messagingTimeFormat } from "../../../../helpers/momentFormats";

fixture("Message").page("http://localhost:6060/#/Message");

const displaysCorrectAvatar = async (
  component: MessageCtrl,
  mockMessageAuthor: IMessageAuthor,
) => {
  await component.isAvatarVisible(true);
  if (mockMessageAuthor.isSystem) {
    await component.showsSystemAvatar();
  } else if (!!mockMessageAuthor.imageSource) {
    await component.showsImageAvatar();
  } else {
    await component.showsInitialsAvatar();
  }
};

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/messaging/Message/index.tsx yarn dev
 * yarn testcafe ./src/components/messaging/Message/_tests/index.intg.ts
 * ```
 */
test("Active user message", async (t) => {
  const selector = Selector(selectDemo("Message", "user"));

  const component = new MessageCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectActiveUserMessageVariant();
  await component.expectMessage(MOCK_MESSAGE_TEST);
  await displaysCorrectAvatar(component, MOCK_MESSAGE_AUTHOR_ACTIVE_USER_TEST);
});

test("Respondent message", async (t) => {
  const selector = Selector(selectDemo("Message", "respondent"));

  const component = new MessageCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectRespondentMessageVariant();
  await component.expectMessage(MOCK_MESSAGE_TEST);
  await displaysCorrectAvatar(component, MOCK_MESSAGE_AUTHOR_RESPONDENT_TEST);
});

test("It renders a system message", async (t) => {
  const selector = Selector(selectDemo("Message", "system"));

  const component = new MessageCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectSystemMessageVariant();
  await component.expectMessage(MOCK_MESSAGE_TEST);
  await displaysCorrectAvatar(component, MOCK_MESSAGE_AUTHOR_SYSTEM_TEST);
});

test("It renders an attachment", async (t) => {
  const selector = Selector(selectDemo("Message", "attachment"));

  const component = new MessageCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectMessage(MOCK_MESSAGE_TEST);
  await component.expectAttachment();
});

test("It renders the correct timestamp", async (t) => {
  const selector = Selector(selectDemo("Message", "user"));

  const component = new MessageCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.hasTimestamp(true);
  await component.expectTimestamp(
    dayjs.unix(MOCK_TIMESTAMP_TEST).format(messagingTimeFormat),
  );
});

test("It does not render timestamp and avatar", async (t) => {
  const selector = Selector(selectDemo("Message", "consecutive"));

  const component = new MessageCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.hasTimestamp(false);
  await component.isAvatarVisible(false);
});

test("It renders a compact layour version", async (t) => {
  const selector = Selector(selectDemo("Message", "compact"));

  const component = new MessageCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.expectCompactLayoutVariant();
});
