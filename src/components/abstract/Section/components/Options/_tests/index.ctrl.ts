import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FilterControlCtrl } from "../../../../../generic/FilterControl/_tests/index.ctrl";

export class OptionsCtrl {
  private options: Selector;
  public filterControl: FilterControlCtrl;

  constructor(private s: Selector, private t: TestController) {
    this.options = this.s.find(toTestSelector("options"));
    this.filterControl = new FilterControlCtrl(this.options, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.options.exists).eql(value);
  }
}
