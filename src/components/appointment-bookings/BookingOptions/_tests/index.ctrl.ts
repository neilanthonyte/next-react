import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class BookingOptionsCtrl {
  public button: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.button = this.selector.find(toTestSelector("BookingOption-button"));
  }

  public async clickButtonWithText(text: string) {
    await this.t.click(this.button.withText(text));
  }

  // TODO: Move this into the AppointmentOtherConcerns controller
  public async clickMultipleIssuesAnswer(answer: "Yes" | "No") {
    await this.t.click(this.button.withText(answer));
  }

  // TODO: Move this into the AppointmentOtherConcerns controller
  public async clickLengthAnswer(minutes: number) {
    await this.t.click(this.button.withText(`${minutes} minutes`));
  }
}
