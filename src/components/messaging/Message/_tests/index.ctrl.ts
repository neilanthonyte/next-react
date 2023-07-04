import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { MessageAvatarCtrl } from "../../MessageAvatar/_tests/index.ctrl";
import { activeUserVariantClassName, systemVariantClassName } from "..";

export class MessageCtrl {
  public element: Selector;
  public avatar: MessageAvatarCtrl;
  // only used internally to check if avatar is visible
  private avatarContainer: Selector;
  public authorName: Selector;
  public messageText: Selector;
  public attachment: Selector;
  public timestamp: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.element = selector.find(toTestSelector("message"));
    this.avatarContainer = selector.find(toTestSelector("avatar"));
    this.avatar = new MessageAvatarCtrl(
      this.selector.find(toTestSelector("avatar")),
      this.t,
    );
    this.authorName = selector.find(toTestSelector("author-name"));
    this.messageText = selector.find(toTestSelector("message-text"));
    this.attachment = selector.find(toTestSelector("attachment"));
    this.timestamp = selector.find(toTestSelector("timestamp"));
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async isAvatarVisible(isVisible: boolean) {
    await this.t
      .expect(this.avatarContainer.hasClass("-hidden"))
      .eql(isVisible);
  }

  public async hasTimestamp(value: boolean) {
    await this.t.expect(this.timestamp.exists).eql(value);
  }

  public async showsSystemAvatar() {
    await this.avatar.avatarLogoExists();
  }

  public async showsImageAvatar() {
    await this.avatar.avatarImageExists();
  }

  public async showsInitialsAvatar() {
    await this.avatar.avatarInitialsExists();
  }

  public async expectMessage(message: string) {
    await this.t.expect(this.messageText.innerText).eql(message);
  }

  public async expectAuthorName(name: string) {
    await this.t.expect(this.authorName.innerText).eql(name);
  }

  public async expectTimestamp(time: string) {
    await this.t.expect(this.timestamp.innerText).eql(time);
  }

  public async expectAttachment() {
    await this.t.expect(this.attachment.exists).ok();
  }

  public async expectSystemMessageVariant() {
    await this.t.expect(this.element.hasClass(systemVariantClassName)).ok();
  }

  public async expectActiveUserMessageVariant() {
    await this.t.expect(this.element.hasClass(activeUserVariantClassName)).ok();
  }

  public async expectRespondentMessageVariant() {
    (await this.t
      .expect(!this.element.hasClass(activeUserVariantClassName))
      .ok()) &&
      this.t.expect(!this.element.hasClass(systemVariantClassName)).ok();
  }

  public async expectCompactLayoutVariant() {
    await this.t
      .expect(this.element.hasClass(`-${ELayoutVariant.Compact}`))
      .ok();
  }
}
