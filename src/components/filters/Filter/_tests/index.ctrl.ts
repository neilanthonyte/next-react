import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { TagCtrl } from "../../../atoms/Tag/_tests/index.ctrl";
import { FiltersPopoverCtrl } from "../../FiltersPopover/_tests/index.ctrl";

export class FilterCtrl {
  public element: TagCtrl;
  public filterPopover: FiltersPopoverCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = new TagCtrl(
      this.selector.find(toTestSelector("tag")),
      this.t,
    );

    this.filterPopover = new FiltersPopoverCtrl(
      this.selector.find(toTestSelector("popover")),
      this.t,
    );
  }
}
