import * as React from "react";
import { useLocation } from "react-router-dom";

import { List, ListItem } from "../List";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "tableOfContents");

export interface ITableOfContentsProps {
  children: React.ReactNode;
}

/**
 * Renders a table of contents list to be used in the sidebar
 */
export const TableOfContents: React.FC<ITableOfContentsProps> = ({
  children,
}) => (
  <div data-test="table-of-contents">
    <List className={css("")} variant="separator" scale="compact">
      {children}
    </List>
  </div>
);

export interface ITableOfContentsItemProps {
  href: string;
  badge?: string;
  badgeMode?: string;
  isActive?: boolean;
  children: React.ReactNode;
}

export const TableOfContentsItem: React.FC<ITableOfContentsItemProps> = ({
  href,
  children,
  isActive,
  ...rest
}) => {
  // automatically highlight if it matches the current URL
  const location = useLocation();
  const active =
    isActive !== undefined
      ? isActive
      : `${location.pathname}` === href.replace(/\/$/, "");

  return (
    <ListItem className={css("item")} to={href} isActive={active} {...rest}>
      {children}
    </ListItem>
  );
};
