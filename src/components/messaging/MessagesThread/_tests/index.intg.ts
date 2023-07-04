import { Selector } from "testcafe";

import {
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { MessagesThreadCtrl } from "./index.ctrl";
import dayjs from "dayjs";
import { messagingDateGroupFormat } from "../../../../helpers/momentFormats";

fixture("MessagesThread").page("http://localhost:6060/#/MessagesThread");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/messaging/MessagesThread/index.tsx yarn dev
 * yarn testcafe ./src/components/messaging/MessagesThread/_tests/index.intg.ts
 * ```
 */
test("It shows a no messages placeholder when no messages available", async (t) => {
  const selector = Selector(selectDemo("MessagesThread", "empty"));

  const component = new MessagesThreadCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.showsNoMessagesPlaceholder();
});

test("It renders the input field", async (t) => {
  const selector = Selector(selectDemo("MessagesThread", "empty"));

  const component = new MessagesThreadCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.showsNewMessageInput();
});

test("It posts a new message correctly", async (t) => {
  const selector = Selector(selectDemo("MessagesThread", "empty"));

  const component = new MessagesThreadCtrl(selector.find(selectComponent()), t);

  const testMessage = "test message";

  await component.setNewMessageInputValue(testMessage);
  await component.submitNewMessage();
  const formattedGroupDate = dayjs().format(messagingDateGroupFormat);
  await component.expectDateGroup(formattedGroupDate);
  const lastMessage = await component.getLastPostedMessage();
  await lastMessage.expectActiveUserMessageVariant();
  await lastMessage.expectMessage(testMessage);
});
