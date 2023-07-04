import * as React from "react";
import { useContext } from "react";

import { Icon } from "../../../../generic/Icon";
import { CollapsibleContext } from "../../../../../contexts/CollapsibleContext";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "BaseTitle");

export interface ITitleProps {
  /** Children */
  children: any;
  /** The size of the Title */
  size?: 1 | 2 | 3 | 4 | 5 | 6;
  /** HACK - should not exist - move to styling */
  position?: "left" | "center" | "right";
  /** Shows decoration */
  decorated?: any;
  className?: string;
  collapseToggle?: boolean;
}

/**
 *  Renders basic Title component.
 *  This should never be used directly. Each higher level component should expose a
 *  ComponentHeader wrapper
 */
export const Title: React.FC<ITitleProps> = ({
  children,
  className = "",
  size = 2,
  position = "left",
  decorated = false,
  collapseToggle = true,
}) => {
  const { onToggleCollapse, isCollapsed } = useContext(CollapsibleContext);
  const isCollapsible: boolean =
    collapseToggle && typeof onToggleCollapse === "function";

  const H: React.FC<{}> = () => {
    switch (size) {
      case 1:
        return <h1>{children}</h1>;
      case 2:
        return <h2>{children}</h2>;
      case 3:
        return <h3>{children}</h3>;
      case 4:
        return <h4>{children}</h4>;
      case 5:
        return <h5>{children}</h5>;
      case 6:
        return <h6>{children}</h6>;
    }
  };
  return (
    <div
      data-test="title"
      className={css("", `-${position}`, {
        "-collapsible": isCollapsible,
        "-isCollapsed": isCollapsed,
        className,
      })}
      onClick={() => isCollapsible && onToggleCollapse()}
    >
      {isCollapsible && (
        <Icon className={css("chevron")} name="chevron-right" />
      )}
      <H>{children}</H>
      {decorated && <hr />}
    </div>
  );
};
