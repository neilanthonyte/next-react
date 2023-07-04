import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { HcpAppointmentTypeWithSlotsCtrl } from "../../HcpAppointmentTypeWithSlots/_tests/index.ctrl";

export class HcpBookingCardCtrl {
  public hcpCard: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.hcpCard = selector;
  }

  public async findAppointmentTypeByIndex(index: number) {
    const appointmentTypeCard: HcpAppointmentTypeWithSlotsCtrl =
      new HcpAppointmentTypeWithSlotsCtrl(
        this.selector.find(
          toTestSelector(`appointment-${index}`, "data-index"),
        ),
        this.t,
      );
    return appointmentTypeCard;
  }

  public async findAppointmentTypeByTitle(title: string) {
    const appointmentTypeCard: HcpAppointmentTypeWithSlotsCtrl =
      new HcpAppointmentTypeWithSlotsCtrl(
        this.selector.find(
          toTestSelector(`appointment-${title}`, "data-title"),
        ),
        this.t,
      );
    return appointmentTypeCard;
  }

  public async click() {
    await this.t.click(this.hcpCard);
  }
}
