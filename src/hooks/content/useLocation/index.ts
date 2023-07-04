import { useQuery } from "react-query";
import { useMemo } from "react";

import { NextLocation } from "next-shared/src/models/NextLocation";

import { useClient } from "../../useClient";

interface IUseLocation {
  location: NextLocation;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<NextLocation>;
}

/**
 * Returns the location with the supplied slug, or null if one doesn't exist.
 */
export const useLocation = (slug?: string): IUseLocation => {
  const client = useClient();

  const {
    data: location,
    error,
    isLoading,
    refetch,
  } = useQuery<NextLocation, Error>(
    `retrieveLocation-${slug}`,
    () =>
      slug
        ? client.locations.retrieveLocationBySlug(slug)
        : Promise.resolve(null),
    {
      retry: false,
      refetchOnMount: false,
    },
  );

  return useMemo<IUseLocation>(
    () => ({
      location,
      isLoading,
      error,
      refetch,
    }),
    [location, isLoading, error, refetch],
  );
};
