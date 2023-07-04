import * as React from "react";
import { useCallback, useState } from "react";

import { Icon } from "../Icon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "alert");

export interface IAlertProps {
  children?: any;
  variant?: TColorVariants;
  showClose?: boolean;
  title?: string;
}

export const Alert: React.FC<IAlertProps> = ({
  children,
  variant,
  title,
  showClose = true,
}) => {
  const [hidden, setHidden] = useState<boolean>(false);

  const renderCloseIcon = useCallback(
    () => (
      <div data-test="alert-close">
        <Icon
          variant={variant}
          onClick={closeAlert}
          className={css("close")}
          name={"close"}
          size={EStandardSizes.ExtraSmall}
        />
      </div>
    ),
    [],
  );

  const closeAlert = useCallback(() => setHidden(true), []);

  return (
    <React.Fragment>
      {!hidden ? (
        <div data-test="alert" className={css("", `-variant-${variant}`)}>
          {title ? (
            <div className={css("header")}>
              <h3 className={css("title")} data-test="alert-header">
                {title}
              </h3>
              {showClose ? renderCloseIcon() : null}
            </div>
          ) : null}
          <div>
            <div className={css("content")}>
              <div data-test="alert-body">{children}</div>
              {!title && showClose ? renderCloseIcon() : null}
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};
