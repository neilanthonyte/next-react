import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { ICssTransition } from "../../../helpers/cssTransitions";
import { AnimatedLogo } from "../../branding/AnimatedLogo";
import { StaticLogo } from "../../branding/StaticLogo";
import { FoyerModesContext } from "../FoyerModesContext";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
const css = cssComposer(styles, "FoyerLogoView");

export const foyerLogoTransition: ICssTransition = {
  appear: styles.foyerLogoEnter,
  appearActive: styles.foyerLogoEnterActive,
  enter: styles.foyerLogoEnter,
  enterActive: styles.foyerLogoEnterActive,
  exit: styles.foyerLogoExit,
  exitActive: styles.foyerLogoExitActive,
};

export interface IFoyerLogoViewProps {
  _demo?: boolean;
}

export const FoyerLogoView: React.FC<IFoyerLogoViewProps> = ({
  _demo = false,
}) => {
  const { activeMode } = useRequiredContext(FoyerModesContext);

  if (!activeMode) {
    return null;
  }

  return (
    <div className={css("", { "-demo": _demo })}>
      <TransitionGroup>
        {activeMode.logoType && (
          <CSSTransition
            classNames={foyerLogoTransition}
            timeout={4000}
            key={"logo"}
          >
            <div className={css("content")}>
              {activeMode.logoType === "animated" ? (
                <AnimatedLogo />
              ) : (
                <StaticLogo colorScheme={activeMode.logoType} />
              )}
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};
