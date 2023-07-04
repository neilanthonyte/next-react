import * as React from "react";

import { useOverflowCheck } from "../../../hooks/useOverflowCheck";
import { cssComposer } from "../../../helpers/cssComposer";

import styles from "./styles.scss";

const css = cssComposer(styles, "ContentOverflowPreview");

export interface IContentOverflowPreviewProps {}

/**
 * Component showing a fading gradient if its content is heigher than the given threshold
 */
export const ContentOverflowPreview: React.FC<IContentOverflowPreviewProps> = ({
  children,
}) => {
  const { ref, isOverflowing } = useOverflowCheck();

  return (
    <div className={css("container")}>
      <div ref={ref}>{children}</div>
      {isOverflowing && <div className={css("preview")} />}
    </div>
  );
};
