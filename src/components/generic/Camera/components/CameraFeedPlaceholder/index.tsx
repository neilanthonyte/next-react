import * as React from "react";

import { cssComposer } from "../../../../../helpers/cssComposer";
import { Icon } from "../../../Icon";

import styles from "./styles.scss";
const css = cssComposer(styles, "CameraFeedPlaceholder");

export interface ICameraFeedPlaceholderProps {
  icon: string;
  onClick?: any;
  round?: boolean;
}

export const CameraFeedPlaceholder: React.FC<ICameraFeedPlaceholderProps> = ({
  icon,
  onClick,
  round = false,
}) => {
  return (
    <div
      className={css("", { "-round": round })}
      onClick={onClick || null}
      data-test="placeholder"
      data-test-is-round={round}
    >
      <Icon name={icon} className={css("icon")} />
    </div>
  );
};
