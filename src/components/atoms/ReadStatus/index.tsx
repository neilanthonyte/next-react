import * as React from "react";

import { CircularIcon } from "../../generic/CircularIcon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

interface IArticleStatusProps {
  onPrescribe?: ((evt: React.MouseEvent<HTMLElement>) => void) | boolean;
  onRemove?: ((evt: React.MouseEvent<HTMLElement>) => void) | boolean;
  isPrescribed: boolean;
  isRead: boolean;
}

export const ArticleStatus: React.FC<IArticleStatusProps> = ({
  onPrescribe,
  onRemove,
  isPrescribed,
  isRead,
}) => {
  if (isRead) {
    return (
      <div className={css("prescribing")}>
        <CircularIcon name="tick" variant={TColorVariants.Success} />
      </div>
    );
  }
  if (isPrescribed) {
    return (
      <div className={css("prescribing")}>
        <CircularIcon key="icon" name="drawer" />
        <div className={css("prescribing_label")}>
          <label key="label">In reading list</label>
          {typeof onRemove === "function" && (
            <div className={css("prescribing_label_link")} onClick={onRemove}>
              remove
            </div>
          )}
        </div>
      </div>
    );
  }
  if (typeof onPrescribe === "function") {
    return (
      <div className={css("prescribing")}>
        <CircularIcon key="icon" name="plus" onClick={onPrescribe} />
        <div className={css("prescribing_label")}>
          <label key="label">Add to reading list</label>
        </div>
      </div>
    );
  }
  return null;
};
