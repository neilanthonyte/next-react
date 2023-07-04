import { Selector } from "testcafe";

import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { MessageInputCtrl } from "./index.ctrl";
import {
  EMessageInputTestAttributes,
  MOCK_ADD_ITEM_ACTION_LABELS_TEST,
} from "../readme";

fixture("MessageInput").page("http://localhost:6060/#/MessageInput");

/**
 * To run:
 *
 * ```
 * PATTERN=./src/components/messaging/MessageInput/index.tsx yarn dev
 * yarn testcafe ./src/components/messaging/MessageInput/_tests/index.intg.ts
 * ```
 */
test("Submit message button behaves correctly", async (t) => {
  const selector = Selector(selectDemo("MessageInput", "standard"));

  const component = new MessageInputCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.isSubmitBtnDisabled(true);
  await component.setMessageInputValue("test");
  await component.isSubmitBtnDisabled(false);
});

test("It submits the correct message and resets the input afterwards", async (t) => {
  const selector = Selector(selectDemo("MessageInput", "standard"));

  const component = new MessageInputCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.setMessageInputValue("test");
  await component.submitMessage();

  const submittedMessage = selectAttribute(EMessageInputTestAttributes.Message);

  await t.expect(submittedMessage).eql("test");

  const newInputValue = await component.getMessageInputValue();
  await t.expect(newInputValue).eql("");
});

test("Add item actions work correctly", async (t) => {
  const selector = Selector(selectDemo("MessageInput", "add-item-options"));

  const component = new MessageInputCtrl(selector.find(selectComponent()), t);

  await component.exists();
  await component.addItemBtnExists();
  await component.openAddItemPopover();
  await component.addItemActionsPopover.exists();
  await component.pickAddItemOption(0);

  const pickedActionLabel = await selector.getAttribute(
    selectAttribute(EMessageInputTestAttributes.Action),
  );

  await t.expect(pickedActionLabel).eql(MOCK_ADD_ITEM_ACTION_LABELS_TEST[0]);
});
