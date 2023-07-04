import * as React from "react";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "Well");

export interface IWellProps {}

/**
 * A simple visual element to place content into.
 * Helps with dividing sections and contain content options like filters or actions.
 */
export const Well: React.FC<IWellProps> = ({ children }) => (
  <div className={css("")} data-test="well">
    {children}
  </div>
);

export interface IWellOptionsProps {}

/**
 * Styled container for a Well options section
 */
export const WellOptions: React.FC<IWellOptionsProps> = ({ children }) => (
  <div className={css("options")} data-test="well-options">
    {children}
  </div>
);

export interface IWellContentProps {}

/**
 * Styled container for the main content of the Well
 */
export const WellContent: React.FC<IWellContentProps> = ({ children }) => (
  <div className={css("content")} data-test="well-content">
    {children}
  </div>
);
