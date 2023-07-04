import * as React from "react";
import { useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import * as _ from "lodash";

import { INavItem } from "./components/StackedNavItems";
import { StaticLogo } from "../../../../branding/StaticLogo";
import Practitioner from "./components/Practitioner";
import { StackedNavItems } from "./components/StackedNavItems";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
import {
  navTransition,
  defaultTransition,
} from "../../../../../helpers/cssTransitions";
const css = cssComposer(styles);

interface ISideNavProps {
  items: INavItem[];
  isFixed?: boolean;
  isDisabled?: boolean;
  practitioner?: object;
  supplement?: any;
  supplementProps?: object;
  isOpenOverride?: boolean;
  sizeOverride?: string;
  menu?: any;
  className?: string;
  logoFileType?: "svg" | "png";
  noLogos?: boolean;
}

/**
 * Side navigation, including links, branding and general details.
 */
export const SideNav: React.FC<ISideNavProps> = ({
  items,
  isFixed,
  isDisabled,
  practitioner,
  supplement: SupplementComponent,
  supplementProps,
  isOpenOverride,
  sizeOverride,
  menu = null,
  className = "",
  logoFileType = "svg",
  noLogos = false,
}: ISideNavProps) => {
  const location = useLocation();

  // Find the active nav item based on current URL
  const activeItem = _.last(
    items.filter((i) => location.pathname.includes(i.path)),
  );
  const Menu = menu || _.get(activeItem, "menu");
  const isMenuVisible = !_.isUndefined(isOpenOverride)
    ? isOpenOverride
    : !!Menu;

  const disabledContent = () => (
    <div className={css("sideNav_disabled")}>
      <StaticLogo
        variant="square"
        colorScheme="nav"
        className={css("sideNav_disabled_logo")}
      />
    </div>
  );

  const topNavItems: INavItem[] = items.map((item: any) => ({
    label: item.label,
    icon: item.icon,
    isActive: item === activeItem,
    // default to the first child route
    path: Array.isArray(item.routes)
      ? item.routes.find((i: any) => !!i.path).path.replace(/\/$/, "")
      : item.path,
  }));

  const enabledContent = () => (
    <div className={css("inner")}>
      {!noLogos && (
        <div className={css("sideNav_brand")}>
          <StaticLogo
            variant="landscape"
            colorScheme="nav"
            fileType={logoFileType}
          />
        </div>
      )}
      <StackedNavItems items={topNavItems} />
      {practitioner && <Practitioner {...practitioner} />}
    </div>
  );

  const navClassName = [
    css("sideNav", sizeOverride, {
      "-isDisabled": isDisabled,
      "-open": !isMenuVisible,
      "-hasSupplement": SupplementComponent,
      "-fixed": isFixed,
    }),
    className,
  ].join(" ");

  return (
    <div className={navClassName} data-test="side-nav">
      <TransitionGroup>
        <CSSTransition
          classNames={navTransition}
          timeout={500}
          key={activeItem ? activeItem.path : "_empty_"}
        >
          <div className={css("sideNav_menu")}>{Menu && <Menu />}</div>
        </CSSTransition>
      </TransitionGroup>
      <nav className={css("sideNav_nav")} data-test="side-nav">
        <TransitionGroup>
          <CSSTransition
            classNames={defaultTransition}
            timeout={500}
            key={isDisabled ? "disabled" : "enabled"}
          >
            {isDisabled ? disabledContent() : enabledContent()}
          </CSSTransition>
        </TransitionGroup>
      </nav>
      {SupplementComponent && (
        <div className={css("sideNav_supplement", { "-hide": isDisabled })}>
          <SupplementComponent {...supplementProps} />
        </div>
      )}
    </div>
  );
};
SideNav.displayName = "SideNav";
