import * as React from "react";
import { useContext } from "react";

import { CollapsibleContext } from "../../../../../contexts/CollapsibleContext";
import { Collapse } from "../../../../generic/Collapse";

import styles from "../../styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "baseSection");

export interface IBodyProps {
  children: any;
  className?: string;
  noPadding?: boolean;
}

/**
 * Renders the body of a block content.
 */
export const Body: React.FC<IBodyProps> = ({
  children,
  className = "",
  noPadding = false,
}) => {
  const { isCollapsed } = useContext(CollapsibleContext);

  const inner = (
    <div data-test="body-inner" className={css("body_inner")}>
      {children}
    </div>
  );

  return (
    <div
      data-test="body"
      className={css("body", { "-noPadding": noPadding }, { className })}
    >
      {isCollapsed === undefined ? (
        inner
      ) : (
        <Collapse isOpened={!isCollapsed}>{inner}</Collapse>
      )}
    </div>
  );
};
