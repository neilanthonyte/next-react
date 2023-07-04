import * as React from "react";
import { NavLink } from "react-router-dom";

import CircularIcon from "../../../../../../generic/CircularIcon";

import styles from "../../styles.scss";
import { cssComposer } from "../../../../../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface INavItem {
  icon: string;
  path: string;
  label: string;
  isActive?: boolean;
}

interface IStackedNavItemsProps {
  items: INavItem[];
}

export const StackedNavItems: React.FC<IStackedNavItemsProps> = ({ items }) => {
  return (
    <ul className={css("stackedSiteItems")} data-test="siteNav">
      {(items || []).map((item, i) => {
        const { icon, path, label } = item;
        const isActive = item.isActive;

        return (
          <li key={i}>
            <NavLink
              to={path}
              className={css("sideNavRow")}
              activeClassName={css({ "-active": isActive })}
              data-test={path}
            >
              <div className={css("sideNavRow_lead")}>
                <CircularIcon name={icon} isActive={isActive} />
              </div>
              {label}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
};
