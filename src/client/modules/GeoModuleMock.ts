import { injectable } from "inversify";

import { delay } from "../../helpers/delay";
import { IGeo } from "next-shared/src/types/IGeo";

export interface IGeoModule {
  getLatLngByPostcode(postcode: string): Promise<IGeo>;
}

/**
 * GeometryModule
 */
@injectable()
export class MockGeoModule implements IGeoModule {
  public async getLatLngByPostcode(postcode: string): Promise<IGeo> {
    await delay(500);
    const postcodes: { [postcode: string]: IGeo } = {
      2000: { lat: -33.8694673, lng: 151.2051994 },
      2010: { lat: -33.8802399, lng: 151.2159392 },
      2095: { lat: -33.7965547, lng: 151.28367 },
      2036: { lat: -33.9227964, lng: 151.2206566 },
    };
    return postcodes[postcode] || postcodes[2000];
  }
}
