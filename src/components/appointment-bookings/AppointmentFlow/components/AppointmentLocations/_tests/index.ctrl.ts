import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { NextLocationListingCtrl } from "../../../../NextLocationListing/_tests/index.ctrl";
import { EAppointmentLocations } from "../EAppointmentLocations";

export class AppointmentLocationsCtrl {
  public location: NextLocationListingCtrl;
  public australianState: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.location = new NextLocationListingCtrl(
      this.selector.find(toTestSelector("cell")),
      this.t,
    );
    this.australianState = this.selector.find(toTestSelector("title"));
  }

  public async clickAustralianState(state: EAppointmentLocations) {
    await this.t.click(this.australianState.withText(state));
  }
}
