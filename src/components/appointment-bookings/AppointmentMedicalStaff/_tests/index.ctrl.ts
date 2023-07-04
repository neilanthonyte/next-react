import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SearchInputCtrl } from "../../../generic/SearchInput/_tests/index.ctrl";
import { HcpBookingCardCtrl } from "../../HcpBookingCard/_tests/index.ctrl";

export class AppointmentMedicalStaffCtrl {
  public searchInput: SearchInputCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.searchInput = new SearchInputCtrl(
      this.selector.find(toTestSelector("practitioner-search")),
      this.t,
    );
  }

  public async findMedicalStaffByIndex(index: number) {
    const medicalStaffCard: HcpBookingCardCtrl = new HcpBookingCardCtrl(
      this.selector.find(toTestSelector(`${index}`, "data-index")),
      this.t,
    );
    return medicalStaffCard;
  }

  public async findMedicalStaffByTitle(title: string) {
    const medicalStaffCard: HcpBookingCardCtrl = new HcpBookingCardCtrl(
      this.selector.find(toTestSelector(`${title}`, "data-title")),
      this.t,
    );
    return medicalStaffCard;
  }
}
