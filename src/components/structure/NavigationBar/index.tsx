import * as React from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { NavLink } from "react-router-dom";
import { Icon } from "../../generic/Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "NavigationBar");

export interface INavigationBarAction {
  icon: string;
  onClick: () => any;
}

export interface INavigationBarProps {
  trailingActions?: INavigationBarAction[];
  backPath?: string;
  backLabel?: string;
  backClick?: () => any;
  noBackChevron?: boolean;
  customBackComponent?: any;
}

export const NavigationBar: React.FC<INavigationBarProps> = ({
  trailingActions,
  backPath,
  backLabel = "Back",
  backClick,
  noBackChevron = false,
  customBackComponent,
  children,
}) => {
  const Back = () => (
    <div className={css("back")}>
      {customBackComponent ? (
        customBackComponent
      ) : (
        <>
          {!noBackChevron && (
            <Icon variant={TColorVariants.Secondary} name={"chevron-left"} />
          )}
          <label>{backLabel}</label>
        </>
      )}
    </div>
  );

  return (
    <div className={css("")}>
      <div>
        {backPath && (
          <NavLink to={backPath}>
            <Back />
          </NavLink>
        )}
        {backClick && (
          <a onClick={backClick}>
            <Back />
          </a>
        )}
      </div>
      <div className={css("title")}>{children}</div>
      <div>
        {Array.isArray(trailingActions) &&
          trailingActions.map((action) => (
            <Icon
              key={action.icon}
              onClick={action.onClick}
              name={action.icon}
            />
          ))}
      </div>
    </div>
  );
};
