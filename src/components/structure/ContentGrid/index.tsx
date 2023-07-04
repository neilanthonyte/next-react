import * as React from "react";
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface IContentGridProps {
  columns?: "dynamic" | number;
}

export const ContentGrid: React.FC<IContentGridProps> = ({
  columns = "dynamic",
  children,
}) => {
  const classNames = css("contentGrid", `cols-${columns}`, {
    "cols-dynamic": !columns,
  });

  return (
    <div className={classNames} data-test="content-grid">
      {React.Children.toArray(children).map((child, i) => (
        <div key={i} data-test={`content-grid-${i}`}>
          {React.cloneElement(child as React.ReactElement, {
            isStandalone: true,
          })}
        </div>
      ))}
    </div>
  );
};

export default ContentGrid; // TODO - legacy
