import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "imageTextPair");

export interface IImageTextPairProps {
  children: any;
}

export const ImageTextPair: React.FC<IImageTextPairProps> = ({ children }) => {
  return <div className={css("")}>{children}</div>;
};

export interface IImageProps {
  children: React.ReactElement<any>;
}

export const Image: React.FC<IImageProps> = ({ children }) => {
  return children;
};

export interface ITextProps {
  children: any;
}

export const Text: React.FC<ITextProps> = ({ children }) => {
  return <span data-test="text">{children}</span>;
};
