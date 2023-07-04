import React, { useMemo, useState, FC } from "react";

import {
  FoyerModesContext,
  IFoyerModesContextValue,
} from "../FoyerModesContext";
import { useInterval } from "../../../hooks/useInterval";
import { EFoyerLogoMode, IFoyerMode } from "next-shared/src/types/IFoyerMode";
import { useLocation } from "../../../hooks/content/useLocation";

export interface IFoyerModesHandlerProps {
  locationSlug?: string;
  /** Debug foyer modes to help test specific mode settings */
  _modes?: IFoyerMode[];
  /** Debug to make it easier to explore multiple modes */
  cycleSpeed?: number;
  /** Show a specific mode */
  _modeIndex?: number;
}

/**
 * A simple default cycle in case a location does not have foyers modes available.
 */
const defaultModes: IFoyerMode[] = [
  // default logo
  {
    touchColors: {
      high: [100, 188, 174],
      mid: [240, 240, 240],
      low: [200, 200, 200],
    },
    logoType: EFoyerLogoMode.COLOR,
  },
  // default logo
  {
    touchColors: {
      high: [100, 188, 174],
      mid: [240, 240, 240],
      low: [200, 200, 200],
    },
    showArticle: true,
  },
];

export const FoyerModesHandler: FC<IFoyerModesHandlerProps> = ({
  locationSlug,
  cycleSpeed = 20 * 1000,
  _modes = null,
  _modeIndex,
  children,
}) => {
  const { location } = useLocation(locationSlug);
  const [count, setCount] = useState<number>(0);

  const modes = useMemo(
    () => location?.foyerModes ?? _modes ?? defaultModes,
    [_modes, location],
  );

  useInterval(() => {
    setCount((c) => (c + 1) % modes.length);
  }, cycleSpeed);

  const value: IFoyerModesContextValue = useMemo(
    () => ({
      modes,
      activeMode: _modeIndex ? modes[_modeIndex] : modes[count % modes.length],
      count,
      modeDuration: cycleSpeed,
    }),
    [modes, count],
  );

  return (
    <FoyerModesContext.Provider value={value}>
      {children}
    </FoyerModesContext.Provider>
  );
};
