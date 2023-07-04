import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IconCtrl } from "../../../generic/Icon/_tests/index.ctrl";
import { FooterCtrl } from "../../../abstract/Footer/_tests/index.ctrl";

export class ModalCtrl {
  private modal: Selector;
  private modalContent: Selector;
  public modalHeader: Selector;
  public modalBody: Selector;
  public modalFooter: FooterCtrl;
  private closeIcon: IconCtrl;

  constructor(
    // ModalCtrl does not require any selector to be supplied
    // as the Modal component is always inserted at the end of the body tag
    // instead of any specific context
    private t: TestController,
  ) {
    this.modalContent = Selector(toTestSelector("content"));
    this.modalHeader = Selector(toTestSelector("header"));
    this.modalBody = Selector(toTestSelector("body"));
    this.modalFooter = new FooterCtrl(Selector(toTestSelector("footer")), t);
    this.modal = this.modalContent.parent();
    this.closeIcon = new IconCtrl(Selector(toTestSelector("close")), t);
  }

  public async expectVisibleModal(value: boolean) {
    await this.t.expect(this.modalContent.exists).eql(value);
  }

  public async closeModal() {
    await this.closeIcon.click();
  }

  public async hasRenderedHeader(value: boolean) {
    await this.t.expect(this.modalHeader.exists).eql(value);
  }

  public async hasRenderedBody(value: boolean) {
    await this.t.expect(this.modalBody.exists).eql(value);
  }

  public async hasRenderedFooter() {
    await this.modalFooter.exists();
  }

  public async expectModalClass(value: string) {
    const classNames = await this.modal.getAttribute("class");
    await this.t.expect(classNames.includes(value)).eql(true);
  }
}
