import { PopoverCtrl } from "../../../generic/Popover/_tests/index.ctrl";

export class FiltersPopoverCtrl {
  public element: PopoverCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = new PopoverCtrl(this.selector, this.t);
  }
}
