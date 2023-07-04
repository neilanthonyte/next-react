import * as React from "react";

import { Loader, LoadingOverlay } from "../../generic/Loader";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { ErrorPlaceholder } from "../ErrorPlaceholder";
import { useEffect } from "react";
const css = cssComposer(styles, "LoadingBlock");

export type TLoadingBlockSize = "lg" | "full" | "payDock";

export interface ILoadingBlockProps {
  isLoading?: boolean;
  children?: any;
  showContents?: boolean;
  size?: TLoadingBlockSize;
  message?: string;
  error?: Error | null;
  refetch?: (args?: any) => any;
}

/**
 * Provides a placeholder loading block for content that is being loaded. Provides
 * several modes of operation:
 *
 * - block
 * - show dimmed children
 */
export const LoadingBlock: React.FC<ILoadingBlockProps> = ({
  isLoading = true,
  children = null,
  showContents = false,
  size,
  message,
  error,
  refetch,
}) => {
  // react query keeps the error until success, so to show a loading state on refetch, check the isLoading flag as well

  // do not force a size if we want to show the content
  if (showContents) {
    if (size) {
      console.warn("do not use size when showContents is set to true");
    }
    size = undefined;
  }

  return (
    <div className={css("", `-size-${size}`, { "-isLoading": isLoading })}>
      {isLoading && !!message && (
        <p>
          <label>{message}</label>
        </p>
      )}
      {error && !isLoading && <ErrorPlaceholder retry={refetch} />}
      {(!isLoading || showContents) && children}
      {isLoading && (
        <div className={css("fallback", { "-cover": showContents })}>
          {showContents ? <LoadingOverlay /> : <Loader />}
        </div>
      )}
    </div>
  );
};
