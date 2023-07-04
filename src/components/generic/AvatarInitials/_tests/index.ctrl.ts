import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class AvatarInitialsCtrl {
  public element: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.element = selector.find(toTestSelector("avatar-initials"));
  }

  public async expect(text: string) {
    await this.t.expect(this.element.innerText).eql(text);
  }

  public async exists(value: boolean) {
    await this.t.expect(await this.element.exists).eql(value);
  }

  public async expectInitials(text: string) {
    await this.t.expect(this.element.innerText).eql(text);
  }
}
