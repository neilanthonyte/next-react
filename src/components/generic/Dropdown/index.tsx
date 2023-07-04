import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import { Icon } from "../Icon";
import { Popover, TPopoverPosition } from "../Popover";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Dropdown");

export interface IDropdownProps {
  /** List of dropdown options. */
  options: string[];
  /** Currently selected option. */
  selectedOption?: string;
  /** Callback called when an option is clicked. */
  onOptionChange: (option: string) => void;
  /** Label of the button toggling the dropdown (if provided).
   * Otherwise, label will be the currently selected option
   */
  staticLabel?: string;
  /** Boolean designating if dropdown should be in 'active' state */
  active?: boolean;
  /** Desired position of popover (if space is available). */
  position?: TPopoverPosition;
  /** Standard sizing */
  stdSize?: EStandardSizes;
  /** Width (in chars) of the dropdown button */
  widthInChars?: number;
  /** Automatically size dropdown button to size of the largest option given */
  autoWidth?: boolean;
}

export const Dropdown: React.FC<IDropdownProps> = ({
  options,
  selectedOption,
  onOptionChange,
  staticLabel,
  active,
  position,
  stdSize,
  widthInChars,
  autoWidth,
}) => {
  // 'widthInChars' and 'autoWidth' both relate to how to size the dropdown
  // button.
  // for this reason, they cannot both be given.
  if (widthInChars && autoWidth) {
    throw new Error(
      "Cannot give props 'widthInChars' and 'autoWidth' to Dropdown simultaneously.",
    );
  }

  const [open, setOpen] = useState(false);

  const openDropdown = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    setOpen(false);
  }, []);

  const pickOption = useCallback(
    (option: string) => {
      onOptionChange(option);
      closeDropdown();
    },
    [closeDropdown, onOptionChange],
  );

  // if neither autoWidth or widthInChars is given, return null.
  // add a small buffer to given size value.
  const buttonWidthStyle = useMemo(() => {
    // return null if no width props given.
    if (!(autoWidth || widthInChars)) {
      return null;
    }

    // compute length (in chars) of largest label.
    const charWidth = autoWidth
      ? Math.max(...options.map((o) => o.length))
      : widthInChars;

    // em units seem to map better to half of the char length.
    const emWidth = Math.floor(charWidth / 2);

    // return the style object
    return {
      width: `${emWidth + 2}em`, // add a small buffer for space
    };
  }, [autoWidth, widthInChars]);

  const button = useMemo(
    () => (
      <div
        className={css("button", `-stdSize-${stdSize}`, {
          "-open": open,
          "-active": active,
        })}
        onClick={openDropdown}
        data-test="dropdown-button"
      >
        <span
          // if component was manually sized, ensure label is truncated if it
          // is too large.
          className={css("button_label", { "-truncate": !!widthInChars })}
          style={buttonWidthStyle}
        >
          {staticLabel || selectedOption}
        </span>
        <Icon
          name={`caret-${open ? "up" : "down"}`}
          className={css("button_caret", {
            "-open": open,
            "-active": active,
          })}
        />
      </div>
    ),
    [
      staticLabel,
      selectedOption,
      openDropdown,
      open,
      widthInChars,
      buttonWidthStyle,
    ],
  );

  return (
    <Popover
      open={open}
      closeHandler={closeDropdown}
      target={button}
      placement={{ position }}
    >
      <div className={css("options")}>
        {options.map((option) => (
          <div
            key={option}
            onClick={() => pickOption(option)}
            className={css("option", {
              "-selected": option === selectedOption,
            })}
            data-test="dropdown-option"
          >
            {option}
            {option === selectedOption && (
              <Icon name="tick" className={css("option_tick")} />
            )}
          </div>
        ))}
      </div>
    </Popover>
  );
};
