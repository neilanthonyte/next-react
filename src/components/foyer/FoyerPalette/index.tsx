import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "FoyerPalette");

export interface IFoyerPaletteProps {}

export const FoyerPalette: React.FC<IFoyerPaletteProps> = ({ children }) => {
  return (
    <div className={css("")}>
      {Array.isArray(children) &&
        children.map((child, index) => <span key={index}>{child}</span>)}
    </div>
  );
};
