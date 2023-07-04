import { IFoyerTouchColors } from "next-shared/src/types/IFoyerMode";
import { blendColors } from "./blendColors";

export const blendTouchColors = (
  to: IFoyerTouchColors,
  from: IFoyerTouchColors,
  progress: number,
) => {
  if (progress >= 1) {
    return to;
  }
  return {
    high: blendColors(to.high, from.high, progress),
    mid: blendColors(to.mid, from.mid, progress),
    low: blendColors(to.low, from.low, progress),
  };
};
