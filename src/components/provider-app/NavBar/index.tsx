import * as React from "react";
import { NavLink } from "react-router-dom";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { Icon } from "../../generic/Icon";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "NavBar");

interface INavBarItem {
  to: string;
  icon: string;
  label: string;
}
export interface INavBarProps {
  items: INavBarItem[];
}

export const NavBar: React.FC<INavBarProps> = ({ items }) => {
  return (
    <div className={css("")}>
      {(items || []).map((item) => {
        const props = item.to === "/" ? { exact: true } : {};
        return (
          <NavLink to={item.to} activeClassName={css("active")} {...props}>
            <Icon name={item.icon} size={EStandardSizes.ExtraSmall} />
            <label>{item.label}</label>
          </NavLink>
        );
      })}
    </div>
  );
};
