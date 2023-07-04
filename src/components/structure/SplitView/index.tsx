import * as React from "react";
import { useState, useEffect } from "react";

import { breakpoints } from "../../../helpers/screenBreakpoints";
import { THorizontalPositions } from "next-shared/src/types/layouts";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "SplitView");

/**
 * Component that renders a relational split content/details view
 */
export const SplitView: React.FC = ({ children }) => {
  return (
    <div className={css("")} data-test="split-view">
      {children}
    </div>
  );
};

interface IContentViewProps {
  /** alignment of content in view */
  alignment?: THorizontalPositions;
  children: any;
}

export const ContentView: React.FC<IContentViewProps> = ({
  alignment = THorizontalPositions.Left,
  children,
}) => {
  return (
    <div
      className={css("content", `-align-${alignment}`)}
      data-test="content-view"
      data-alignment={alignment}
    >
      {children}
    </div>
  );
};

export interface IDetailsViewProps {
  children: any;
  /** size of the side panel */
  size?: "xs" | "sm" | "md" | "lg";
  /** whether content stays fixed while scrolling */
  sticky?: boolean;
}

interface IStickyChildProps {
  style: any;
}

export const DetailsView: React.FC<IDetailsViewProps> = ({
  children,
  size = "md",
  sticky = true,
}) => {
  const [width, setWidth] = useState(window.innerWidth);

  // HACK - base on the size of the SplitView instead
  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  if (width < breakpoints.sm) {
    return children;
  }

  const classNames = css("details", `-size-${size}`, { "-isSticky": sticky });

  return (
    <div
      className={classNames}
      data-test="details-view"
      data-size={size}
      data-fixed="false"
    >
      {children}
    </div>
  );
};
