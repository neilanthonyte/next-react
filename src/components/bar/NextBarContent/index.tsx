import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "NextBarContent");

export const NextBarContent: React.FC = ({ children }) => (
  <div className={css("")}>{children}</div>
);

export const NextBarContentBody: React.FC = ({ children }) => {
  return (
    <div className={css("body")}>
      {React.Children.map(children, (child) =>
        child ? <div className={css("item")}>{child}</div> : null,
      )}
    </div>
  );
};

export const NextBarContentFooter: React.FC = ({ children }) => (
  <div className={css("footer")}>{children}</div>
);
