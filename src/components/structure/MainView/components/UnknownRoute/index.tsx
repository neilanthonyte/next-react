import { NavLink } from "react-router-dom";
import * as React from "react";

import { Dialog, DialogHeader } from "../../../Dialog";
import { TDialogSizes } from "next-shared/src/types/dialogs";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles);

export const UnknownRoute = () => (
  <div className={css("unknownRoute")}>
    <Dialog size={TDialogSizes.Small}>
      <DialogHeader>Unable to find content</DialogHeader>
      <p>
        <NavLink to={"/"}>Back to home</NavLink>
      </p>
    </Dialog>
  </div>
);
