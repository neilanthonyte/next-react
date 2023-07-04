import * as React from "react";
import { useMemo, useState, useCallback, useRef, useEffect } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { defaultTransition } from "../../../helpers/cssTransitions";
import CircularIcon from "../../generic/CircularIcon";
import ToggleViews from "../../structure/ToggleViews";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "FoyerScreen");

export interface IFoyerScreen {
  icon: string;
  render: () => React.ReactElement;
}

export interface IFoyerScreensProps {
  screens: IFoyerScreen[];
  resetTimeout?: number;
}

export const FoyerScreens: React.FC<IFoyerScreensProps> = ({
  screens,
  resetTimeout = 5 * 60 * 1000,
}) => {
  const [index, setIndex] = useState<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const views: React.ReactElement[] = useMemo(() => {
    return screens.map((screen, i) => <div key={i}>{screen.render()}</div>);
  }, []);

  const icons = useMemo(() => {
    return screens.map((screen) => screen.icon);
  }, []);

  const onInteraction = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    startTimeout();
  }, []);

  // reset on any movement
  document.addEventListener("mousedown", onInteraction);
  document.addEventListener("touchstart", onInteraction);
  document.addEventListener("touchmove", onInteraction);

  const startTimeout = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex(0);
    }, resetTimeout);
  }, []);

  useEffect(() => {
    startTimeout();
  }, []);

  return (
    <div className={css("")}>
      <ToggleViews
        views={views}
        activeIndex={index}
        transition={defaultTransition}
      />
      <div className={css("toggles")}>
        {icons.map((name, i) => (
          <span key={name}>
            <CircularIcon
              size={EStandardSizes.Large}
              name={name}
              isActive={i === index}
              onClick={() => setIndex(i)}
            />
          </span>
        ))}
      </div>
    </div>
  );
};
