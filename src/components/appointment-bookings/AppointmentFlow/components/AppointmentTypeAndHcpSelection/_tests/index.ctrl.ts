import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class AppointmentTypeAndHcpSelectionCtrl {
  public bookingForSelfTitle: Selector;
  public forMeButton: Selector;
  public someoneElseButton: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.forMeButton = this.selector.find(toTestSelector("forMe"));
    this.someoneElseButton = this.selector.find(toTestSelector("someoneElse"));
  }

  public async expectForMeButton(text: string) {
    await this.t.expect(this.forMeButton.innerText).eql(text);
  }

  public async clickForMeButton() {
    await this.t.click(this.forMeButton);
  }

  public async expectSomeoneElseButton(text: string) {
    await this.t.expect(this.someoneElseButton.innerText).eql(text);
  }

  public async clickSomeoneElseButton() {
    await this.t.click(this.someoneElseButton);
  }
}
