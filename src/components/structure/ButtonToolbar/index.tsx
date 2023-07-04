import * as React from "react";

import { IButtonProps } from "../../generic/Button";

// css
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "buttonToolbar");

export interface IButtonToolbarLeftProps {
  children:
    | React.ReactElement<IButtonProps>
    | React.ReactElement<IButtonProps>[];
}

/**
 * Button Toolbar Left
 */
export const ButtonToolbarLeft: React.FC<IButtonToolbarLeftProps> = ({
  children,
}) => <div className={css("left")}>{children}</div>;

export interface IButtonToolbarRightProps {
  children:
    | React.ReactElement<IButtonProps>
    | React.ReactElement<IButtonProps>[];
}

/**
 * Button Toolbar Right
 */
export const ButtonToolbarRight: React.FC<IButtonToolbarRightProps> = ({
  children,
}) => <div className={css("right")}>{children}</div>;

export interface IButtonToolbarProps {
  children:
    | React.ReactElement<
        IButtonProps | IButtonToolbarLeftProps | IButtonToolbarRightProps
      >
    | React.ReactElement<
        IButtonProps | IButtonToolbarLeftProps | IButtonToolbarRightProps
      >[];
}

/**
 * Button Toolbar
 */
export const ButtonToolbar: React.FC<IButtonToolbarProps> = ({ children }) => (
  <div className={css("")}>{children}</div>
);
