import { ModalCtrl } from "../../../structure/Modal/_tests/index.ctrl";
import { FormCtrl } from "../../../forms/Form/_tests/index.ctrl";

export class ChecklistTaskIssueModalCtrl {
  public modal: ModalCtrl;
  public form: FormCtrl;

  constructor(private t: TestController) {
    this.modal = new ModalCtrl(this.t);
    this.form = new FormCtrl(this.modal.modalBody, this.t);
  }

  public async expectVisibleModal(value: boolean) {
    await this.modal.expectVisibleModal(value);
  }

  public async submitIssueReport() {
    await this.form.clickSubmit();
  }

  public async cancelIssueReport() {
    await this.form.clickCancel();
  }
}
