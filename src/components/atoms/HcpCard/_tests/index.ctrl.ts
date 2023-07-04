import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CardCtrl } from "../../../structure/Card/_tests/index.ctrl";
import { CellCtrl } from "../../../structure/Cell/_tests/index.ctrl";
import { randomNum } from "../../../../helpers/random";
import { AppointmentTypeCardCtrl } from "../../AppointmentTypeCard/_tests/index.ctrl";

// TODO: test the next available appointment part of the HcpCard

export class HcpCardCtrl {
  public card: CardCtrl;
  public infoCell: CellCtrl;
  public bookingsCell: CellCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.card = new CardCtrl(selector, t);
    this.infoCell = new CellCtrl(selector.find(toTestSelector("info-cell")), t);
    this.bookingsCell = new CellCtrl(
      selector.find(toTestSelector("bookings-cell")),
      t,
    );
  }

  private async getAppointmentTypeCardForAppointmentString(
    appointmentName: string,
  ) {
    const count = await this.selector.find(toTestSelector("appointment")).count;

    if (count === 0) {
      throw new Error("No appointment cards on the screen");
    }

    for (let i = 0; i < count; i += 1) {
      const appointment = new AppointmentTypeCardCtrl(
        this.selector.find(toTestSelector("appointment")).nth(i),
        this.t,
      );

      const label = await appointment.getLabel();

      if (label === appointmentName) {
        return appointment;
      }
    }

    throw new Error(
      `Could not find appointment card for appointment: ${appointmentName}`,
    );
  }

  public async getName() {
    const headingValue = await this.infoCell.getHeading();
    return headingValue;
  }

  public async expectName(name: string) {
    const headingValue = await this.infoCell.getHeading();
    await this.t.expect(headingValue).eql(name);
  }

  public async expectDescription(description: string) {
    const type = await this.infoCell.getTypeLabel();
    await this.t.expect(type.toLowerCase()).eql(description.toLowerCase());
  }

  public async expectBio(bio: string) {
    const description = await this.infoCell.getDescription();
    await this.t.expect(description.toLowerCase()).eql(bio.toLowerCase());
  }

  // TODO - this method can be implemented when the Button has a more solid test controller
  // public async expectProfileLink(link: string) {
  //   const button = new ButtonCtrl(this.selector.find(toTestSelector("bookings-cell")), this.t);
  // }

  public async expectAppointmentsShowingAre(appointmentNames: string[]) {
    await this.expectNumberOfAppointmentsShowingIs(appointmentNames.length);

    for (const appointment of appointmentNames) {
      await this.getAppointmentTypeCardForAppointmentString(appointment);
    }
  }

  private async getAmountOfVisibleAppointments() {
    // the card hides secondary content through "display: none", so we check here to make sure it's actually visible
    const countInDom = await this.selector.find(toTestSelector("appointment"))
      .count;

    let countVisible = 0;

    for (let i = 0; i < countInDom; i += 1) {
      const visible = await this.selector
        .find(toTestSelector("appointment"))
        .nth(i).visible;
      if (visible) {
        countVisible += 1;
      }
    }

    return countVisible;
  }

  public async expectNumberOfAppointmentsShowingIs(appointments: number) {
    const countVisible = await this.getAmountOfVisibleAppointments();

    await this.t.expect(countVisible).eql(appointments);
  }

  public async clickAppointment(appointmentName: string) {
    const appointment = await this.getAppointmentTypeCardForAppointmentString(
      appointmentName,
    );
    await appointment.card.click();
  }

  public async clickRandomAppointment() {
    const visibleAppointments = await this.getAmountOfVisibleAppointments();
    const randomAppointmentToClick = randomNum(visibleAppointments) - 1;

    const appointment = new AppointmentTypeCardCtrl(
      this.selector
        .find(toTestSelector("appointment"))
        .nth(randomAppointmentToClick),
      this.t,
    );

    const label = await appointment.getLabel();
    await appointment.card.click();
    return label;
  }

  public async expectHasAppointmentsShowing() {
    const countVisible = await this.getAmountOfVisibleAppointments();
    await this.t.expect(countVisible).gt(0);
  }
}
