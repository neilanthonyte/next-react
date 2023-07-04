import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class LoaderCtrl {
  private wrapper: Selector;

  constructor(public loader: Selector, private t: TestController) {
    this.wrapper = loader.find(toTestSelector("loader"));
  }

  async expectLoader(value: boolean) {
    await this.t.expect(await this.wrapper.exists).eql(value);
  }

  async expectText(value: string) {
    await this.t.expect(await this.wrapper.innerText).eql(value);
  }
}
