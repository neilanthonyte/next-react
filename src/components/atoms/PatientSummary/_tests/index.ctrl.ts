import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class PatientSummaryCtrl {
  // public subcomponent: SubcomponentCtrl;
  public name: Selector;
  public dob: Selector;

  constructor(private selector: Selector, private t: TestController) {
    // this.subcomponent = new SubcomponentCtrl(
    //   this.selector.find(toTestSelector("componentSelector")),
    //   this.t,
    // );
    this.name = this.selector.find(toTestSelector("name"));
    this.dob = this.selector.find(toTestSelector("dob"));
  }

  public async expectName(text: string) {
    await this.t.expect(this.name.innerText).eql(text);
  }

  public async expectDob(text: string) {
    await this.t.expect(this.dob.innerText).eql(text);
  }
}
