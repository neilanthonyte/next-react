import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { Icon } from "../../generic/Icon";
const css = cssComposer(styles, "Tag");

export interface ITagProps {
  onClear?: (evt: React.MouseEvent) => unknown;
  isClearable?: boolean;
  onClick?: (evt: React.MouseEvent) => unknown;
  showCollapsibleDecoration?: boolean;
}

/**
 * Component rendering a styled tag
 */
export const Tag: React.FC<ITagProps> = ({
  children,
  onClick,
  onClear,
  isClearable = true,
  showCollapsibleDecoration = false,
}) => {
  return (
    <div
      className={css("", { "-clearable": !!onClear, "-clickable": !!onClick })}
      onClick={onClick}
      data-test="tag"
    >
      {showCollapsibleDecoration && (
        <Icon
          className={css("decoration")}
          name="chevron-down"
          data-test="collapsible-decoration"
        />
      )}
      <div className={css("label")} data-test="label">
        {children}
      </div>
      {onClear && (
        <Icon
          name="cancel"
          className={css("clear", { "-disabled": !isClearable })}
          onClick={isClearable ? onClear : undefined}
          data-test="clear"
        />
      )}
    </div>
  );
};
