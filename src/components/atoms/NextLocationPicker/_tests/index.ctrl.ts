import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FilterControlCtrl } from "../../../generic/FilterControl/_tests/index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { LocationCardCtrl } from "../../LocationCard/_tests/index.ctrl";
import { STATE_SELECTION_ALL } from "../constants";

export class LocationPickerCtrl {
  public filterControl: FilterControlCtrl;
  public showMoreButton: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.filterControl = new FilterControlCtrl(selector, t);
    this.showMoreButton = new ButtonCtrl(
      selector.find(toTestSelector("show-more")),
      t,
    );
  }

  /**
   * Given the name of a location, this helper will try to find the
   * matching location card and return the controller
   *
   * @note this will throw an Error if the location cannot be found
   */
  private async getLocation(name: string) {
    const count = await this.selector.find(toTestSelector("location")).count;
    for (let i = 0; i < count; i += 1) {
      const loc = this.selector.find(toTestSelector("location")).nth(i);
      const locationController = new LocationCardCtrl(loc, this.t);
      const locName = await locationController.getName();
      if (locName === name) {
        return locationController;
      }
    }

    throw new Error("unable to find location");
  }

  public async clickLocation(name: string) {
    const loc = await this.getLocation(name);
    await loc.card.click();
  }

  public async selectState(state: string) {
    await this.filterControl.setSelectedFilterByLabel(state);
  }

  public async selectAllStates() {
    await this.filterControl.setSelectedFilterByLabel(STATE_SELECTION_ALL);
  }

  public async expectAmountOfLocationsShowingToEqual(
    numberOfLocations: number,
  ) {
    const count = await this.selector.find(toTestSelector("location-card"))
      .count;
    await this.t.expect(count).eql(numberOfLocations);
  }

  public async expectLocationsShowing(locationNames: string[]) {
    // first check to make sure we have the right amount showing
    await this.expectAmountOfLocationsShowingToEqual(locationNames.length);
    // then check to make sure each item is the correct value
    for (const loc of locationNames) {
      await this.getLocation(loc);
    }
  }
}
