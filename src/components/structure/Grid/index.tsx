import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "grid");

export type IGridSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface IGridProps {
  children: any;
  size?: IGridSize;
  fullHeight?: boolean;
}

export const Grid: React.FC<IGridProps> = ({
  size = "md",
  fullHeight = false,
  children,
}) => (
  <div className={css("", `-${size}`, { "-fullHeight": fullHeight })}>
    {children}
  </div>
);
