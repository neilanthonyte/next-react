import * as React from "react";
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "FilterBar");

export interface IFilterBarProps {}

export const FilterBar: React.FC<IFilterBarProps> = ({ children }) => {
  return <div className={styles.FilterBar}>{children}</div>;
};

export interface IFilterBarItemProps {
  label?: string;
  naturalWidth?: boolean;
}

export const FilterBarItem: React.FC<IFilterBarItemProps> = ({
  label,
  naturalWidth,
  children,
}) => {
  return (
    <div className={css("item", { "-natural": naturalWidth })}>{children}</div>
  );
};

export interface IFilterBarActionsProps {
  label?: string;
}

export const FilterBarActions: React.FC<IFilterBarActionsProps> = ({
  label,
  children,
}) => {
  return <div className={styles.FilterBar_actions}>{children}</div>;
};
