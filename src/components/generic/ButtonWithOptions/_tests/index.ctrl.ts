import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { OptionsPopoverCtrl } from "../../../atoms/OptionsPopover/_tests/index.ctrl";
import { ButtonCtrl } from "../../Button/_tests/index.ctrl";

export class ButtonWithOptionsCtrl {
  public button: ButtonCtrl;
  public optionsPopover: OptionsPopoverCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.button = new ButtonCtrl(
      this.selector.find(toTestSelector("button")),
      this.t,
    );
    this.optionsPopover = new OptionsPopoverCtrl(this.selector, this.t);
  }
}
