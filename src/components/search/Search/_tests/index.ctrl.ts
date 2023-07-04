import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SearchInputCtrl } from "../../../inputs/SearchInput/_tests/index.ctrl";
import { DropdownCtrl } from "../../../generic/Dropdown/_tests/index.ctrl";
import { AppointmentTypeCardCtrl } from "../../../atoms/AppointmentTypeCard/_tests/index.ctrl";
import { HcpCardCtrl } from "../../../atoms/HcpCard/_tests/index.ctrl";
import { LocationCardCtrl } from "../../../atoms/LocationCard/_tests/index.ctrl";

export class SearchCtrl {
  private searchComponent: Selector;
  private input: SearchInputCtrl;

  private locationFilter: Selector;
  private locationFilterActive: Selector;

  // please use method getFilters() to access/interact with filters.
  private _filters: Selector; // debug

  constructor(private selector: Selector, private t: TestController) {
    this.searchComponent = this.selector.find(toTestSelector("search"));
    this.input = new SearchInputCtrl(this.searchComponent, this.t);

    this.locationFilter = this.searchComponent.find(
      toTestSelector("filter-location"),
    );
    this.locationFilterActive = this.searchComponent.find(
      toTestSelector("filter-location-active"),
    );

    this._filters = this.searchComponent.find(toTestSelector("filter-option"));
  }

  public async exists() {
    // expect the locationFilter to exist, potentially in its active state.
    await this.t
      .expect(
        await Promise.race([
          this.locationFilter.exists,
          this.locationFilterActive.exists,
        ]),
      )
      .ok();
    await this.t.expect(await this.searchComponent.exists).ok();
  }

  public async setLocationFilter(on: boolean) {
    const active = await this.locationFilterActive.exists;

    if (on !== active) {
      await this.t.click(
        active ? this.locationFilterActive : this.locationFilter,
      );
      await (active ? this.locationFilter : this.locationFilterActive).exists;
    }
  }

  public async setValue(value: string) {
    await this.input.setValue(value);
    // wait for search.
    await this.t.wait(500);
  }

  public async getFilters(): Promise<DropdownCtrl[]> {
    const filters: DropdownCtrl[] = [];

    for (let i = 0; i < (await this._filters.count); i++) {
      filters.push(new DropdownCtrl(this._filters.nth(i), this.t));
    }

    return filters;
  }

  public async getResults() {
    // get the result sections
    const resultSections = this.searchComponent.find(
      toTestSelector("search-results"),
    );

    // these will be the selectors for the corresponding results (if they exist).
    let hcps,
      locations,
      appointmentTypes,
      suburbs = null;

    for (let i = 0; i < (await resultSections.count); i++) {
      const section = resultSections.nth(i);

      // get the actual results in the section
      const sectionItems = section.find(toTestSelector("search-result"));

      const innerText = await section.innerText;

      // Based on the section heading, store the results of the section
      // in the corresponding variable.
      if (innerText.includes("Practitioners")) {
        hcps = sectionItems;
      } else if (innerText.includes("Practices")) {
        locations = sectionItems;
      } else if (innerText.includes("Appointment Types")) {
        appointmentTypes = sectionItems;
      } else if (innerText.includes("Suburbs")) {
        suburbs = sectionItems;
      } else {
        // fail test.
        await this.t.expect(false).ok();
      }
    }

    const results: Array<
      HcpCardCtrl | LocationCardCtrl | AppointmentTypeCardCtrl | Selector
    > = [];

    if (hcps) {
      for (let i = 0; i < (await hcps.count); i++) {
        results.push(new HcpCardCtrl(hcps.nth(i), this.t));
      }
    }

    if (locations) {
      for (let i = 0; i < (await locations.count); i++) {
        results.push(new LocationCardCtrl(locations.nth(i), this.t));
      }
    }

    if (appointmentTypes) {
      for (let i = 0; i < (await appointmentTypes.count); i++) {
        results.push(
          new AppointmentTypeCardCtrl(appointmentTypes.nth(i), this.t),
        );
      }
    }

    if (suburbs) {
      for (let i = 0; i < (await suburbs.count); i++) {
        results.push(
          suburbs.nth(i).find(toTestSelector("search-result-suburb")),
        );
      }
    }

    return results;
  }

  public async noResults() {
    const noResults = this.searchComponent.find(
      toTestSelector("search-no-result"),
    );
    return await this.t.expect(await noResults.exists).ok();
  }
}
