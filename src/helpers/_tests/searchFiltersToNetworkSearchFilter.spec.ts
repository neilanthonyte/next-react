import { searchFiltersToNetworkSearchFilter } from "../searchFiltersToNetworkSearchFilter";

import {
  EGender,
  EDeliveryMethod,
  EOpenHours,
  INetworkSearchFilters,
  EBookingBillingType,
} from "next-shared/src/types/INetworkSearchResults";
import { ISearchFilter } from "next-shared/src/types/ISearchFilter";

describe("Testing searchFilters to NetworkSearchFilters converter", () => {
  it("should returns all null values if no filters", async (done) => {
    const emptySearchFilters: ISearchFilter[] = [
      {
        title: "Practitioner gender",
        options: { Any: null, Male: EGender.male, Female: EGender.female },
        value: null,
      },
      {
        title: "Appointment delivery",
        options: {
          Any: null,
          Telehealth: EDeliveryMethod.digital,
          "Face to face": EDeliveryMethod.physical,
        },
        value: null,
      },
      {
        title: "Billing",
        options: {
          Any: null,
          Private: EBookingBillingType.private,
          "Bulk bill": EBookingBillingType.bulk,
        },
        value: null,
      },
      {
        title: "Time of the day",
        options: {
          Any: null,
          Today: EOpenHours.today,
          "After hours": EOpenHours.afterHours,
          Weekends: EOpenHours.weekends,
        },
        value: null,
      },
    ];

    const output: INetworkSearchFilters = {
      gender: null,
      deliveryMethod: null,
      billing: null,
      openHours: null,
    };

    expect(searchFiltersToNetworkSearchFilter(null)).toEqual(output);
    expect(searchFiltersToNetworkSearchFilter(emptySearchFilters)).toEqual(
      output,
    );
    done();
  });
  it("should return all null values if unrecognized filters", async (done) => {
    const filters: ISearchFilter[] = [
      {
        title: "Some filter",
        options: { a: "a" },
        value: null,
      },
    ];
    const output: INetworkSearchFilters = {
      gender: null,
      deliveryMethod: null,
      billing: null,
      openHours: null,
    };
    expect(searchFiltersToNetworkSearchFilter(filters)).toEqual(output);
    done();
  });
  it("should handle the conversion correctly", async (done) => {
    const mockSearchFilters: ISearchFilter[] = [
      {
        title: "Practitioner gender",
        options: { Any: null, Male: EGender.male, Female: EGender.female },
        value: null,
      },
      {
        title: "Appointment delivery",
        options: {
          Any: null,
          Telehealth: EDeliveryMethod.digital,
          "Face to face": EDeliveryMethod.physical,
        },
        value: EDeliveryMethod.digital,
      },
      {
        title: "Billing",
        options: {
          Any: null,
          Private: EBookingBillingType.private,
          "Bulk bill": EBookingBillingType.bulk,
        },
        value: null,
      },
      {
        title: "Time of the day",
        options: {
          Any: null,
          Today: EOpenHours.today,
          "After hours": EOpenHours.afterHours,
          Weekends: EOpenHours.weekends,
        },
        value: EOpenHours.today,
      },
    ];
    const output: INetworkSearchFilters = {
      gender: null,
      deliveryMethod: EDeliveryMethod.digital,
      billing: null,
      openHours: EOpenHours.today,
    };
    expect(searchFiltersToNetworkSearchFilter(mockSearchFilters)).toEqual(
      output,
    );
    done();
  });
});
