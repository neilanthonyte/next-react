import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IconCtrl } from "../../../generic/Icon/_tests/index.ctrl";
import { PopoverCtrl } from "../../../generic/Popover/_tests/index.ctrl";
import { TextInputCtrl } from "../../../inputs/TextInput/_tests/index.ctrl";

export class MessageInputCtrl {
  public element: Selector;
  public submitBtn: IconCtrl;
  public textInput: TextInputCtrl;
  public addItemBtn: IconCtrl;
  public addItemActionsPopover: PopoverCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("message-input"));
    this.submitBtn = new IconCtrl(
      this.selector.find(toTestSelector("submit")),
      this.t,
    );
    this.textInput = new TextInputCtrl(
      this.selector.find(toTestSelector("input")),
      this.t,
    );
    this.addItemBtn = new IconCtrl(
      this.selector.find(toTestSelector("add-item-btn")),
      this.t,
    );
    this.addItemActionsPopover = new PopoverCtrl(this.selector, this.t);
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async setMessageInputValue(value: string) {
    await this.textInput.setValue(value);
  }

  public async getMessageInputValue() {
    return await this.textInput.getValue();
  }

  public async submitMessage() {
    await this.submitBtn.click();
  }

  public async isSubmitBtnDisabled(isDisabled: boolean) {
    await this.t
      .expect(await this.submitBtn.selector.hasClass("-color-disabled"))
      .eql(isDisabled);
  }

  public async addItemBtnExists() {
    await this.t.expect(this.addItemBtn.selector.exists).ok();
  }

  public async openAddItemPopover() {
    await this.addItemBtn.click();
  }

  public async pickAddItemOption(index: number) {
    await this.t.click(
      (
        await this.addItemActionsPopover.findInBody("add-item-option")
      ).nth(index),
    );
  }
}
