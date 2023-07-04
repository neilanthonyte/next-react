import { NextLocation } from "next-shared/src/models/NextLocation";
import { useMemo } from "react";
import { useLocations } from "../../content/useLocations";

import { useClient } from "../../useClient";
import { useSyncedSessionData } from "../useSyncedSessionData";

interface IUseCurrentLocation {
  activeLocation: NextLocation;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Fetches the current location for the user.
 */
export const useActiveLocation = (): IUseCurrentLocation => {
  const client = useClient();
  const { scope } = useSyncedSessionData();
  const { locations, isLoading, error, refetch } = useLocations();

  const locationSlug =
    scope?.cmsLocationSlug || client.auth.session?.staffMember?.cmsLocationSlug;

  const currentLocation = useMemo(() => {
    if (!locationSlug || !locations) {
      return null;
    }
    const loc = locations.find((l) => l.slug === locationSlug);
    if (!loc) {
      console.warn("unable to find location", locationSlug);
      return null;
    }
    return loc;
  }, [locationSlug, locations]);

  return {
    activeLocation: currentLocation,
    isLoading,
    error,
    refetch,
  };
};
