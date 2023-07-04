import { IGeo } from "next-shared/src/types/IGeo";

export const distanceBetweenTwoLocations = (
  startLocation: IGeo,
  destination: IGeo,
): number | null => {
  if (!startLocation || !destination) {
    return null;
  }

  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371; // km
  const dLat = toRad(startLocation.lat - destination.lat);
  const dLon = toRad(startLocation.lng - destination.lng);
  const lat1 = toRad(destination.lat);
  const lat2 = toRad(startLocation.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
