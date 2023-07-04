import * as React from "react";
import { useState, useEffect } from "react";

import { KeypadWrapper } from "../KeypadWrapper";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { Icon } from "../Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "SearchInput");

export interface ISearchInputProps {
  keypadOptions?: { label: string; value: string | number }[] | null;
  pattern?: string;
  stdSize?: EStandardSizes;
  onChange: (value: string) => any;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
}

/**
 * Search input component
 */
export const SearchInput: React.FC<ISearchInputProps> = ({
  value = "",
  placeholder = "",
  disabled = false,
  keypadOptions = null,
  stdSize = EStandardSizes.Small,
  pattern,
  onChange,
}) => {
  const [search, setSearch] = useState<string>(value);

  const clear = () => {
    setSearch("");
  };

  // report changes
  useEffect(() => {
    onChange(search);
  }, [search]);

  // respond to external changes
  useEffect(() => {
    setSearch(value);
  }, [value]);

  const input = (
    <div className={css("")}>
      <input
        type="search"
        data-test="search-input"
        className={css(`-stdSize-${stdSize}`)}
        onChange={(evt) => {
          let value = evt.target.value;
          if (pattern) {
            const match = value.match(new RegExp(pattern));
            value = match ? match[0] : "";
          }
          setSearch(value);
        }}
        value={search}
        placeholder={placeholder}
        disabled={disabled}
        data-input-type="singleLine"
      />
      {/* search icon */}
      <span className={css("icon")}>
        {search === "" ? (
          <Icon name="search" />
        ) : (
          <Icon name="error" onClick={clear} />
        )}
      </span>
    </div>
  );
  return keypadOptions ? (
    <KeypadWrapper inputComponent={input} keypadOptions={keypadOptions} />
  ) : (
    input
  );
};
