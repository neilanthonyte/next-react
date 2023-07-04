import * as React from "react";
import { NextLocation } from "next-shared/src/models/NextLocation";

export interface INextLocationsContextValue {
  locations: NextLocation[] | null;
  isLoading: boolean;
  error: Error | null;
  fetchLocations: () => Promise<NextLocation[] | void>;
}

export const NextLocationsContext =
  React.createContext<INextLocationsContextValue>({
    locations: undefined,
    isLoading: undefined,
    error: undefined,
    fetchLocations: undefined,
  });
