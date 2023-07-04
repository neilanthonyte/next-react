import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ListCtrl } from "../../../structure/List/_tests/index.ctrl";

export class FormPickerCtrl {
  private formList: ListCtrl;
  constructor(private selector: Selector, private t: TestController) {
    this.formList = new ListCtrl(
      this.selector.find(toTestSelector("picker")),
      t,
    );
  }

  public async countFormItems() {
    return this.formList.countListItem();
  }

  public async clickForm(index: number) {
    await this.formList.clickListItem(index);
  }
}
