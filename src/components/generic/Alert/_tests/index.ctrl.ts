import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IconCtrl } from "../../Icon/_tests/index.ctrl";

export class AlertCtrl {
  private icon: IconCtrl;

  constructor(public selector: Selector, private t: TestController) {
    this.selector = selector;
    this.icon = new IconCtrl(selector, t);
  }

  public async expectToShowBodyContent(text: string) {
    const body = this.selector.find(toTestSelector("alert-body"));
    return this.t.expect(await body.innerText).eql(text);
  }

  public async expectToShowHeader(text: string) {
    const header = this.selector.find(toTestSelector("alert-header"));

    return this.t.expect(await header.innerText).eql(text);
  }

  public async expectHeaderToBeHidden() {
    const header = this.selector.find(toTestSelector("alert-header")).exists;

    return this.t.expect(header).notOk();
  }

  public async expectCloseIconToBeHidden() {
    const close = this.selector.find(toTestSelector("alert-close")).exists;

    return this.t.expect(close).notOk();
  }

  public async expectToShowCloseIcon() {
    const close = this.selector.find(toTestSelector("alert-close")).exists;

    return this.t.expect(close).ok();
  }

  public async expectCloseIconToHideAlertOnClick() {
    await this.icon.click();
    const alert = this.selector.find(toTestSelector("alert")).exists;

    return this.t.expect(alert).notOk();
  }

  public async expectToSeeVariantClassNameIfVariantProvided(variant: string) {
    const alert = this.selector
      .find(toTestSelector("alert"))
      .hasClass(`-variant-${variant}`);

    return this.t.expect(alert).ok();
  }
}
