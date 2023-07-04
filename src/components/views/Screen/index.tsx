import * as React from "react";
import { useMemo } from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "screen");

export interface IScreenProps {
  children: any;
  decorationChildren?: any;
  variant?: "alt";
  increaseAttachmentVisibility?: boolean;
}

/**
 * Provides a branded holding screen. It takes on the size of the parent element.
 */
export const Screen: React.FC<IScreenProps> = ({
  variant = "",
  children,
  decorationChildren,
  increaseAttachmentVisibility,
}) => {
  const decorationSections = useMemo(() => {
    const _decorationSections: { [key: string]: React.Component[] } = {
      top: [],
      bottom: [],
      rest: [],
    };

    React.Children.forEach(decorationChildren, (child) => {
      if (child) {
        switch (child.type.displayName) {
          case "ScreenAttachmentTL":
          case "ScreenAttachmentTM":
          case "ScreenAttachmentTR":
            _decorationSections.top.push(child);
            break;
          case "ScreenAttachmentBL":
          case "ScreenAttachmentBM":
          case "ScreenAttachmentBR":
            _decorationSections.bottom.push(child);
            break;
          default:
            _decorationSections.rest.push(child);
            break;
        }
      }
    });

    return _decorationSections;
  }, [decorationChildren]);

  return (
    <div
      className={css("", `-${variant}`, {
        "-increaseAttachmentVisibility": increaseAttachmentVisibility,
      })}
      data-test="screen"
    >
      {children}
      <div
        className={css("top", { "-gradient": increaseAttachmentVisibility })}
      >
        {decorationSections.top}
      </div>
      <div
        className={css("bottom", { "-gradient": increaseAttachmentVisibility })}
      >
        {decorationSections.bottom}
      </div>
    </div>
  );
};

export interface IScreenBodyProps {
  children: any;
  withSafety?: boolean;
  center?: boolean;
  className?: string;
}

export const ScreenBody: React.FC<IScreenBodyProps> = ({
  children,
  withSafety = true,
  center = false,
  className = "",
}) => (
  <div
    className={css(
      "body",
      { "-withSafety": withSafety, "-center": center },
      { className },
    )}
  >
    {children}
  </div>
);

export interface IScreenAttachmentProps {
  children: any;
  fullSize?: boolean;
}

export interface IScreenAttachmentTLProps extends IScreenAttachmentProps {}
export const ScreenAttachmentTL: React.FC<IScreenAttachmentTLProps> = ({
  children,
  fullSize,
}) => (
  <div
    data-test="details"
    className={css("attachmentTL", { "-fullSize": fullSize })}
  >
    {children}
  </div>
);
ScreenAttachmentTL.displayName = "ScreenAttachmentTL";

export interface IScreenAttachmentTMProps extends IScreenAttachmentProps {}
export const ScreenAttachmentTM: React.FC<IScreenAttachmentTMProps> = ({
  children,
  fullSize,
}) => (
  <div
    data-test="details"
    className={css("attachmentTM", { "-fullSize": fullSize })}
  >
    {children}
  </div>
);
ScreenAttachmentTM.displayName = "ScreenAttachmentTM";

export interface IScreenAttachmentTRProps extends IScreenAttachmentProps {}
export const ScreenAttachmentTR: React.FC<IScreenAttachmentTRProps> = ({
  children,
  fullSize,
}) => (
  <div
    data-test="details"
    className={css("attachmentTR", { "-fullSize": fullSize })}
  >
    {children}
  </div>
);
ScreenAttachmentTR.displayName = "ScreenAttachmentTR";

export interface IScreenAttachmentBLProps extends IScreenAttachmentProps {}
export const ScreenAttachmentBL: React.FC<IScreenAttachmentBLProps> = ({
  children,
  fullSize,
}) => (
  <div
    data-test="details"
    className={css("attachmentBL", { "-fullSize": fullSize })}
  >
    {children}
  </div>
);
ScreenAttachmentBL.displayName = "ScreenAttachmentBL";

export interface IScreenAttachmentBMProps extends IScreenAttachmentProps {}
export const ScreenAttachmentBM: React.FC<IScreenAttachmentBMProps> = ({
  children,
  fullSize,
}) => (
  <div
    data-test="details"
    className={css("attachmentBM", { "-fullSize": fullSize })}
  >
    {children}
  </div>
);
ScreenAttachmentBM.displayName = "ScreenAttachmentBM";

export interface IScreenAttachmentBRProps extends IScreenAttachmentProps {}
export const ScreenAttachmentBR: React.FC<IScreenAttachmentBRProps> = ({
  children,
  fullSize,
}) => (
  <div
    data-test="details"
    className={css("attachmentBR", { "-fullSize": fullSize })}
  >
    {children}
  </div>
);
ScreenAttachmentBR.displayName = "ScreenAttachmentBR";

export interface IScreenBackgroundProps {
  children: any;
}
export const ScreenBackground: React.FC<IScreenBackgroundProps> = ({
  children,
}) => (
  <div data-test="details" className={css("background")}>
    {children}
  </div>
);
