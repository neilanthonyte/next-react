import { useQuery } from "react-query";
import { useMemo } from "react";

import { NextLocation } from "next-shared/src/models/NextLocation";

import { useClient } from "../../useClient";

interface IUseLocations {
  locations: NextLocation[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<NextLocation[]>;
}

export const useLocations = (): IUseLocations => {
  const client = useClient();

  const {
    data: locations,
    error,
    isLoading,
    refetch,
  } = useQuery<NextLocation[], Error>(
    "retrieveLocations",
    () => client.bookings.retrieveLocations(),
    {
      retry: false,
      refetchOnMount: false,
    },
  );

  return useMemo<IUseLocations>(
    () => ({
      locations,
      isLoading,
      error,
      refetch,
    }),
    [locations, isLoading, error, refetch],
  );
};
