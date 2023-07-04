import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "ScrollableBar");

export interface IScrollableBarProps {
  /**
   * Describes the behaviour of the scrollbar in relation to the size of the
   * content.
   *  - Dynamic: Scrollbar will dynamically appear & disappear as needed. This
   * is the default.
   *  - Never: Never show the scrollbar, even when needed (content can still be
   * scrolled, but a scrollbar will not be visible to the user).
   *  - Always: Always show scrollbar regardless if needed.
   */
  showScrollbar?: "dynamic" | "never" | "always";
}

/**
 * A horizontally scrollable container element.
 */
export const ScrollableBar: React.FC<IScrollableBarProps> = ({
  children,
  showScrollbar = "dynamic",
}) => {
  return (
    <div
      className={css("", {
        "-dynamic": showScrollbar === "dynamic",
        "-never": showScrollbar === "never",
        "-always": showScrollbar === "always",
      })}
    >
      {children}
    </div>
  );
};
