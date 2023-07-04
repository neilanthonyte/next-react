import * as React from "react";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "detailsPanel");

type IBackgroundStates = "current" | "other" | "ready" | "none";

export interface IDetailsPanelProps {
  /** Child components. */
  children: React.ReactElement<any> | React.ReactElement<any>[];
  /** State color background */
  state?: IBackgroundStates;
}

/**
 * Component view with stacked elements with the idea of having a body that grows to fill the height.
 */
export const DetailsPanel: React.FC<IDetailsPanelProps> = ({
  children,
  state = "none",
}) => (
  <div
    className={css("", {
      [`-${state}`]: !!state,
    })}
  >
    <div className={css("background")} />
    {children}
  </div>
);

export interface IDetailsPanelHeaderProps {
  /** Child components. */
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

export const DetailsPanelHeader: React.FC<IDetailsPanelHeaderProps> = ({
  children,
}) => <div className={css("header")}>{children}</div>;

export interface IDetailsPanelBodyProps {
  /** Child components. */
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

export const DetailsPanelBody: React.FC<IDetailsPanelBodyProps> = ({
  children,
}) => <div className={css("body")}>{children}</div>;

export interface IDetailsPanelFooterProps {
  /** Child components. */
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

export const DetailsPanelFooter: React.FC<IDetailsPanelFooterProps> = ({
  children,
}) => <div className={css("footer")}>{children}</div>;
