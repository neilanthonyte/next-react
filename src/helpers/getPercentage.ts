import { round } from "lodash";

export const getPercentage = (portion: number, total: number, roundVal = 2) => {
  return round((portion / total) * 100, roundVal);
};
