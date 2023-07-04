import { IGeo } from "next-shared/src/types/IGeo";
import * as React from "react";

export interface IGeoContextValue {
  latLng: IGeo;
  setByPostcode: (postcode: string) => Promise<void>;
  clearByPostcode: () => void;
  setByBrowser: () => void;
  clearByBrowser: () => void;
  isLoading?: boolean;
  isBlocked?: boolean;
}

export const GeoContext = React.createContext<IGeoContextValue>({
  latLng: undefined,
  setByPostcode: undefined,
  clearByPostcode: undefined,
  setByBrowser: undefined,
  clearByBrowser: undefined,
  isLoading: undefined,
  isBlocked: undefined,
});
