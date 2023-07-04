import * as React from "react";

import { EColorScheme } from "next-shared/src/types/colorScheme";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import CircularIcon from "../CircularIcon";
import { Badge } from "../Badge";
import { Notifications } from "../Notifications";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
export const css = cssComposer(styles, "TabbedNav");

export interface ITabbedNavItem {
  label: string;
  icon: string;
  isDisabled?: boolean;
  badge?: string;
  badgeVariant?: TColorVariants;
  notifications?: number;
  contentComponent: React.FC;
}

export interface ITabbedNavProps {
  tabbedNavItems: ITabbedNavItem[];
  activeTabIndex: number;
  onTabClick: (tabIndex: number) => void;
  colorScheme?: EColorScheme;
}

/**
 * Component rendering group of tabs used for displaying different content
 * Supports notifications and badges and a light and dark color scheme
 */
export const TabbedNav: React.FC<ITabbedNavProps> = ({
  tabbedNavItems,
  activeTabIndex,
  onTabClick,
  colorScheme = EColorScheme.Light,
}) => {
  return (
    <div className={css("", `-scheme-${colorScheme}`)} data-test="tabbedNav">
      {tabbedNavItems.map((item, index) => (
        <div
          className={css("item", {
            "-active": activeTabIndex === index,
            "-disabled": item.isDisabled,
          })}
          key={`TabbedNavItem-${index}`}
          data-test={`tabbedNav-item-${index}`}
          onClick={item.isDisabled ? undefined : () => onTabClick(index)}
        >
          <TabbedNavItem
            colorScheme={colorScheme}
            item={item}
            isActive={activeTabIndex === index}
          />
        </div>
      ))}
    </div>
  );
};

interface ITabbedNavItemProps {
  item: ITabbedNavItem;
  colorScheme: EColorScheme;
  isActive: boolean;
}

/**
 * Single tab item
 */
const TabbedNavItem: React.FC<ITabbedNavItemProps> = ({
  item,
  isActive,
  colorScheme,
}) => {
  if (!!item.badge && !!item.notifications) {
    console.warn(
      "Only one of notifications OR badge supported as tab decoration at the moment.",
    );
    return null;
  }
  const isDarkScheme = colorScheme === EColorScheme.Dark;
  let variant = isDarkScheme ? TColorVariants.Primary : TColorVariants.None;

  if (isActive) {
    variant = isDarkScheme ? TColorVariants.Success : TColorVariants.Primary;
  }

  return (
    <>
      <div className={css("icon")}>
        <CircularIcon
          name={item.icon}
          size={EStandardSizes.Small}
          variant={variant}
        />
        {!!item.notifications && (
          <div className={css("notifications")} data-test="notifications">
            <Notifications amount={item.notifications} />
          </div>
        )}
        {!!item.badge && (
          <div className={css("badge")} data-test="badge">
            <Badge size="sm" variant={item.badgeVariant}>
              {item.badge}
            </Badge>
          </div>
        )}
      </div>
      {item.label}
    </>
  );
};
