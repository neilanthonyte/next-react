import * as React from "react";

import { OptionsInput } from "../../inputs/OptionsInput";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
const css = cssComposer(styles, "PagerFrame");

export interface IPagerProps {
  pageCount: number;
  onChange: (index: number) => unknown;
  index: number;
  maxItems?: number;
  size?: EStandardSizes;
}

export const Pager: React.FC<IPagerProps> = ({
  pageCount,
  onChange,
  index = 0,
  maxItems = 10,
  size = EStandardSizes.ExtraSmall,
}) => {
  const padding = maxItems / 2;
  const min = Math.max(0, index - padding);
  const max = Math.min(min + maxItems, pageCount);

  // we add an extra 1 to offset 0 index at start of array
  const pages = Array(pageCount)
    .fill(0)
    .map((_, n) => ({ label: `${n + 1}`, value: n }))
    .filter(
      (item) =>
        item.value === 0 ||
        item.value === pageCount - 1 ||
        (item.value >= min && item.value <= max),
    );

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <OptionsInput
        variant="dots"
        options={pages}
        onInputChange={(value) => {
          onChange(value);
        }}
        value={index}
        size={size}
      />
    </div>
  );
};

export interface IPagerFrameProps {}

export const PagerFrame: React.FC<IPagerFrameProps> = ({ children }) => {
  const count = React.Children.toArray(children).length;
  return <div className={css("", { "-hasFooter": count > 1 })}>{children}</div>;
};

export interface IPagerFrameBodyProps {}

export const PagerFrameBody: React.FC<IPagerFrameBodyProps> = ({
  children,
}) => {
  return <div>{children}</div>;
};

export interface IPagerFrameFooterProps {}

export const PagerFrameFooter: React.FC<IPagerFrameFooterProps> = ({
  children,
}) => {
  return <div className={css("footer")}>{children}</div>;
};
