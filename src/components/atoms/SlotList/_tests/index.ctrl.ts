import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

export class SlotListCtrl {
  public showMore: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.showMore = new ButtonCtrl(
      this.selector.find(toTestSelector("show-more")),
      this.t,
    );
  }

  /**
   *
   * @param index this value IS zero based, i.e. start from 0!
   */
  public async clickSlot(index: number) {
    const button = new ButtonCtrl(
      await this.selector.find(toTestSelector("slot")).nth(index),
      this.t,
    );
    await button.click();
  }

  public async getSlotLabel(index: number) {
    const button = new ButtonCtrl(
      await this.selector.find(toTestSelector("slot")).nth(index),
      this.t,
    );

    return button.getLabel();
  }

  public async expectSlotCountOnScreenEqual(slotCount: number) {
    const count = await this.selector.find(toTestSelector("slot")).count;
    await this.t.expect(slotCount).eql(count);
  }
}
