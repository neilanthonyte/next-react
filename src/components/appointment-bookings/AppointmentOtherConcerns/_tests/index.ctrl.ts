import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { BookingOptionsCtrl } from "../../BookingOptions/_tests/index.ctrl";

export class AppointmentOtherConcernsCtrl {
  public bookingOptions: BookingOptionsCtrl;
  public additionalTimeRequired: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.bookingOptions = new BookingOptionsCtrl(selector, this.t);
    this.additionalTimeRequired = selector.find(
      toTestSelector("additionalTimeRequired"),
    );
  }

  public async validateOutput(time: number) {
    await this.t.expect(this.additionalTimeRequired.innerText).eql(`${time}`);
  }
}
