import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class FilterControlCtrl {
  private filterEl: Selector;

  constructor(selector: Selector, private t: TestController) {
    this.filterEl = selector.find(toTestSelector("filter-control"));
  }

  /**
   *
   * @param label
   */
  private async findFilterItemByLabel(label: string) {
    const items = await this.filterEl.childElementCount;
    for (let i = 0; i < items; i += 1) {
      const itemFilterLabel = await this.filterEl
        .child(i)
        .find(toTestSelector("filter-value")).innerText;

      if (itemFilterLabel === label) {
        return this.filterEl.child(i);
      }
    }

    throw new Error(`Could not find filter item by label: ${label}`);
  }

  async assertSelectedLabel(expected: string) {
    const filterItem = await this.findFilterItemByLabel(expected);

    await this.t
      .expect(filterItem.getAttribute("data-test-active"))
      .eql("active");
  }

  /**
   * Selects a filter by it's label.
   * It does this by searching for all filter items within the FilterControl component.
   */
  async setSelectedFilterByLabel(label: string) {
    const filterItem = await this.findFilterItemByLabel(label);
    await this.t.click(filterItem);
  }

  /**
   * Selects a filter by the index in which it exists within the FilterControl.
   *
   * @note use this to select a particular filter item if you can guarantee the order of the filter items.
   */
  async setSelectedFilterByIndex(index: number) {
    await this.t.click(
      this.filterEl.find(toTestSelector(`filter-control-${index}`)),
    );
  }

  async setSelectedFilter(element: string) {
    await this.t.click(toTestSelector(element));
  }
}
