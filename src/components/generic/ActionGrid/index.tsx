import * as React from "react";

import ContentGrid from "../../structure/ContentGrid";
import CircularIcon from "../CircularIcon";
import { Button } from "../Button";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles);

export interface IAction {
  icon?: string;
  btnText?: string;
  onClick?: () => any;
  disabled?: boolean;
}

export interface IActionGridProps {
  gridSize: number;
  actions: IAction[];
}

export const ActionGrid: React.FC<IActionGridProps> = ({
  gridSize,
  actions,
}) => (
  <div className={css("actionGrid")}>
    {/* add grid to put action buttons */}
    <ContentGrid columns={gridSize}>
      {/* create button for each action in definition */}
      {actions.map((action: IAction, index: number) => (
        // ensure content will take up entire space
        <div style={{ width: "100%" }} key={index}>
          {/* only create button if the following properties are given. otherwise we create a space */}
          {action.icon && action.btnText && action.onClick && (
            <span className={css("actionGrid_container")}>
              {/* icon */}
              <CircularIcon
                className={css("actionGrid_icon")}
                name={action.icon}
              />
              {/* action button */}
              <Button
                className={css("actionGrid_button")}
                disabled={action.disabled}
                onClick={action.onClick}
              >
                {action.btnText}
              </Button>
            </span>
          )}
        </div>
      ))}
    </ContentGrid>
  </div>
);
