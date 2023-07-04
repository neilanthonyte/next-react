import * as React from "react";
import { useTemperatureMetric } from "../../../hooks/useTemperatureMetric";
import { celsiusToFahrenheit } from "../../../helpers/celsiusToFahrenheit";

export interface ITemperatureProps {
  temperature: number;
  fractionDigits?: number;
}

// Will show a formatted temperature as a string and take into account the measurement type
export const Temperature: React.FC<ITemperatureProps> = ({
  temperature,
  fractionDigits = 2,
}) => {
  const displayAsCelsius = useTemperatureMetric() === "metric";
  return (
    <span>
      {displayAsCelsius
        ? temperature.toFixed(fractionDigits)
        : celsiusToFahrenheit(temperature).toFixed(fractionDigits)}{" "}
      °{displayAsCelsius ? "C" : "F"}
    </span>
  );
};
