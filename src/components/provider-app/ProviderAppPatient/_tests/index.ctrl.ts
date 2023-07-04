import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class ProviderAppPatientCtrl {
  // public subcomponent: SubcomponentCtrl;
  // public element: Selector;

  constructor(private selector: Selector, private t: TestController) {
    // this.subcomponent = new SubcomponentCtrl(
    //   this.selector.find(toTestSelector("componentSelector")),
    //   this.t,
    // );
    // this.element = this.selector.find(toTestSelector("elementSelector"));
  }

  // public async expectText(text: string) {
  //   await this.t.expect(this.element.innerText).eql(text);
  // }

  // public async click() {
  //   await this.t.click(this.element);
  // }
}
