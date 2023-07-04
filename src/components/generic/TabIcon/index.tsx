import * as React from "react";

import CircularIcon from "../CircularIcon";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { Badge } from "../Badge";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "TabIcon");

interface ITabIconProps {
  isSelected?: boolean;
  icon: string;
  label: string;
  disabled?: boolean;
  badge?: string | number;
  badgeVariant?: TColorVariants;
}

export const TabIcon: React.FC<ITabIconProps> = ({
  isSelected = false,
  icon,
  label,
  disabled = false,
  badge = 0,
  badgeVariant = TColorVariants.Danger,
}) => {
  return (
    <div
      className={css(
        "",
        { "-selected": isSelected },
        { "-disabled": disabled },
      )}
    >
      <CircularIcon
        name={icon}
        size={EStandardSizes.Small}
        variant={isSelected ? TColorVariants.Success : TColorVariants.Primary}
      />
      {badge != 0 && (
        <div className={css("badge")}>
          <Badge size="sm" variant={badgeVariant}>
            {badge}
          </Badge>
        </div>
      )}
      {label}
    </div>
  );
};
