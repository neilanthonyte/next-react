import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "AppScreen");

export interface IAppScreenProps {}

export const AppScreen: React.FC<IAppScreenProps> = ({ children }) => {
  return <div className={css("")}>{children}</div>;
};

export interface IAppScreenHeaderProps {}

export const AppScreenHeader: React.FC<IAppScreenHeaderProps> = ({
  children,
}) => {
  return <div className={css("header")}>{children}</div>;
};

export interface IAppScreenBodyProps {
  muted?: boolean;
}

export const AppScreenBody: React.FC<IAppScreenBodyProps> = ({
  children,
  muted = false,
}) => {
  return <div className={css("body", { "-muted": muted })}>{children}</div>;
};

export interface IAppScreenFooterProps {}

export const AppScreenFooter: React.FC<IAppScreenFooterProps> = ({
  children,
}) => {
  return <div className={css("footer")}>{children}</div>;
};
