import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { TitleCtrl } from "../../../abstract/Section/components/Title/_tests/index.ctrl";
import { ModalCtrl } from "../../../structure/Modal/_tests/index.ctrl";
import { FormCtrl } from "../../../forms/Form/_tests/index.ctrl";
import { HeaderCtrl } from "../../../abstract/Section/components/Header/_tests/index.ctrl";
import { CameraUploadCtrl } from "../../CameraUpload/_tests/index.ctrl";
import { CheckboxCtrl } from "../../Checkbox/_tests/index.ctrl";

export class TaskCtrl {
  private checkboxWrapper: Selector;
  private timestamp: Selector;
  private late: Selector;
  private result: Selector;
  private thumbnail: Selector;

  public header: HeaderCtrl;
  public checkbox: CheckboxCtrl;
  public title: TitleCtrl;
  public modal: ModalCtrl;
  public form: FormCtrl;
  public cameraUpload: CameraUploadCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.checkboxWrapper = this.selector.find(
      toTestSelector("checkboxWrapper"),
    );
    this.timestamp = this.selector.find(toTestSelector("timestamp"));
    this.late = this.selector.find(toTestSelector("late"));
    this.result = this.selector.find(toTestSelector("result"));
    this.thumbnail = this.selector.find(toTestSelector("thumbnail"));

    this.header = new HeaderCtrl(this.selector, this.t);
    this.checkbox = new CheckboxCtrl(this.checkboxWrapper, this.t);
    this.title = new TitleCtrl(this.selector, this.t);
    this.modal = new ModalCtrl(this.t);
    this.form = new FormCtrl(this.modal.modalBody, this.t);
    this.cameraUpload = new CameraUploadCtrl(this.modal.modalBody, this.t);
  }

  public async isDisabled(value: boolean) {
    const sectionState = await this.checkboxWrapper().getAttribute(
      "data-test-section-state",
    );
    await this.t.expect(sectionState === "disabled").eql(value);
  }

  public async isOverdue(value: boolean) {
    const sectionState = await this.checkboxWrapper().getAttribute(
      "data-test-section-state",
    );
    await this.t.expect(sectionState === "error").eql(value);
  }

  public async isLate(value: boolean) {
    (await this.late().exists) &&
      (await this.t.expect(this.late.visible).eql(value));
  }

  public async isTimestampVisible(value: boolean) {
    (await this.timestamp().exists) &&
      (await this.t.expect(this.timestamp.visible).eql(value));
  }

  public async isActionVisible(value: boolean) {
    const showActions = await this.checkboxWrapper().getAttribute(
      "data-test-show-actions",
    );
    await this.t.expect(showActions === "true").eql(value);
  }

  public async isThumbnailVisible(value: boolean) {
    (await this.thumbnail().exists) &&
      (await this.t.expect(this.thumbnail.visible).eql(value));
  }

  public async getCompletionState() {
    return await this.checkboxWrapper().getAttribute(
      "data-test-completion-state",
    );
  }

  public async getTimestamp() {
    return await this.timestamp().innerText;
  }

  public async getResult() {
    return await this.result().innerText;
  }

  public async click() {
    await this.checkbox.click();
  }

  public async clickAction(action: number) {
    await this.header.clickAction(action);
  }
}
