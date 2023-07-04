import * as React from "react";
import { useMemo } from "react";

import { Icon } from "../Icon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Checkbox");

export enum ECheckboxStatus {
  Unchecked = "unchecked",
  Successful = "successful",
  Unsuccessful = "unsuccessful",
  Partial = "partial",
}

export enum ECheckboxSize {
  Medium = "medium",
}

export interface ICheckboxProps {
  status: ECheckboxStatus;
  onClick?: (args?: any) => void;
  uncheckedIcon?: string;
  standardSize?: EStandardSizes;
  customSize?: ECheckboxSize;
  disabled?: boolean;
}

/**
 * Component that renders icons in a circular button
 */
export const Checkbox: React.FC<ICheckboxProps> = ({
  status,
  onClick,
  uncheckedIcon = "",
  standardSize,
  customSize,
  disabled,
}) => {
  const iconName: string = useMemo(() => {
    switch (status) {
      case ECheckboxStatus.Successful:
        return "check";
      case ECheckboxStatus.Partial:
        return "minus";
      case ECheckboxStatus.Unsuccessful:
        return "close";
      case ECheckboxStatus.Unchecked:
      default:
        return uncheckedIcon || "check";
    }
  }, [status]);

  const colorVariant: TColorVariants = useMemo(() => {
    if (disabled) {
      return TColorVariants.Disabled;
    }
    switch (status) {
      case ECheckboxStatus.Successful:
        return TColorVariants.Success;
      case ECheckboxStatus.Unsuccessful:
        return TColorVariants.Error;
      default:
        break;
    }
  }, [status, disabled]);

  return (
    <span data-test="checkbox" data-test-status={status}>
      <Icon
        name={iconName}
        subtle={status === "unchecked"}
        className={css(
          "",
          // generally pretty big
          `-stdSize-${standardSize}`,
          // color variation based on status
          `-${colorVariant}`,
          // prioritise standard sizes
          `-customSize-${standardSize ? "" : customSize}`,
        )}
        onClick={disabled ? undefined : onClick}
      />
    </span>
  );
};
