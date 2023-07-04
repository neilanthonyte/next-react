import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class TemperatureCtrl {
  constructor(private selector: Selector, private t: TestController) {}

  public async expectReadingValue(reading: string) {
    await this.t.expect(this.selector.innerText).eql(reading);
  }
}
