import * as React from "react";

import { Icon } from "../Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
export const css = cssComposer(styles, "IconProgress");

interface IIconProgressProps {
  icons: string[];
  step: number;
  separator?: string;
}

// TODO implement color scheme

/**
 * Renders a list of icons in order to indicate progress through steps
 */
export const IconProgress: React.FC<IIconProgressProps> = ({
  icons,
  step,
  separator = "chevron-small-right",
}) => (
  <div className={css("")}>
    {icons.map((iconName, index) => (
      <span key={index}>
        <span
          className={css("stage", {
            "-active": index === step,
            "-complete": index < step,
          })}
        >
          <Icon name={iconName} />
        </span>
        {index < icons.length - 1 ? (
          <span className={css("separator")}>
            <Icon name={separator} />
          </span>
        ) : null}
      </span>
    ))}
  </div>
);
