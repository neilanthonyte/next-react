import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { PlaceholderViewCtrl } from "../../../views/PlaceholderView/_tests/index.ctrl";
import { MessageCtrl } from "../../Message/_tests/index.ctrl";
import { MessageInputCtrl } from "../../MessageInput/_tests/index.ctrl";

export class MessagesThreadCtrl {
  public element: Selector;
  public noMessagesPlaceholder: PlaceholderViewCtrl;
  public messageInput: MessageInputCtrl;
  // public dateGroupMessages: Selector;
  // public dateGroupMessagesDate: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("messages-thread"));
    this.noMessagesPlaceholder = new PlaceholderViewCtrl(
      this.selector.find(toTestSelector("no-messages")),
      this.t,
    );
    this.messageInput = new MessageInputCtrl(
      this.selector.find(toTestSelector("message-input")),
      this.t,
    );
    // this.dateGroupMessages = this.selector.find(toTestSelector("date-group"));
    // this.dateGroupMessagesDate = this.dateGroupMessages.find(
    //   toTestSelector("date-group-date"),
    // );
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async showsNoMessagesPlaceholder() {
    await this.noMessagesPlaceholder.exists();
  }

  public async showsNewMessageInput() {
    await this.messageInput.exists();
  }

  public async setNewMessageInputValue(value: string) {
    await this.messageInput.setMessageInputValue(value);
  }

  public async submitNewMessage() {
    await this.messageInput.submitMessage();
  }

  public async expectDateGroup(date: string) {
    await this.t
      .expect(this.element.find(toTestSelector(`date-group-${date}`)))
      .ok();
  }

  public async getDateGroupMessages(date: string) {
    const dateGroupMessagesSelector = await this.element.find(
      toTestSelector(`date-group-${date}`),
    );
    return await dateGroupMessagesSelector.find(toTestSelector("message"));
  }

  public async getLastPostedMessage() {
    const messagesSelector = await this.element.find(toTestSelector("message"));
    const lastMessageSelector = await messagesSelector.nth(
      messagesSelector.length - 1,
    );
    return new MessageCtrl(lastMessageSelector, this.t);
  }
}
