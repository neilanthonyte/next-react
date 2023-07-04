import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import { EInputLayout } from "next-shared/src/types/layouts";

import { FiltersPopover } from "../FiltersPopover";
import { Tag } from "../../atoms/Tag";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Filter");

export enum EFilterType {
  Primary = "primary",
  Secondary = "secondary",
}

interface IRenderInputArgs<T> {
  value: T;
  onInputChange: (newVal: T) => void;
  startsOpen: boolean;
  layout?: EInputLayout;
}

export interface IFilterProps<T> {
  /** Render prop allowing to render any of the existing input components and providing required props to be passed through */
  renderInput: (args: IRenderInputArgs<T>) => React.ReactElement;
  /** Detemines whether the filter will be visible or hidden based on its value beeing set */
  type: EFilterType;
  /** The label beeing shown in the filter tag */
  label: string;
  /** The value to be passed through to the input */
  value: T;
  /** Callback to be passed through to the input */
  onChange: (newVal: T) => void;
  /** Callback handling the clearing of the filter value */
  onClear: () => unknown;
  /** Whether to close the filter popup with the input on change or keep it open */
  closePopoverOnChange?: ((args: T) => boolean) | boolean;
  /** Internal prop used to indicate whether the filter should be rendered as tag or as input */
  renderAsTag?: boolean;
}

/**
 * Renders a filter tag
 * If type is secondary and a value is not set, it does not render
 */
export function Filter<T>({
  type,
  value,
  onChange,
  onClear,
  label,
  renderInput,
  closePopoverOnChange = true,
  renderAsTag = true,
}: IFilterProps<T>): React.ReactElement {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const hidden = !value && type === EFilterType.Secondary;

  const handleOnInputChange = useCallback(
    (newVal: T) => {
      onChange(newVal);
      if (
        !closePopoverOnChange ||
        (typeof closePopoverOnChange === "function" &&
          !closePopoverOnChange(newVal))
      )
        return;
      setPopoverOpen(false);
    },
    [onChange, closePopoverOnChange],
  );

  const handleOnClearFilter = useCallback(() => {
    if (!value) return;
    onClear();
    setPopoverOpen(false);
  }, [onClear]);

  const tag = useMemo(() => {
    if (hidden) {
      return null;
    }
    return (
      <div data-test="tag" className={css("tag-container")}>
        <Tag
          onClear={handleOnClearFilter}
          isClearable={!!value}
          onClick={() => setPopoverOpen(true)}
          showCollapsibleDecoration={true}
        >
          {label}
        </Tag>
      </div>
    );
  }, [hidden, label, value, handleOnClearFilter]);

  if (!renderAsTag) {
    return renderInput({
      value,
      onInputChange: handleOnInputChange,
      startsOpen: renderAsTag,
      layout: EInputLayout.Standard,
    });
  }

  return hidden ? null : (
    <FiltersPopover
      open={popoverOpen}
      closeHandler={() => setPopoverOpen(false)}
      target={tag}
      data-test="popover"
    >
      <div className={css("popover-input")} data-test="inputs">
        {renderInput({
          value,
          onInputChange: handleOnInputChange,
          startsOpen: renderAsTag,
        })}
      </div>
    </FiltersPopover>
  );
}
