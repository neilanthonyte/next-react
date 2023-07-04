import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import { IGeo } from "next-shared/src/types/IGeo";
import {
  INetworkSearchResults,
  INetworkSearchFilters,
} from "next-shared/src/types/INetworkSearchResults";
import {
  AppointmentType,
  IAppointmentType,
} from "next-shared/src/models/AppointmentType";
import {
  NextLocation,
  ISerializedNextLocation,
} from "next-shared/src/models/NextLocation";

export interface INetworkSearchModule {
  search(
    searchText?: string,
    latLng?: IGeo,
    searchFilters?: INetworkSearchFilters,
  ): Promise<INetworkSearchResults>;
}

@injectable()
export class NetworkSearchModule implements INetworkSearchModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async search(
    searchText: string = "",
    latLng?: IGeo,
    searchFilters?: INetworkSearchFilters,
  ): Promise<INetworkSearchResults> {
    const res = await this._httpConnection.makeRequest({
      url: "network-search",
      method: "get",
      params: {
        searchText,
        lat: latLng ? latLng.lat.toString() : "",
        lng: latLng ? latLng.lng.toString() : "",
        filters: JSON.stringify(searchFilters),
      },
    });

    const unserializedResults = res.searchResults as INetworkSearchResults;

    return {
      ...unserializedResults,
      appointmentTypes: unserializedResults.appointmentTypes.map((type) =>
        AppointmentType.unserialize(type),
      ),
      locations: unserializedResults.locations.map(
        (loc) => NextLocation.unserialize(loc) as NextLocation,
      ),
    };
  }
}
