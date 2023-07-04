import moment from "moment-timezone";
import DurationConstructor = moment.unitOfTime.DurationConstructor;

import { TFrequencies } from "next-shared/src/types/TFrequencies";

export const frequencyToMomentUnitAndAmount = (
  frequency: TFrequencies,
): { amount: number; unit: DurationConstructor } => {
  switch (frequency) {
    case TFrequencies.Annual:
      return {
        amount: 1,
        unit: "y",
      };
    case TFrequencies.Biannual:
      return {
        amount: 6,
        unit: "M",
      };
    case TFrequencies.Quarter:
      return { amount: 3, unit: "M" };
    case TFrequencies.Month:
      return {
        amount: 1,
        unit: "M",
      };
    case TFrequencies.Week:
      return {
        amount: 1,
        unit: "w",
      };
    case TFrequencies.Day:
      return {
        amount: 1,
        unit: "d",
      };
    default:
      throw new Error(`${frequency} not supported`);
  }
};
