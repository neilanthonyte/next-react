import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { Icon } from "../Icon";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "Loader");

interface ILoaderProps {
  children?: any;
  text?: string;
  size?: EStandardSizes;
  isBlocking?: boolean;
  visible?: boolean;
}

export const Loader: React.FC<ILoaderProps> = ({
  children,
  text,
  isBlocking = false,
  size = EStandardSizes.Small,
  visible = true,
}) => {
  return (
    <>
      {visible && (
        <div data-test="loader" className={css("", { "-overlay": isBlocking })}>
          <Icon name="spinner" size={size} className={css("spinner")} />
          {!!text && <span className={css("content")}>{text}</span>}
        </div>
      )}
      {children}
    </>
  );
};

export interface ILoadingOverlayProps extends ILoaderProps {}

export const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({
  size = EStandardSizes.Large,
  ...rest
}) => <Loader isBlocking {...rest} size={size} />;
