import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { delay } from "../../../../helpers/delay";
import { FormCtrl, IFillOptions } from "../../Form/_tests/index.ctrl";

export class MultiFormCtrl {
  public activeForm: FormCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.activeForm = new FormCtrl(
      selector.find(toTestSelector("multiform-form")),
      t,
    );
  }

  public async getActiveFormIndex(): Promise<number> {
    return parseInt(
      await this.selector
        .find(toTestSelector("multiform-toggleviews"))
        .getAttribute("data-test-activeselectionindex"),
      10,
    );
  }

  public async getTotalPages(): Promise<number> {
    return parseInt(
      await this.selector
        .find(toTestSelector("multiform-toggleviews"))
        .with({ boundTestRun: this.t })
        .getAttribute("data-test-totalpages"),
      10,
    );
  }

  public async fill(
    values: { [key: string]: any },
    fillOptions: IFillOptions = {},
  ) {
    const totalPages = await this.getTotalPages();
    let activeIndex = await this.getActiveFormIndex();
    let filledData = {};

    // fill all except the last page
    while (activeIndex + 1 < totalPages) {
      const pageValues = await this.activeForm.fill(values, fillOptions);
      filledData = { ...filledData, pageValues };
      await this.activeForm.clickSubmit();

      await delay(100); // wait for page transition
      activeIndex = await this.getActiveFormIndex();
    }

    // fill the last page
    await this.activeForm.fill(values, fillOptions);
    await this.activeForm.clickSubmit();

    return filledData;
  }
}
