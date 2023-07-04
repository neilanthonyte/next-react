import * as React from "react";
import { useEffect, useState } from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { ITableAction, TableActions } from "../../atoms/TableActions";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../structure/Table";
import {
  Checkbox,
  ECheckboxSize,
  ECheckboxStatus,
} from "../../generic/Checkbox";
import { VStack } from "../../structure/VStack";
import { Pager } from "../../atoms/Pager";
import { Disable } from "../../generic/Disable";
import { PlaceholderView } from "../../views/PlaceholderView";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { groupBy } from "lodash";

export interface ITableColumn<RowData> {
  heading: string;
  /** Precentage width */
  width?: number;
  /** Stick to strings unless you need to do something fancy */
  renderCell: (
    row: RowData,
    isFooter?: boolean,
  ) => null | string | React.ReactElement;
}

export type ITableColumns<T> = ITableColumn<T>[];

export interface IRowStyle {
  variant?: TColorVariants;
  isDeleted?: boolean;
}

/** Requests the table show pagination */
export interface ITablePagination {
  pageIndex: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export interface IPrefabTableProps<RowData> {
  columns: ITableColumn<RowData>[];
  /** The data to display in the table */
  data: RowData[] | null | undefined;
  /** A special data item always shown at the bottom of the table - useful for totals */
  footerData?: RowData | null;
  /** Please pass an empty array to show there is no data. Other falsy values will be considered 'not yet loaded' */
  actions?: ITableAction<RowData>[];
  /** If the data is remotely fetched, this allows the table to be blocked */
  isLoading?: boolean;
  error?: Error | null;
  refetch?: () => unknown;
  /** Allows rows to be coloured */
  rowStyle?: (row: RowData) => IRowStyle | undefined;
  /** Callback for allowing row selection */
  onSelection?: (selected: RowData[]) => unknown;
  /** Shows details before the row, e.g. warning */
  renderPreRow?: (row: RowData) => string | React.ReactElement | null;
  /** Shows details after the row, e.g. row controls, sub-table */
  renderPostRow?: (row: RowData) => string | React.ReactElement | null;
  /** For showing pagination */
  pagination?: ITablePagination;
  /** Allow the table to be grouped */
  groupBy?: (item: RowData) => string;
}

export function PrefabTable<RowData>({
  columns,
  data,
  footerData,
  actions,
  isLoading,
  error,
  refetch,
  pagination,
  rowStyle,
  onSelection,
  renderPreRow,
  renderPostRow,
  groupBy: grouping,
}: IPrefabTableProps<RowData>): React.ReactElement {
  const [selected, setSelected] = useState<RowData[]>([]);

  useEffect(() => {
    onSelection && onSelection(selected);
  }, [selected]);

  const toggleSelection = (item: RowData) =>
    setSelected(
      selected.indexOf(item) === -1
        ? [...selected, item]
        : selected.filter((i) => i !== item),
    );

  const noData = !Array.isArray(data);
  const emptyArray = Array.isArray(data) && data.length === 0;

  const allSelected = !noData && selected.length === data.length;
  const someSelected = selected.length && !allSelected;
  const hasActions = !!actions && actions.length > 0;
  // whether to show a placeholder message whilst loading or when there's no data
  const showPlaceholder = (noData || emptyArray) && !error;
  const showPagination = !!pagination && !error;
  const columnCount =
    columns.length + (onSelection ? 1 : 0) + (hasActions ? 1 : 0);

  const blockTable = isLoading;

  const groupedData = groupBy(data, (item: RowData) => {
    return grouping?.(item) || "";
  });

  return (
    <Disable disabled={blockTable} showSpinner={noData}>
      <VStack>
        <Table type="pinStripe" sizing="compact" preset="standard">
          <TableHeader>
            <TableRow>
              {!!onSelection && (
                <TableHeaderCell width="2%">
                  <Checkbox
                    customSize={ECheckboxSize.Medium}
                    status={
                      allSelected
                        ? ECheckboxStatus.Successful
                        : someSelected
                        ? ECheckboxStatus.Partial
                        : ECheckboxStatus.Unchecked
                    }
                    onClick={() => setSelected(allSelected ? [] : data)}
                  />
                </TableHeaderCell>
              )}
              {(columns || []).map((col, i) => (
                <TableHeaderCell
                  width={col.width ? `${col.width}%` : null}
                  key={i}
                >
                  {col.heading}
                </TableHeaderCell>
              ))}
              {hasActions && <TableHeaderCell width="50px"></TableHeaderCell>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(groupedData).map((groupName) => {
              const rows = [];
              if (groupName) {
                rows.push(
                  <TableRow isGroup={true} key={groupName}>
                    <td colSpan={columnCount}>{groupName}</td>
                  </TableRow>,
                );
              }
              rows.push(
                (data || []).map((d, i) => {
                  const preRow = renderPreRow && renderPreRow(d);
                  const postRow = renderPostRow && renderPostRow(d);
                  const style: IRowStyle = rowStyle?.(d);

                  return [
                    preRow ? (
                      <TableRow
                        variant={style?.variant}
                        isDeleted={style?.isDeleted}
                        multiRow={true}
                        isOdd={i % 2 === 0}
                        key={`pre-${i}`}
                      >
                        <td colSpan={columnCount}>{preRow}</td>
                      </TableRow>
                    ) : null,
                    <TableRow
                      key={i}
                      variant={style?.variant}
                      isDeleted={style?.isDeleted}
                      multiRow={!!postRow}
                      isOdd={i % 2 === 0}
                    >
                      {!!onSelection && (
                        <TableCell>
                          <Checkbox
                            customSize={ECheckboxSize.Medium}
                            status={
                              selected.indexOf(d) === -1
                                ? ECheckboxStatus.Unchecked
                                : ECheckboxStatus.Successful
                            }
                            onClick={() => toggleSelection(d)}
                          />
                        </TableCell>
                      )}
                      {(columns || []).map((col, actionIndex) => (
                        <TableCell key={`action-${actionIndex}`}>
                          {col.renderCell(d, false)}
                        </TableCell>
                      ))}
                      {hasActions && (
                        <TableCell>
                          <TableActions data={d} actions={actions} />
                        </TableCell>
                      )}
                    </TableRow>,
                    postRow ? (
                      <TableRow
                        variant={style?.variant}
                        isDeleted={style?.isDeleted}
                        isOdd={i % 2 === 0}
                        key={`post-${i}`}
                      >
                        <td colSpan={columnCount}>{renderPostRow(d)}</td>
                      </TableRow>
                    ) : null,
                  ];
                }),
              );
              return rows;
            })}
            {!!footerData && (
              <TableRow isFooter={true}>
                {(columns || []).map((col, actionIndex) => (
                  <TableCell key={`action-${actionIndex}`}>
                    {col.renderCell(footerData, true)}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
        {showPlaceholder && (
          <PlaceholderView
            icon={null}
            instruction={noData ? "Loading data..." : "No data available"}
          />
        )}
        {!!error && <ErrorPlaceholder retry={refetch} />}
        {showPagination && (
          <Pager
            index={pagination.pageIndex}
            pageCount={pagination.pageCount}
            onChange={pagination.onPageChange}
          />
        )}
      </VStack>
    </Disable>
  );
}
