import { Selector } from "testcafe";

import { THorizontalPositions } from "next-shared/src/types/layouts";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

export class SplitViewCtrl {
  private splitView: Selector;
  private contentView: Selector;
  private detailsView: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.splitView = this.selector.find(toTestSelector("split-view"));
    this.contentView = this.splitView.find(toTestSelector("content-view"));
    this.detailsView = this.splitView.find(toTestSelector("details-view"));
  }

  public async expectContentAndDetailsView(): Promise<void> {
    await this.t.expect(await this.contentView.visible).ok();
    await this.t.expect(await this.detailsView.visible).ok();
  }

  public async expectContentViewAlignment(
    alignment: THorizontalPositions,
  ): Promise<void> {
    const horizontalPositions = Object.values(THorizontalPositions);
    const dataAlignment = await this.contentView.getAttribute("data-alignment");
    await this.t.expect(horizontalPositions.includes(alignment)).ok();
    await this.t.expect(dataAlignment).ok(alignment);
  }

  public async expectDetailsViewSize(size: EStandardSizes): Promise<void> {
    const standardSizes = Object.values(EStandardSizes);
    const dataSize = await this.detailsView.getAttribute("data-size");
    await this.t.expect(standardSizes.includes(size)).ok();
    await this.t.expect(dataSize).ok(size);
  }

  public async expectSticky(isSticky: boolean): Promise<void> {
    await this.t
      .expect(await this.detailsView.getAttribute("data-fixed"))
      .eql(isSticky.toString());
  }
}
