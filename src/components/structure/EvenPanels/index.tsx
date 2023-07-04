import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "evenPanels");

export interface IPanelProps {
  fixedHeight?: boolean;
  children: any;
}

export const EvenPanels: React.FC<IPanelProps> = ({
  fixedHeight = false,
  children,
}) => {
  return (
    <div className={css("", { "-fixedHeight": fixedHeight })}>{children}</div>
  );
};

export const Panel: React.FC = ({ children }) => {
  return <div className={css("panel")}>{children}</div>;
};
