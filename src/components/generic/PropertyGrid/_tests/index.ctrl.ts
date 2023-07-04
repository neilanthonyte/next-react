import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
export class PropertyGridCtrl {
  private propertyGrid: Selector;
  private propertyHeader: Selector;
  private valueHeader: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.propertyGrid = this.selector.find(toTestSelector("propertyGrid"));
    this.propertyHeader = this.selector.find(toTestSelector("propertyHeader"));
    this.valueHeader = this.selector.find(toTestSelector("valueHeader"));
  }

  public getProperty(index: number): Selector {
    return this.selector.find(toTestSelector(`property-${index}`));
  }

  public getValue(index: number): Selector {
    return this.selector.find(toTestSelector(`value-${index}`));
  }

  public async expectSelectorValue(selector: Selector, value: string) {
    await this.t.expect(selector.innerText).eql(value);
  }

  public async expectPropertyHeaderValue() {
    await this.t.expect(this.propertyHeader.innerText).eql("Property");
  }

  public async expectValueHeaderValue() {
    await this.t.expect(this.valueHeader.innerText).eql("Value");
  }

  public async expectSelectorTextAlignment(
    selector: Selector,
    alignment: string,
  ) {
    await this.t.expect(selector.getStyleProperty("text-align")).eql(alignment);
  }

  public async expectCorrectHeight(height: number) {
    await this.t.expect(await this.propertyGrid.clientHeight).eql(height);
  }
}
