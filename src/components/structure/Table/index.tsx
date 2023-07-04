import * as React from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { TStates } from "next-shared/src/types/states";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Table");

export type TTablePresets =
  | "standard"
  | "finance"
  | "scopes"
  | "allRight"
  | "centred";

export interface ITableProps {
  children: React.ReactElement<any> | React.ReactElement<any>[];
  type?: "pinStripe" | "candyCane" | "block" | "colored";
  alignment?: THorizontalPositions;
  sizing?: "compact"; // compact will make the table rows thiner
  preset?: TTablePresets;
  className?: string;
}

export const Table: React.FC<ITableProps> = ({
  children,
  type = "",
  alignment = "",
  sizing = "",
  preset = "",
  className = "",
}) => (
  <table
    className={css(
      "",
      `-${type}`,
      `-${sizing}`,
      `-${alignment}`,
      `-preset-${preset}`,
      { className },
    )}
  >
    {children}
  </table>
);

export interface ITableHeaderProps {
  children: React.ReactElement<any>;
}

export const TableHeader: React.FC<ITableHeaderProps> = ({ children }) => (
  <thead>{children}</thead>
);

export interface ITableBodyProps {
  // HACK doesn't like .map
  children?: any; // | React.ReactElement | React.ReactElement<any>[] | Element | Element[];
}

export const TableBody: React.FC<ITableBodyProps> = ({ children }) => (
  <tbody>{children}</tbody>
);

export interface ITableFooterProps {
  children: React.ReactElement<any>;
}

export const TableFooter: React.FC<ITableFooterProps> = ({ children }) => (
  <tfoot>{children}</tfoot>
);

export interface ITableRowProps {
  children: any | any[];
  urgent?: boolean;
  id?: string | number;
  variant?: TColorVariants;
  /** Explicit styling override for row colours */
  isOdd?: boolean;
  /** States this row is part of another */
  multiRow?: boolean;
  isDeleted?: boolean;
  /** Show at the bottom with special styling */
  isFooter?: boolean;
  /** Show above rows with special styling */
  isGroup?: boolean;
  style?: React.CSSProperties;
}

export const TableRow: React.FC<ITableRowProps> = ({
  children,
  variant = TColorVariants.None,
  urgent = false,
  id = "",
  isOdd,
  multiRow,
  isDeleted,
  isFooter,
  isGroup,
  style,
}) => {
  const override = isOdd !== undefined ? (isOdd ? "odd" : "even") : "";
  return (
    <tr
      className={css(`-${variant}`, `-override-${override}`, {
        "-urgent": urgent,
        "-multiRow": multiRow,
        "-isDeleted": isDeleted,
        "-isFooter": isFooter,
        "-isGroup": isGroup,
      })}
      data-test={id}
      style={style}
    >
      {children}
    </tr>
  );
};

export interface ITableHeaderCellProps {
  colSpan?: number;
  position?: THorizontalPositions;
  width?: string;
  children?: any | any[];
}

export const TableHeaderCell: React.FC<ITableHeaderCellProps> = ({
  colSpan = 1,
  position,
  width,
  children,
}) => {
  const styleWidth = {
    minWidth: width,
  };
  return (
    <th colSpan={colSpan} style={styleWidth} className={css(`-${position}`)}>
      {children}
    </th>
  );
};

export interface ITableCellProps {
  children?: any | React.ReactElement<any>;
  colSpan?: number;
  position?: THorizontalPositions;
  state?: TStates;
  urgent?: boolean;
  id?: string | number;
  classes?: string; // any additional classes you need for this cell (ex. cell with a button)
  className?: string;
}

export const TableCell: React.FC<ITableCellProps> = ({
  children,
  colSpan = 1,
  position,
  state = TStates.None,
  id = "",
  urgent = false,
  classes = "",
  className = "",
}) => (
  <td
    colSpan={colSpan}
    className={css({
      [`-${state}`]: true,
      [`-${position}`]: true,
      [`-${classes}`]: true,
      className,
    })}
    data-test={id}
  >
    {urgent && <div className={css("-urgent")} />}
    {children}
  </td>
);
