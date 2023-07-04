import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FooterCtrl } from "../../../abstract/Footer/_tests/index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

export class DialogCtrl {
  public content: Selector;
  public header: Selector;
  public body: Selector;
  public footer: DialogFooterCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.content = this.selector.find(toTestSelector("dialog-content"));
    this.header = this.content.find(toTestSelector("dialog-header"));
    this.body = this.content.find(toTestSelector("dialog-body"));

    this.footer = new DialogFooterCtrl(this.content, this.t);
  }

  public async hasContent() {
    return await this.content().exists;
  }

  public async hasHeader() {
    return await this.header().exists;
  }

  public async hasBody() {
    return await this.body().exists;
  }
}

export class DialogFooterCtrl {
  public footer: FooterCtrl;
  public acceptButton: ButtonCtrl;
  public cancelButton: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.footer = new FooterCtrl(
      selector.find(toTestSelector("dialog-footer")),
      t,
    );
    this.acceptButton = this.footer.acceptButton;
    this.cancelButton = this.footer.cancelButton;
  }

  public async hasFooter() {
    return await this.footer.element.exists;
  }

  public async clickAccept(): Promise<void> {
    await this.acceptButton.click();
  }

  public async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
