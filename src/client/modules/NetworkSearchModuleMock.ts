import { injectable, inject } from "inversify";

import { INetworkSearchModule } from "../modules/NetworkSearchModule";
import {
  INetworkSearchResults,
  INetworkSearchFilters,
  EBookingBillingType,
  EDeliveryMethod,
} from "next-shared/src/types/INetworkSearchResults";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { IGeo } from "next-shared/src/types/IGeo";
import { mockSearchResults } from "next-shared/src/mockData/mockNetworkSearchData";
import { IHttpConnection } from "../connections/HttpConnection";
import { AppointmentType } from "next-shared/src/models/AppointmentType";

@injectable()
export class MockNetworkSearchModule implements INetworkSearchModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async search(
    searchText: string = "",
    latLng?: IGeo,
    searchFilters?: INetworkSearchFilters,
  ): Promise<INetworkSearchResults> {
    // specifically return no results if this string is given
    if (searchText === "fail") {
      return {
        suburbs: [],
        hcps: [],
        locations: [],
        appointmentTypes: [],
        displayOrder: [],
        hasResults: false,
      };
    }
    return {
      suburbs: mockSearchResults.suburbs,
      hcps: mockSearchResults.hcps,
      locations: mockSearchResults.locations.map((l) =>
        NextLocation.unserialize(l),
      ) as NextLocation[],
      appointmentTypes: mockSearchResults.appointmentTypes
        .map((a) => AppointmentType.unserialize(a))
        // bulk billing filter
        .filter((a) => {
          if (searchFilters) {
            if (searchFilters.billing === EBookingBillingType.bulk) {
              return a.price === 0 || a.rebate === a.price;
            } else if (searchFilters.billing === EBookingBillingType.private) {
              return a.price > 0 || a.rebate !== a.price;
            }
          }
          return true;
        })
        // telehealth filter
        .filter((a) => {
          if (searchFilters) {
            if (searchFilters.deliveryMethod === EDeliveryMethod.physical) {
              return a.method !== "digital";
            } else if (
              searchFilters.deliveryMethod === EDeliveryMethod.digital
            ) {
              return a.method !== "physical";
            }
          }
          return true;
        }),
      displayOrder: mockSearchResults.displayOrder,
      hasResults: true,
    };
  }
}
