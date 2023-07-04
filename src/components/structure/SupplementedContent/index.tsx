import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "supplementedContent");

export interface ISupplementedContentProps {
  /** Child components. */
  children: React.ReactElement<
    ISupplementedContentProps & ISupplementedContentBodyProps
  >[];
}

/**
 * Content that contains a supplemented section(s) with fixed width and body.
 */
export const SupplementedContent: React.FC<ISupplementedContentProps> = ({
  children,
}) => <div className={css("")}>{children}</div>;

export interface ISupplementedContentSupplementProps {
  /** Child components. */
  children: React.ReactElement<any>;
  /** Determines the width of the supplement. */
  size?: EStandardSizes;
}

/**
 * Supplement section with set width. Good for showing content like a side bar.
 * Can be multiple. Left or right.
 */
export const SupplementedContentSupplement: React.FC<
  ISupplementedContentSupplementProps
> = ({ children, size = EStandardSizes.Medium }) => (
  <div className={css("supplement", `-size-${size}`)}>{children}</div>
);

export interface ISupplementedContentBodyProps {
  /** Child components. */
  children: React.ReactElement<any> | React.ReactElement<any>[];
}

/**
 * Content body.
 */
export const SupplementedContentBody: React.FC<
  ISupplementedContentBodyProps
> = ({ children }) => <div className={css("body")}>{children}</div>;
