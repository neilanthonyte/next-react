import * as React from "react";
import { useDelayedRerender } from "../../../hooks/useDelayedRerender";
import { LoadingBlock } from "../../structure/LoadingBlock";

export interface IPendingStyleDebugProps {
  delay?: number;
}

/**
 * Wrapper used to delay the render of components in styleguidist demos while the style is loading
 *
 * useful for when needing to interact with dimensions or positions of elements in the DOM
 */
export const PendingStyleDebug: React.FC<IPendingStyleDebugProps> = ({
  children,
  delay = 1000,
}) => {
  const isReady = useDelayedRerender(delay);

  return (
    <LoadingBlock isLoading={!isReady} message="Waiting for style to load">
      {children}
    </LoadingBlock>
  );
};
