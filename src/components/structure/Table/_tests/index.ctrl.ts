import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class TableCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  async selectRow(id: string): Promise<Selector> {
    const row = this.selector.find(toTestSelector(id));
    return row;
  }
}
