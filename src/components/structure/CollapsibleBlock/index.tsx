import React, { useCallback, useEffect, useState } from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import {
  CollapsibleContext,
  ICollapsibleContext,
} from "../../../contexts/CollapsibleContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { Collapse } from "../../generic/Collapse";
import { Icon } from "../../generic/Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "CollapsibleBlock");

export interface ICollapsibleBlockProps {
  isOpen?: boolean;
  iCollapseDisabled?: boolean;
}

/**
 * Renders a collapsible content block
 */
export const CollapsibleBlock: React.FC<ICollapsibleBlockProps> = ({
  isOpen,
  iCollapseDisabled,
  children,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isOpen);

  // tie together
  useEffect(() => {
    setIsCollapsed(isOpen);
  }, [isOpen]);

  const onToggleCollapse = useCallback(() => {
    setIsCollapsed((s) => !s);
  }, []);

  const provider: ICollapsibleContext = {
    onToggleCollapse,
    isCollapsed,
    isDisabled: iCollapseDisabled,
  };

  return (
    <CollapsibleContext.Provider value={provider}>
      <div className={css("")} data-test="collapsible-block">
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
};

export interface ICollapsibleBlockHeaderProps {}

/**
 * Renders a collapsible content block header with collapse toggle
 */
export const CollapsibleBlockHeader: React.FC<ICollapsibleBlockHeaderProps> = ({
  children,
}) => {
  const { isCollapsed, onToggleCollapse, isDisabled } =
    useRequiredContext(CollapsibleContext);

  return (
    <div
      className={css("header", {
        "-isCollapsed": isCollapsed,
        "-isDisabled": isDisabled,
      })}
      onClick={isDisabled ? undefined : onToggleCollapse}
      data-test="collapsible-block-header"
    >
      <Icon
        className={css("header_chevron")}
        name="chevron-right"
        variant={TColorVariants.Active}
      />
      {children}
    </div>
  );
};

export interface ICollapsibleBlockBodyProps {
  size?: EStandardSizes;
}

/**
 * Renders a collapsible content block body
 */
export const CollapsibleBlockBody: React.FC<ICollapsibleBlockBodyProps> = ({
  children,
  size = EStandardSizes.Medium,
}) => {
  const { isCollapsed } = useRequiredContext(CollapsibleContext);

  return (
    <Collapse isOpened={isCollapsed} size={size}>
      <div className={css("body")} data-test="collapsible-block-header">
        {children}
      </div>
    </Collapse>
  );
};
