import * as React from "react";

import { Icon } from "../Icon";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Earmark");

export enum TEarmarkCategory {
  one,
  two,
  three,
  four,
  five,
  six,
}

export interface IEarmarkProps {
  name: string;
  size?: EStandardSizes;
  category?: TEarmarkCategory;
}

/**
 * Decorates an element with an 'Earmark' - A small coloured triangle covering
 * the top-right corner of an element, with an icon inside. The Earmark
 * component is intended to be used for grouping and distinguishing multiple
 * elemnts belonging to a predetermined set of categories.
 *
 * @prop {string} name - The name of the icon to be used.
 * @prop {IStandardSizes} [size="xs"] - An optional size conforming to the IStandardSizes type.
 * @prop {TEarmarkCategory} [category=TEarmarkCategory.one] - An optional category, determining the background colour
 * of the Earmark.
 */
export const Earmark: React.FC<IEarmarkProps> = ({
  name,
  size = EStandardSizes.ExtraSmall,
  category = TEarmarkCategory.one,
}) => {
  const classNames = [css("", `-${size}`, TEarmarkCategory[category])];
  return (
    <div className={css("wrapper")}>
      <div className={classNames.join(" ")}>
        <Icon className={css("icon")} name={name} size={size} />
      </div>
    </div>
  );
};
