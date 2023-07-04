import * as React from "react";
import { HeroContent } from "../../structure/HeroContent";

import { Screen, IScreenProps, ScreenBody } from "../Screen";
import { AnimatedLogo } from "../../branding/AnimatedLogo";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "HoldingScreen");

export interface IHoldingScreenProps
  extends Pick<IScreenProps, Exclude<keyof IScreenProps, "children">> {}

/**
 * Provides a branded holding screen. It takes on the size of the parent element.
 */
export const HoldingScreen: React.FC<IHoldingScreenProps> = (props) => {
  return (
    <Screen {...props} decorationChildren={props.children}>
      <ScreenBody>
        <HeroContent>
          <div className={css("logoContainer")}>
            <AnimatedLogo loop={true} />
          </div>
        </HeroContent>
      </ScreenBody>
    </Screen>
  );
};

export default HoldingScreen; // TODO: remove me (some components still import me the legacy way)
