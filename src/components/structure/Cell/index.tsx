import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { Icon } from "../../generic/Icon";
import { Img } from "../../generic/Img";
import { truncateText } from "../../../helpers/truncateText";
import { Currency } from "../../generic/Currency";
import { Button, TButtonVariant } from "../../generic/Button";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "cell");

export interface ICellAction {
  icon?: string;
  label?: string;
  onClick?: (args: unknown) => unknown;
  size?: EStandardSizes;
  variant?: TButtonVariant;
}

export interface ICellProps {
  image?: string;
  decorationIcon?: string;
  decorationImage?: string;
  /**
   * changes the size of the decoration icon and image dependent on intent
   */
  isLead?: boolean;
  /** Cell's styling class */
  className?: string;
  /** Displays the goal icon */
  hasGoal?: boolean;
  children: any;
  actions?: ICellAction[];
  onClick?: (args?: any) => any;
}

/**
 * Renders a block of content within a card.
 */
export const Cell: React.FC<ICellProps> = ({
  decorationIcon,
  decorationImage,
  isLead,
  children,
  hasGoal = false,
  className = "",
  actions,
  onClick = null,
}) => {
  const hasDecoration: boolean = !!(decorationIcon || decorationImage);
  return (
    <div
      className={css("", { "-isLead": isLead, className })}
      data-test="cell"
      onClick={onClick}
    >
      {decorationIcon && (
        <CellDecorationIcon
          isLead={isLead}
          name={decorationIcon}
          hasGoal={hasGoal}
        />
      )}
      {decorationImage && (
        <CellDecorationImage isLead={isLead} url={decorationImage} />
      )}
      <CellBody indent={hasDecoration}>{children}</CellBody>
      {actions && <CellActions actions={actions} />}
    </div>
  );
};

interface ICellDecorationIconProps {
  name: string;
  isLead?: boolean;
  hasGoal?: boolean;
}

const CellDecorationIcon: React.FC<ICellDecorationIconProps> = ({
  name,
  isLead,
  hasGoal,
}) => (
  <div className={css("decoration")} data-test="cell-decoration-icon">
    <Icon
      name={name}
      className={css("decoration_icon", {
        "-isLead": isLead,
      })}
    />
    {hasGoal ? <Icon name="goal" className={css("goal")} /> : null}
  </div>
);

interface ICellDecorationImageProps {
  url: string;
  isLead?: boolean;
  hasGoal?: boolean;
}

const CellDecorationImage: React.FC<ICellDecorationImageProps> = ({
  url,
  isLead,
}) => (
  <div className={css("decoration")} data-test="cell-decoration-image">
    <Img
      src={url}
      className={css("decoration_img", {
        "-isLead": isLead,
      })}
    />
  </div>
);

export interface ICellBodyProps {
  indent?: boolean;
  children: any;
}

export const CellBody: React.FC<ICellBodyProps> = ({
  indent = false,
  children,
}) => (
  <div className={css("body", { "-indent": indent })} data-test="content">
    {children}
  </div>
);

export interface ICellHeader {
  children: string | string[];
}

export const CellHeader: React.FC<ICellHeader> = ({ children }) => (
  <h4 className={css("header")} data-test="cell-header">
    {children}
  </h4>
);

export const CellSubHeader: React.FC<ICellHeader> = ({ children }) => (
  <h5 className={css("header-small")} data-test="cell-header-small">
    {children}
  </h5>
);

export interface ICellDescription {
  truncate?: boolean;
  className?: string;
  children: any;
}

export const CellDescription: React.FC<ICellDescription> = ({
  truncate = false,
  className = "",
  children,
}) => {
  return (
    <div
      className={css("description", { className })}
      data-test="cell-description"
    >
      {truncate && typeof children === "string"
        ? truncateText(children)
        : children}
    </div>
  );
};

export interface ICellPrice {
  price: number;
  quantity?: number;
  children?: any;
}

export const CellPrice: React.FC<ICellPrice> = ({
  price,
  quantity,
  children,
}) => {
  return (
    <h4>
      {children} - <Currency>{price}</Currency>{" "}
      <strong>{quantity ? "x" + quantity : null}</strong>
    </h4>
  );
};

export interface ICellType {
  icon?: string;
  children?: any;
}

export const CellType: React.FC<ICellType> = ({ icon, children }) => (
  <div data-test="cell-type" className={css("type")}>
    {icon && (
      <div data-test="icon">
        <Icon
          name={icon}
          size={EStandardSizes.Small}
          className={css("type_icon")}
        />
      </div>
    )}
    {children && (
      <div data-test="label">
        <label>{children}</label>
      </div>
    )}
  </div>
);

export interface ICellMetricProps {
  value: string | number;
  label?: string;
}

/**
 * Used to exaggerate a value and associate a label with that value.
 */
export const CellMetric: React.FC<ICellMetricProps> = ({ value, label }) => {
  return (
    <div data-test="metric" className={css("metric")}>
      <span data-test="value" className={css("metric_value")}>
        {value}
      </span>
      <span data-test="label" className={css("metric_label")}>
        {label}
      </span>
    </div>
  );
};

interface ICellActionsProps {
  actions: ICellAction[];
  isLead?: boolean;
}

const CellActions: React.FC<ICellActionsProps> = ({ actions, isLead }) => {
  return (
    <div className={css("actions")} data-test="actions">
      {actions.map((action: ICellAction, i: number) => (
        <span
          data-test={`action-${i}`}
          key={i}
          className={css("actions_action")}
        >
          {!!action.icon && (
            <div className={css("actions_action_icon")}>
              <Icon
                size={EStandardSizes.ExtraSmall}
                name={action.icon}
                onClick={
                  typeof action.onClick === "function" ? action.onClick : null
                }
              />
            </div>
          )}
          {!!action.label && (
            <div
              className={css("actions_action_button")}
              data-test={`action-${i}-button`}
            >
              <Button
                onClick={
                  typeof action.onClick === "function" ? action.onClick : null
                }
                variant={action.variant || "primary"}
                size={action.size}
              >
                {action.label}
              </Button>
            </div>
          )}
        </span>
      ))}
    </div>
  );
};
