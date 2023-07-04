import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles);

import { AltButton } from "../../../../generic/Button";

export interface IFocusViewProps {
  isFocused: boolean;
  onCancelClick?: any;
  className?: string;
  children: React.ReactElement;
}

/**
 * Spaces the content in a way that supports a SideNav.
 */
export const FocusView: React.FC<IFocusViewProps> = ({
  isFocused,
  onCancelClick,
  children,
  className,
}) => {
  const classNames = [className, css("focusView", { "-focused": isFocused })]
    .filter((x) => x)
    .join(" ");

  return (
    <div className={classNames}>
      <div className={css("focusView_body")}>{children}</div>
      {onCancelClick && (
        <div className={css("focusView_exit")}>
          <AltButton onClick={onCancelClick}>Back</AltButton>
        </div>
      )}
    </div>
  );
};
FocusView.displayName = "FocusView";

export default FocusView; // TODO: remove, left for legacy default imports
