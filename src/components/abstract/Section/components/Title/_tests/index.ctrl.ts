import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class TitleCtrl {
  private title: Selector;

  constructor(private s: Selector, private t: TestController) {
    this.title = this.s.find(toTestSelector("title"));
  }

  public async getContents() {
    return await this.title().textContent;
  }

  public async checkContents(expectedContents: string) {
    await this.t.expect(this.title.textContent).eql(expectedContents);
  }

  public async checkClassNameWasApplied(className: string) {
    await this.t.expect(this.title.classNames).contains(className);
  }

  public async checkSizeIsCorrect(size: 1 | 2 | 3 | 4) {
    await this.t.expect(await this.title.child(0).tagName).eql(`h${size}`);
  }
}
