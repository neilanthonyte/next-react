// gets bear data about the type of metric based on the action location region init
import { TMeasuringUnit } from "next-shared/src/types/TMeasuringUnit";
import { useClient } from "./useClient";

export function useTemperatureMetric(): TMeasuringUnit {
  const client = useClient();

  const activeLocation = client.auth.activeLocation;
  const metricCountries = ["United States", "Liberia", "Myanmar"];

  // check region is set
  if (!activeLocation?.address?.country) {
    throw Error(
      "Unable to set measurement type, location has no region value set",
    );
  }

  if (metricCountries.includes(activeLocation.address.country)) {
    return "imperial";
  }

  return "metric";
}
