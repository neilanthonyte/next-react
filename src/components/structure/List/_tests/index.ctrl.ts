import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ListCtrl {
  static selector: string = "list";
  private list: Selector;
  private listItems: Selector;

  constructor(private s: Selector, private t: TestController) {
    this.list = this.s.find(toTestSelector(ListCtrl.selector));
    this.listItems = this.list.find(toTestSelector("list-item"));
  }

  public async exists(value: boolean) {
    await this.t.expect(this.list.exists).eql(value);
  }

  public async countListItem() {
    return this.listItems.count;
  }

  public async getListItemContent(index: number) {
    const listItem = await this.listItems().nth(index);
    const listItemContent = await listItem().find(
      toTestSelector("list-item-content"),
    );
    return listItemContent.textContent;
  }

  public async getListItemBadge(index: number) {
    const listItem = await this.listItems().nth(index);
    const listItemBadge = await listItem().find(
      toTestSelector("list-item-badge"),
    );
    return listItemBadge.textContent;
  }

  public async clickListItem(index: number) {
    const listItem = await this.listItems().nth(index);
    await this.t.click(listItem);
  }

  public async expectListItemToBeActive(index: number, value: boolean) {
    const isActive = await this.listItems()
      .nth(index)
      .getAttribute("data-test-active");
    const expected = value ? "true" : "false";
    await this.t.expect(isActive).eql(expected);
  }
}
