import * as React from "react";
import times from "lodash/times";

import { usePager } from "../../../hooks/usePager";
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "PaginatedContent");

interface IPaginatedContentProps {
  itemsPerPage?: number;
}

/**
 * Component rendering a paginated version of its children
 */
export const PaginatedContent: React.FC<IPaginatedContentProps> = ({
  itemsPerPage = 4,
  children,
}) => {
  const childrenArray = React.Children.toArray(children);
  const [Pager, pageItems] = usePager<React.ReactNode>(
    itemsPerPage,
    childrenArray,
  );

  return (
    <div className={css("")}>
      <div className={css("container")}>
        {pageItems.map((item, index) => (
          <div key={index} className={css("item")}>
            {item}
          </div>
        ))}
        {times(
          (itemsPerPage - (pageItems && pageItems.length % itemsPerPage)) %
            itemsPerPage,
          (n) => (
            <div key={`filler-${n}`} className={css("item")}></div>
          ),
        )}
      </div>
      <div className={css("pagination")}>
        <Pager />
      </div>
    </div>
  );
};
