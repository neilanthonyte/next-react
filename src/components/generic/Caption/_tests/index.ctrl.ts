import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class CaptionCtrl {
  private titleElement: Selector;
  private descriptionElement: Selector;
  constructor(private selector: Selector, private t: TestController) {
    this.titleElement = selector.find(toTestSelector("title"));
    this.descriptionElement = selector.find(toTestSelector("description"));
  }

  public async getDescription(): Promise<string> {
    const descriptionInDom = await this.descriptionElement.textContent;
    return descriptionInDom;
  }

  public async getTitle(): Promise<string> {
    const titleInDom = await this.titleElement.textContent;
    return titleInDom;
  }

  public async expectDescription(value: boolean) {
    await this.t.expect(this.descriptionElement.exists).eql(value);
  }
}
