import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { PopoverCtrl } from "../../Popover/_tests/index.ctrl";

export class DropdownCtrl {
  private button: Selector;
  private popover: PopoverCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.button = this.selector.find(toTestSelector("dropdown-button"));
    this.popover = new PopoverCtrl(this.selector, this.t);
  }

  public async exists() {
    await this.t.expect(await this.button.exists).ok();
    await this.open();
    await this.popover.exists();
    // close dropdown
    await this.t.click(this.selector, { offsetX: 0, offsetY: 0 });
  }

  public async open() {
    await this.t.click(this.button);
  }

  public async pickOption(index: number) {
    await this.t.click(
      (await this.popover.findInBody("dropdown-option")).nth(index),
    );
  }

  public async getTitle() {
    return await this.button.innerText;
  }
}
