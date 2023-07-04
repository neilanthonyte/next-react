import * as React from "react";
import { useMemo } from "react";
import moment from "moment";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { IBaseAction } from "next-shared/src/types/IBaseAction";

import { Icon } from "../Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "BaseAction");

export interface IBaseActionProps {
  action: IBaseAction;
  /** Called when interacted with. Action will be disabled if not provided */
  onClick?: () => void;
  variant?: "default" | "goal" | "patient";
  showCheck?: boolean;
}

export const BaseAction: React.FC<IBaseActionProps> = ({
  action,
  onClick,
  variant = "default",
  showCheck = false,
}) => {
  const {
    title,
    keyDate,
    disabled,
    resolvedAt,
    resolution,
    description,
    comment,
    icon = "tick",
  } = action;

  onClick = !disabled && onClick ? onClick : null;

  // HACK - should always be able to use updatedAt (but provided by the server)
  const keyDateLabel = keyDate
    ? moment.unix(keyDate).format("hh:mm Do MMM YYYY")
    : null;
  const resolvedAtLabel = resolvedAt
    ? moment.unix(resolvedAt).format("MMM Do YYYY")
    : null;

  const dynamicIcon = useMemo(() => {
    switch (resolution) {
      case "success":
        return "tick";
      case "fail":
        return "close";
      default:
        break;
    }
  }, [action]);

  const finalVariant = useMemo(() => {
    // give priority to disabled > resolution > variant
    if (disabled) {
      return "disabled";
    }
    switch (resolution) {
      case "success":
        return "success";
      case "fail":
        return "fail";
      default:
        break;
    }
    return variant;
  }, [action]);

  return (
    <div className={css("", `-variant-${finalVariant}`)}>
      <div className={css("details")}>
        {showCheck && (
          <div className={css("icon")}>
            <Icon
              name={"task-solid"}
              size={EStandardSizes.Small}
              onClick={onClick}
            />
          </div>
        )}
        <div className={css("description")}>
          <h4>{title}</h4>
          <div>
            {resolvedAtLabel ? (
              <small>Resolved {resolvedAtLabel}</small>
            ) : description ? (
              <small>{description}</small>
            ) : null}
          </div>
          {keyDateLabel && (
            <span className={css("timestamp")}>{keyDateLabel}</span>
          )}
        </div>
        {!!icon && (
          <div className={css("icon")}>
            <Icon name={icon} size={EStandardSizes.Small} onClick={onClick}>
              {!!dynamicIcon && <Icon name={dynamicIcon} />}
            </Icon>
          </div>
        )}
      </div>
    </div>
  );
};
