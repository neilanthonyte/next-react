import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { NoDataFallbackCtrl } from "../../../structure/NoDataFallback/_tests/index.ctrl";
import { CarePlanCellCtrl } from "../../CarePlanCell/_tests/index.ctrl";

export class CarePlansListCtrl {
  public element: Selector;
  public noData: NoDataFallbackCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("care-plans-list"));
    this.noData = new NoDataFallbackCtrl(
      this.selector.find(toTestSelector("empty")),
      this.t,
    );
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async expectEmptyList(isEmpty: boolean) {
    await this.t.expect(this.noData.selector.exists).eql(isEmpty);
  }

  public async expectNumberOfPlans(plansNumber: number) {
    return await this.t.expect(this.element.childNodeCount).eql(plansNumber);
  }

  public async getPlan(index: number) {
    const childrenSelector = await this.element.child();
    return new CarePlanCellCtrl(childrenSelector.nth(index), this.t);
  }
}
