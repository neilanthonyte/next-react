import * as React from "react";
import { useState, useCallback, useEffect, useMemo } from "react";

import { GeoContext, IGeoContextValue } from "../../contexts/GeoContext";
import { ErrorResolverContext } from "../../contexts/ErrorResolver";
import { useClient } from "../../hooks/useClient";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import { IGeo } from "next-shared/src/types/IGeo";

export interface IGeoHandlerProps {
  autoRequestLocation?: boolean;
}

export const GeoHandler: React.FC<IGeoHandlerProps> = ({
  autoRequestLocation = true,
  children,
}) => {
  const { resolveError } = useRequiredContext(ErrorResolverContext);
  const client = useClient();

  const [postcodeLatLong, setPostcodeLatLong] = useState<IGeo>();
  const [browserLatLong, setBrowserLatLong] = useState<IGeo>();

  // use browser's location services to get the lat long
  const requestBrowserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setBrowserLatLong({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (autoRequestLocation) {
      requestBrowserLocation();
    }
  }, [autoRequestLocation]);

  const setByPostcode = async (postcode: string): Promise<void> => {
    try {
      const latLng = await client.geo.getLatLngByPostcode(postcode);
      setPostcodeLatLong(latLng);
    } catch (e) {
      resolveError({
        title: "Unable to find postcode",
        approach: "modal",
      });
    }
  };

  // determine the current approach for determing the lat-long
  const latLng = useMemo(() => {
    // postcode manually entered, so it takes preference
    if (postcodeLatLong) return postcodeLatLong;
    // browser is reasonable fallback
    if (browserLatLong) return browserLatLong;
    return null;
  }, [postcodeLatLong, browserLatLong]);

  const provider: IGeoContextValue = {
    latLng,
    setByPostcode,
    clearByPostcode: () => setPostcodeLatLong(null),
    setByBrowser: requestBrowserLocation,
    clearByBrowser: () => setBrowserLatLong(null),
  };

  return <GeoContext.Provider value={provider}>{children}</GeoContext.Provider>;
};
