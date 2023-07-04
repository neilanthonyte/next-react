import * as React from "react";
import { NavLink } from "react-router-dom";

import { Badge } from "../Badge";
import { PlaceholderView } from "../../views/PlaceholderView";
import { LoadingBlock } from "../../structure/LoadingBlock";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
const css = cssComposer(styles, "Widget");

export interface IWidgetProps {
  badge?: number;
  children?: any;
  label?: string;
  emptyDescription?: string;
  /** A link to more information */
  toMore?: string;
  loading?: boolean;
  options?: {
    labels: string[];
    selected: string;
    onSelect: (value: string) => void;
  };
  fullHeight?: boolean;
}

export const Widget: React.FC<IWidgetProps> = ({
  badge,
  children,
  label,
  emptyDescription = "No information available",
  toMore,
  loading = false,
  options,
  fullHeight = false,
}) => {
  return (
    <div className={css("", { "-fullHeight": fullHeight })}>
      {!!label && <div className={css("label")}>{label}</div>}
      {!!(badge || options) && (
        <div className={css("badge")}>
          {!!options &&
            options.labels.map((label) => (
              <span key={label} onClick={() => options.onSelect(label)}>
                {" "}
                <Badge
                  variant={
                    label === options.selected
                      ? TColorVariants.Primary
                      : TColorVariants.Secondary
                  }
                >
                  {label}
                </Badge>
              </span>
            ))}
          {!!badge && (
            <Badge variant={TColorVariants.Danger}>{badge.toString()}</Badge>
          )}
        </div>
      )}
      <div className={css("body", { "-scrollableContent": fullHeight })}>
        <LoadingBlock isLoading={loading}>
          {children ? (
            children
          ) : (
            <PlaceholderView instruction={emptyDescription} />
          )}
        </LoadingBlock>
      </div>
      {toMore && (
        <div className={css("footer")}>
          <NavLink to={toMore}>View more &gt;</NavLink>
        </div>
      )}
    </div>
  );
};
