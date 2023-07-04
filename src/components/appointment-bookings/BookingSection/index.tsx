import * as React from "react";

import { DialogFooter } from "../../structure/Dialog";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "BookingSection");

export const BookingSection: React.FC = ({ children }) => <div>{children}</div>;

export const BookingSectionFooter = DialogFooter;
BookingSectionFooter.displayName = "BookingSectionFooter";

export const BookingSectionTitle: React.FC = ({ children }) => {
  return <h4 className={css("heading")}>{children}</h4>;
};
