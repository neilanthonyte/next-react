import { NavLink } from "react-router-dom";
import * as React from "react";

import { Badge, IBadgeProps } from "../../../../generic/Badge";
import {
  Button,
  IButtonProps,
  TButtonVariant,
} from "../../../../generic/Button";
import {
  CircularIcon,
  ICircularIconProps,
} from "../../../../generic/CircularIcon";
import { INumberInputProps } from "../../../../inputs/NumberInput";
import { ISearchInputProps } from "../../../../generic/SearchInput";
import { ITextInputProps } from "../../../../inputs/TextInput";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "../../styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
import { Icon } from "../../../../generic/Icon";
const css = cssComposer(styles, "baseSection");

export interface IHeaderInputsProps {
  children: React.ReactElement<
    ITextInputProps<string> | ISearchInputProps | INumberInputProps
  >;
}

export const HeaderInputs: React.FC<IHeaderInputsProps> = ({ children }) => (
  <div className={css("header_inputs")} data-test="header-inputs">
    {children}
  </div>
);

export interface IHeaderActionsProps {
  children:
    | React.ReactElement<IButtonProps | ICircularIconProps>
    | React.ReactElement<IButtonProps | ICircularIconProps>[];
}

export const HeaderActions: React.FC<IHeaderActionsProps> = ({ children }) => (
  <div className={css("header_actions")}>
    {React.Children.map(
      children,
      (child: React.ReactElement<IButtonProps | ICircularIconProps>) => {
        return React.cloneElement(child, {
          onClick:
            typeof child.props.onClick === "function"
              ? (evt: React.MouseEvent<HTMLElement>) => {
                  // TODO: figure out why evt is undefined
                  if (evt) {
                    evt.stopPropagation();
                  }
                  child.props.onClick();
                }
              : null,
          className:
            child.type === CircularIcon ? css("header_actions_icon") : "",
        });
      },
    )}
  </div>
);

export interface IHeaderTextProps {
  children: string;
}

export const HeaderText: React.FC<IHeaderTextProps> = ({ children }) => (
  <div className={css("header_text")}>
    <span>{children}</span>
  </div>
);

export interface IHeaderBadgeProps {
  children: React.ReactElement<IBadgeProps>;
}

export const HeaderBadge: React.FC<IHeaderBadgeProps> = ({ children }) => (
  <div className={css("header_badge")}>
    <span>{children}</span>
  </div>
);

export interface IHeaderAction {
  icon?: string;
  label?: string;
  disabled?: boolean;
  /** Action to perform on click */
  onClick?: (args?: any) => any;
  /** Location to navigate to on click */
  to?: string;
  variant?: TColorVariants;
  buttonVariant?: TButtonVariant;
}

// Kinda HACK. we want to use the existing components to structure a page,
// but when using the Well component, we need specific style applied
export enum EHeaderVariant {
  "Standard" = "standard",
  "Well" = "well",
}

export interface IHeaderProps {
  children: any;
  className?: string;
  isActive?: boolean;
  isSticky?: boolean;
  actions?: IHeaderAction[];
  badge?: string;
  label?: string;
  onClick?: (args?: any) => any;
  variant?: EHeaderVariant;
}

/**
 * Wrapper for main headings with optional actions
 */
export const Header: React.FC<IHeaderProps> = ({
  children,
  className = "",
  isActive = false,
  isSticky = false,
  actions = [],
  badge,
  label,
  onClick,
  variant = EHeaderVariant.Standard,
}) => {
  const getButton = (action: IHeaderAction) => {
    if (!action.label) {
      return null;
    }
    if (action.buttonVariant) {
      return (
        <span
          data-test="action-button"
          className={css("header_actions_button")}
        >
          <Button
            onClick={action.onClick}
            variant={action.buttonVariant}
            icon={action.icon}
          >
            {action.label}
          </Button>
        </span>
      );
    }
    if (action.disabled) {
      return (
        <span className={css("disabledLink")}>
          <Icon name={action.icon} /> {action.label}
        </span>
      );
    }
    if (action.to) {
      return (
        <NavLink
          data-test="action-anchor"
          onClick={action.onClick}
          to={action.to}
        >
          <Icon name={action.icon} />
          {action.label}
        </NavLink>
      );
    }
    return (
      <a data-test="action-anchor" onClick={action.onClick}>
        <Icon name={action.icon} /> {action.label}
      </a>
    );
  };

  return (
    <header
      data-test="header"
      className={css("header", `-${variant}`, {
        "-active": isActive,
        "-sticky": isSticky,
        className,
      })}
      onClick={onClick || null}
    >
      {children}
      <div className={css("header_decorations")}>
        {badge && (
          <span>
            <Badge>{badge.toString()}</Badge>
          </span>
        )}
        {label && (
          <span>
            <label>{label}</label>
          </span>
        )}
        {Array.isArray(actions) &&
          actions.map((action, i) => {
            const onClick = (evt: MouseEvent) => {
              // TODO why is evt undefined?
              if (evt) {
                evt.stopPropagation();
              }
              if (typeof action.onClick === "function") {
                action.onClick(evt);
              }
            };

            return (
              <span
                data-test={`action-${i}`}
                key={"action-" + i}
                className={css("header_action")}
              >
                {action.icon && !action.label ? (
                  <span data-test="action-icon">
                    <CircularIcon
                      to={action.to}
                      className={css("header_actions_icon")}
                      name={action.icon}
                      size={EStandardSizes.Small}
                      onClick={action.disabled ? null : onClick}
                      variant={
                        action.disabled
                          ? TColorVariants.Disabled
                          : action.variant
                      }
                    />
                  </span>
                ) : null}
                {getButton({ ...action, onClick })}
              </span>
            );
          })}
      </div>
    </header>
  );
};
