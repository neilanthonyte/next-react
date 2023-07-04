import * as React from "react";
import styles from "./styles.scss";
import { Icon } from "../../../Icon";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "ToastSlice");

export interface IToastSliceProps {
  title: string;
  description?: string;
  icon?: string;
  color?: "light" | "dark"; // defaults to "dark"
}

export const ToastSlice: React.FC<IToastSliceProps> = ({
  title,
  description,
  icon,
  color = "dark",
}) => {
  return (
    <div className={css("") + " " + css(color)}>
      <div className={css("textContainer")}>
        <div className={css("title")}>{title}</div>
        <div className={css("description")}>{description}</div>
      </div>

      {icon && (
        <div className={css("iconContainer")}>
          <Icon name={icon} />
        </div>
      )}
    </div>
  );
};
