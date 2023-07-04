import * as React from "react";

import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "../../structure/Table";
import { Currency } from "../../generic/Currency";
import { AppointmentType } from "next-shared/src/models/AppointmentType";

export interface IAppointmentTypeTableProps {
  type: AppointmentType;
}

/**
 * Component displaying details of provided appointment type in a table format
 */
export const AppointmentTypeTable: React.FC<IAppointmentTypeTableProps> = ({
  type,
}) => {
  if (!type.price) {
    return null;
  }

  const hasDeposit = !!type.deposit && type.deposit !== type.price;
  const price = type.price;
  const gap = type.price - (type.rebate || 0);
  const hasGap = gap > 0;

  return (
    <Table type="pinStripe" preset="standard">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Type</TableHeaderCell>
          {hasGap && <TableHeaderCell>Gap</TableHeaderCell>}
          {hasDeposit && <TableHeaderCell>Deposit</TableHeaderCell>}
          <TableHeaderCell>Price</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{type.label}</TableCell>
          {hasGap && (
            <TableCell>
              <Currency>{gap}</Currency>
            </TableCell>
          )}
          {hasDeposit && (
            <TableCell>
              <Currency>{type.deposit}</Currency>
            </TableCell>
          )}
          <TableCell>
            <Currency>{price}</Currency>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
