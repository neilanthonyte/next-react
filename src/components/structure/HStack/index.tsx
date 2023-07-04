import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
const css = cssComposer(styles, "HStack");

export interface IHStackProps {
  variant?: "medicare";
  children: React.ReactNode;
  size?: EStandardSizes;
  align?: "start" | "center";
}

export const HStack: React.FC<IHStackProps> = ({
  variant = "",
  size = EStandardSizes.Small,
  children,
  align,
}) => (
  <div className={css("", `-${variant}`, `-size-${size}`, `-align-${align}`)}>
    {children}
  </div>
);

export interface IHStackSolidProps {
  children: any;
}

export const Solid: React.FC<IHStackSolidProps> = ({ children }) => {
  return <div className={css("solid")}>{children}</div>;
};
