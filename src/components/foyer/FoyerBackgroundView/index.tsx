import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { ICssTransition } from "../../../helpers/cssTransitions";
import { ImgBlock } from "../../generic/ImgBlock";
import { FoyerModesContext } from "../FoyerModesContext";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
const css = cssComposer(styles, "FoyerBackgroundView");

export const foyerImageTransition: ICssTransition = {
  appear: styles.foyerImageEnter,
  appearActive: styles.foyerImageEnterActive,
  enter: styles.foyerImageEnter,
  enterActive: styles.foyerImageEnterActive,
  exit: styles.foyerImageExit,
  exitActive: styles.foyerImageExitActive,
};

export interface IFoyerBackgroundViewProps {
  _demo?: boolean;
}

export const FoyerBackgroundView: React.FC<IFoyerBackgroundViewProps> = ({
  _demo = false,
}) => {
  const { activeMode, count } = useRequiredContext(FoyerModesContext);
  let backgroundColor = "initial";

  if (!activeMode) {
    return null;
  }

  if (activeMode.backgroundColor) {
    backgroundColor = `rgb(${activeMode.backgroundColor.join(",")})`;
  }

  return (
    <div className={css("", { "-demo": _demo })}>
      <TransitionGroup>
        <CSSTransition
          className={css("content")}
          classNames={foyerImageTransition}
          timeout={3500}
          key={count}
        >
          <div style={{ backgroundColor }}>
            {activeMode.backgroundImageUrl && (
              <ImgBlock src={activeMode.backgroundImageUrl} variant={"cover"} />
            )}
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};
