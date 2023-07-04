import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "picker");

export interface IPickerProps {
  children: any;
}

export const Picker: React.FC<IPickerProps> = ({ children }) => (
  <div className={css("")}>{children}</div>
);

export interface IPickerHeaderProps {
  children: any;
}

export const PickerHeader: React.FC<IPickerHeaderProps> = ({ children }) => (
  <div className={css("header")}>{children}</div>
);

export interface IPickerHeaderFilterProps {
  children: any;
}

export const PickerHeaderFilter: React.FC<IPickerHeaderFilterProps> = ({
  children,
}) => <div className={css("header_filter")}>{children}</div>;

export interface IPickerFooterProps {
  children: any;
}

export const PickerFooter: React.FC<IPickerFooterProps> = ({ children }) => (
  <div className={css("footer")}>{children}</div>
);

export interface IPickerBodyProps {
  children: any;
}

export const PickerBody: React.FC<IPickerBodyProps> = ({ children }) => (
  <div className={css("body")}>{children}</div>
);
