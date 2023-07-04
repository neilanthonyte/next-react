import * as React from "react";
import { useMemo } from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";

import { Icon } from "../../generic/Icon";
import { IPopoverProps, Popover } from "../../generic/Popover";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "OptionsPopover");

export interface IOptionsPopoverOption {
  label: string;
  icon?: string;
  iconColorVariant?: TColorVariants;
  onClick: (args: unknown) => unknown;
  isDisabled?: boolean;
}

export interface IOptionsPopoverSection {
  label?: string;
  isDisabled?: boolean;
  options: IOptionsPopoverOption[];
}

export interface IOptionsPopoverProps extends IPopoverProps {
  sections: IOptionsPopoverSection[];
}

/**
 * Custom popover component rendering list of clickable options with support for icon and sections
 */
export const OptionsPopover: React.FC<IOptionsPopoverProps> = ({
  sections,
  closeHandler,
  open,
  target,
  placement,
  showTip,
}) => {
  return (
    <span data-test="options-popover">
      <Popover
        target={target}
        open={open}
        closeHandler={closeHandler}
        placement={placement}
        showTip={showTip}
      >
        {sections.map((section, sectionIndex) => (
          <div
            className={css("section")}
            key={`section-${sectionIndex}`}
            data-test="section"
          >
            {!!section.label && (
              <div className={css("section_label")}>{section.label}</div>
            )}
            {(section.options || []).map((option, optionIndex) => (
              <Option
                key={`option-${optionIndex}`}
                option={option}
                isSectionDisabled={section.isDisabled}
              />
            ))}
          </div>
        ))}
      </Popover>
    </span>
  );
};

interface IOptionProps {
  option: IOptionsPopoverOption;
  isSectionDisabled: boolean;
}
/**
 * Renders a single option
 */
const Option: React.FC<IOptionProps> = ({ option, isSectionDisabled }) => {
  const isDisabled = isSectionDisabled || option.isDisabled;

  const variant = useMemo(() => {
    if (isDisabled) return TColorVariants.Disabled;
    return option.iconColorVariant || TColorVariants.Primary;
  }, [isDisabled, option]);

  return (
    <div
      onClick={!isDisabled ? option.onClick : undefined}
      className={css("option", {
        "-disabled": isDisabled,
      })}
      data-test="option"
    >
      <Icon
        className={css("option_icon")}
        name={option.icon}
        variant={variant}
      />
      <span className={css("option_label")}>{option.label}</span>
    </div>
  );
};
