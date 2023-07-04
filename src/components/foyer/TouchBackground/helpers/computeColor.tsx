import { IFoyerTouchColors } from "next-shared/src/types/IFoyerMode";

// the transparency for non-touched parts of the simulation
export const TRANSPARENCY_BASE = 0.4;

export const computeColor = (colors: IFoyerTouchColors, magnitude: number) => {
  let r, g, b;
  if (magnitude < 0.5) {
    const mag = magnitude / 0.5;
    const magInvert = 1 - mag;
    r = magInvert * colors.low[0] + mag * colors.mid[0];
    g = magInvert * colors.low[1] + mag * colors.mid[1];
    b = magInvert * colors.low[2] + mag * colors.mid[2];
  } else {
    const mag = (magnitude - 0.5) / 0.5;
    const magInvert = 1 - mag;
    r = magInvert * colors.mid[0] + mag * colors.high[0];
    g = magInvert * colors.mid[1] + mag * colors.high[1];
    b = magInvert * colors.mid[2] + mag * colors.high[2];
  }
  // make it more solid for the ripples
  const transparency =
    TRANSPARENCY_BASE +
    ((1 - TRANSPARENCY_BASE) * Math.abs(magnitude - 0.5)) / 0.5;
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  return `rgba(${r},${g},${b},${transparency})`;
};
