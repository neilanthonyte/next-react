import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { FilterCtrl } from "../../Filter/_tests/index.ctrl";
import { FiltersPopoverCtrl } from "../../FiltersPopover/_tests/index.ctrl";

// TODO need to check if this works, as the popover components are a bit tricky to work with and isolate with selector
// as they are react portals mounted at the bottom of the body in the DOM structures.
// e.g. we could have the all filters summary popover open at the same time as one of the single filter tag popover

export class FiltersCtrl {
  public element: Selector;
  public filtersSummary: Selector;
  public filtersSummaryPopover: FiltersPopoverCtrl;
  public filtersTags: Selector;
  public filtersCounter: Selector;
  public applyFiltersBtn: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("filters"));
    this.filtersSummary = this.selector.find(toTestSelector("summary"));
    this.filtersTags = this.selector.find(toTestSelector("tags"));
    this.filtersCounter = this.selector.find(toTestSelector("counter"));
    this.applyFiltersBtn = new ButtonCtrl(
      this.selector.find(toTestSelector("apply-filters")),
      this.t,
    );
    this.filtersSummaryPopover = new FiltersPopoverCtrl(this.selector, this.t);
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async clickFilterSummary() {
    await this.t.click(this.filtersSummary);
  }

  public async expectFilterSummaryPopover() {
    await this.filtersSummaryPopover.element.exists();
  }

  // shows if there are secondary filters type
  public async expectFiltersSummaryCount(exists: boolean) {
    await this.t.expect(this.filtersCounter.exists).eql(exists);
  }

  // e.g. 3 of 5
  public async expectFiltersSummaryCountLabel(label: string) {
    await this.t.expect(this.filtersCounter.innerText).eql(label);
  }

  public async openFilterPopover(filterIndex: number) {
    const filterSelector = await this.filtersTags.nth(filterIndex);
    const filterCtrl = new FilterCtrl(filterSelector, this.t);
    await filterCtrl.element.click();
    return filterCtrl;
  }

  public async expectFilterTagsCount(tagsNumber: number) {
    const filterTagsCount = await this.filtersTags.count;
    await this.t.expect(filterTagsCount).eql(tagsNumber);
  }

  public async expectApplyFiltersBtn() {
    await this.applyFiltersBtn.exists();
  }

  public async clickApplyFiltersBtn() {
    await this.applyFiltersBtn.click();
  }
}
