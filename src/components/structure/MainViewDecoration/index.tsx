import * as React from "react";

import { Icon } from "../../generic/Icon";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "mainViewDecoration");

export interface IMainViewDecorationAction {
  icon: string;
  onClick: () => void;
}

export interface IMainViewDecorationProps {
  title: string;
  description?: string;
  actions: IMainViewDecorationAction[];
  leftDecoration?: React.ReactNode;
  children?: any;
}

export const MainViewDecoration = ({
  title,
  description = null,
  actions,
  leftDecoration,
  children,
}: IMainViewDecorationProps) => {
  return (
    <div data-test="container" className={css("")}>
      {children && (
        <div data-test="content" className={css("content")}>
          {children}
        </div>
      )}
      <div className={css("inner")}>
        <div className={css("information")}>
          {leftDecoration && (
            <div
              data-test="avatar"
              className={css("information_leftDecoration")}
            >
              {leftDecoration}
            </div>
          )}
          <div>
            {title && <h3 data-test="title">{title}</h3>}
            {description && (
              <div data-test="description" className={css("description")}>
                {description}
              </div>
            )}
          </div>
        </div>
        {actions && (
          <div data-test="actions" className={css("actions")}>
            {actions.map((action, i) => (
              <span data-test={`action-${i}`} key={i}>
                <Icon
                  name={action.icon}
                  key={i}
                  size={EStandardSizes.Small}
                  onClick={action.onClick}
                />
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
