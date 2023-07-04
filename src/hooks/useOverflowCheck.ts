import { useElementDimension } from "./useElementDimension";

export enum OverflowAxis {
  x = "x",
  y = "y",
}

/**
 * Returns true if the component with the ref is overflowing its container on the y axis.
 * Returns false otherwise.
 */
export const useOverflowCheck = (axis = OverflowAxis.y) => {
  let clientSize;
  let parentSize;

  const [ref, dimensions] = useElementDimension();

  if (axis === OverflowAxis.y) {
    clientSize = dimensions.clientHeight;
    parentSize = dimensions.parentHeight;
  } else {
    clientSize = dimensions.clientWidth;
    parentSize = dimensions.parentWidth;
  }

  return { ref, isOverflowing: clientSize > parentSize };
};
