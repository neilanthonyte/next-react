export class HcpAppointmentTypeWithSlotsCtrl {
  public appointmentTypeCard: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.appointmentTypeCard = selector;
  }

  public async expectText(text: string) {
    await this.t.expect(this.appointmentTypeCard.innerText).eql(text);
  }

  public async clickAppointmentTypeCard() {
    await this.t.click(this.appointmentTypeCard);
  }
}
