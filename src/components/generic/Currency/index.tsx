import * as React from "react";
import CurrencyFormat from "react-currency-format";

export interface ICurrencyProps {
  children: string | number;
  thousandSeparator?: boolean;
  prefix?: string;
}

export const Currency: React.FC<ICurrencyProps> = ({
  children,
  prefix = "$",
  thousandSeparator = false,
}) =>
  typeof children === "number" ? (
    <CurrencyFormat
      value={children}
      prefix={prefix}
      displayType={"text"}
      decimalScale={2}
      fixedDecimalScale={true}
      thousandSeparator={thousandSeparator || null}
    />
  ) : null;
