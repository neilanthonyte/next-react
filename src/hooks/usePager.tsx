import * as React from "react";
import { useMemo, useState } from "react";

import { Pager } from "../components/atoms/Pager";

export function usePager<T>(
  perPage: number,
  allItems: T[],
): [React.FC<{}>, T[] | undefined] {
  const [pageIndex, setPageIndex] = useState<number>(0);

  const pageCount = useMemo(() => {
    if (!allItems) return 0;
    return Math.ceil(allItems.length / perPage);
  }, [allItems, perPage]);

  const items = useMemo(() => {
    if (!allItems) return;
    return allItems.slice(pageIndex * perPage, (pageIndex + 1) * perPage);
  }, [allItems, pageIndex]);

  const PagerComponent = () => (
    <Pager pageCount={pageCount} index={pageIndex} onChange={setPageIndex} />
  );

  return [PagerComponent, items];
}
