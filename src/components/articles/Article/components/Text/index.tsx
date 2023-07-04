import * as React from "react";

import { RawHTML } from "../RawHTML";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "Text");

export interface ITextProps {
  content?: string;
}

export const Text: React.FC<ITextProps> = ({ content }) => (
  <div className={css("")}>
    <RawHTML html={content} />
  </div>
);
