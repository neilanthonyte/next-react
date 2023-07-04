import * as React from "react";
import { Button, TButtonVariant } from "../../generic/Button";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "NextBarPanel");

export interface IBarAction {
  label: string;
  disabled: boolean;
  variant?: TButtonVariant;
  onClick: () => any;
}

export const NextBarPanelInfoPaneBody: React.FC = ({ children }) => (
  <div className={css("description")}>{children}</div>
);

export const NextBarPanelInfoPaneDecoration: React.FC = ({ children }) => (
  <div className={css("decoration")}>{children}</div>
);

export const NextBarPanelInfoPaneTitle: React.FC = ({ children }) => (
  <h3 className={css("title")}>{children}</h3>
);

export interface INextBarPanelInfoPaneProps {
  actions?: IBarAction[];
}

export const NextBarPanelInfoPane: React.FC<INextBarPanelInfoPaneProps> = ({
  children,
  actions,
}) => {
  return (
    <div className={css("info")}>
      {children}
      <div className={css("actions")}>
        {!!actions &&
          actions
            .filter((a: IBarAction) => !a.disabled)
            .map((a: IBarAction, i: number) => (
              <div className={css("action")} key={i}>
                <Button
                  isBlock={true}
                  size={EStandardSizes.Small}
                  onClick={() => a.onClick()}
                  variant={a.variant ? a.variant : "secondary"}
                >
                  {a.label}
                </Button>
              </div>
            ))}
      </div>
    </div>
  );
};

export const NextBarPanelContentPane: React.FC = ({ children }) => {
  return <div className={css("content")}>{children}</div>;
};

export const NextBarPanel: React.FC = ({ children }) => {
  return <div className={css("")}>{children}</div>;
};
