import * as React from "react";
import * as _ from "lodash";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
const css = cssComposer(styles, "inlineOptions");

interface IInlineOptionsProps {
  children: React.ReactNode[];
  allowMultiple?: boolean;
  className?: string;
  size?: EStandardSizes;
}

export const InlineOptions: React.FC<IInlineOptionsProps> = ({
  children,
  className = "",
  size,
}) => (
  <div className={css("", `-stdSize-${size}`, { className })}>{children}</div>
);

export interface IOptionsProps {
  onClick?: any;
  selected?: boolean;
  disabled?: boolean;
  allowMultiple?: boolean;
  name?: string;
  width?: string;
}

export const Option: React.FC<IOptionsProps> = ({
  selected = false,
  disabled = false,
  children,
  onClick,
  width,
}) => {
  const name = _.uniqueId("_inlineInput");

  const divWidth = {
    width: width || null,
  };

  return (
    <div
      onClick={disabled ? undefined : onClick}
      id={name}
      style={width ? divWidth : null}
      className={css("option", {
        selected,
        disabled,
      })}
      data-test="option"
      data-test-selected={selected ? "true" : "false"}
    >
      <span>{children}</span>
    </div>
  );
};

interface ISingleInlineOptionsProps {
  options: string[];
  selected: string;
  onSelection: (selectedOption: string) => void;
  optionWidth?: string;
}

export const SingleInlineOptions: React.FC<ISingleInlineOptionsProps> = ({
  onSelection,
  options = [],
  selected = null,
  optionWidth,
}) => {
  return (
    <InlineOptions>
      {options.map((o) => (
        <Option
          width={optionWidth}
          key={o}
          selected={o === selected}
          onClick={() => onSelection(o)}
        >
          {o}
        </Option>
      ))}
    </InlineOptions>
  );
};

export const ViewToggle: React.FC<ISingleInlineOptionsProps> = ({
  onSelection,
  options = [],
  selected = null,
}) => {
  return (
    <InlineOptions className={css("-alt")}>
      {options.map((o) => (
        <Option
          width={"150px"}
          key={o}
          selected={o === selected}
          onClick={() => onSelection(o)}
        >
          {o}
        </Option>
      ))}
    </InlineOptions>
  );
};

interface IMultiInlineOptionsProps {
  options: string[];
  selected: string[];
  onSelection: (newSelectedValues: string[]) => void;
  disabled?: boolean;
  optionValue?: string;
  allowMultiple?: boolean;
}

export const MultiInlineOptions: React.FC<IMultiInlineOptionsProps> = ({
  onSelection,
  options = [],
  selected = [],
  disabled,
  allowMultiple = true,
}) => {
  return (
    <InlineOptions>
      {options.map((o) => (
        <Option
          key={o}
          selected={selected.indexOf(o) > -1}
          onClick={() => onSelection(_.xor(selected, [o]))}
          disabled={disabled}
          allowMultiple={allowMultiple}
        >
          {o}
        </Option>
      ))}
    </InlineOptions>
  );
};
