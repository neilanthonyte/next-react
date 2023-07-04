import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class AccessCodeCtrl {
  private codeElement: Selector;
  constructor(private selector: Selector, private t: TestController) {
    this.codeElement = selector.find(toTestSelector("access-code"));
  }

  public async getCode(): Promise<string> {
    return await this.codeElement.textContent;
  }
}
