import * as React from "react";
import { Button } from "../Button";

export interface IGeoLocationProps {
  geoLocation: (position: IPosition | boolean) => void;
  buttonText: string;
}

export interface IPosition {
  coords: ICoords;
  timestamp: number;
}

export interface ICoords {
  accuracy: number | null;
  longitude: number | null;
  latitude: number | null;
  heading: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  speed: number | null;
}

const GeolocationLookup = (props: IGeoLocationProps) => {
  const { geoLocation, buttonText } = props;
  const cords: IPosition | boolean = false;

  const getGeoLocation = () => {
    if (navigator.geolocation) {
      // @ts-ignore
      navigator.geolocation.getCurrentPosition(geoLocation);
    } else {
      geoLocation(false);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={getGeoLocation}>{buttonText}</Button>
    </React.Fragment>
  );
};

export default GeolocationLookup;
