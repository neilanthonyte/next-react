import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { EAppointmentTypePromptIsNew } from "../EAppointmentTypePromptIsNew";
import { BookingOptionsCtrl } from "../../BookingOptions/_tests/index.ctrl";

export class AppointmentTypePromptIsNewCtrl {
  public bookingOptions: BookingOptionsCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.bookingOptions = new BookingOptionsCtrl(
      this.selector.find(toTestSelector("appointmentTypePrompt")),
      this.t,
    );
  }

  public async clickYesButton() {
    await this.bookingOptions.clickButtonWithText(
      EAppointmentTypePromptIsNew.Yes,
    );
  }

  public async clickNotYetButton() {
    await this.bookingOptions.clickButtonWithText(
      EAppointmentTypePromptIsNew.NotYet,
    );
  }
}
