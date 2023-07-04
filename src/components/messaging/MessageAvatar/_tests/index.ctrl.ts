import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { StaticLogoCtrl } from "../../../branding/StaticLogo/_tests/index.ctrl";
import { AvatarCtrl } from "../../../generic/Avatar/_tests/index.ctrl";
import { AvatarInitialsCtrl } from "../../../generic/AvatarInitials/_tests/index.ctrl";

export class MessageAvatarCtrl {
  public element: Selector;
  public avatarImage: AvatarCtrl;
  public avatarInitials: AvatarInitialsCtrl;
  public avatarLogo: StaticLogoCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = selector.find(toTestSelector("elementSelector"));
    this.avatarLogo = new StaticLogoCtrl(
      selector.find(toTestSelector("avatar-logo")),
      t,
    );
    this.avatarImage = new AvatarCtrl(
      selector.find(toTestSelector("avatar-image")),
      t,
    );
    this.avatarInitials = new AvatarInitialsCtrl(
      selector.find(toTestSelector("avatar-initials")),
      this.t,
    );
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async avatarLogoExists() {
    await this.avatarLogo.exists();
  }

  public async avatarImageExists() {
    await this.avatarImage.exists();
  }

  public async avatarInitialsExists() {
    await this.avatarImage.exists();
  }

  public async expectAvatarImageSource(source: string) {
    await this.avatarImage.expectSourceValue(source);
  }

  public async expectInititials(initials: string) {
    await this.avatarInitials.expectInitials(initials);
  }
}
