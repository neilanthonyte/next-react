import * as React from "react";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "AvatarInitials");

export interface IAvatarInitialsProps {
  /** Name initials displayed in the avatar. Max supported chars applied */
  initials: string;
  /** Size of component. Default applied */
  stdSize?: EStandardSizes;
}

/**
 * Component rendering a styled initials avatar
 */
export const AvatarInitials: React.FC<IAvatarInitialsProps> = ({
  initials,
  stdSize = EStandardSizes.Medium,
}) => {
  // Early return if initials too long
  if ((initials || []).length > 3) {
    console.error(
      "AvatarInitials only supports up to 3 characters initials, received",
      initials.length,
    );
    return null;
  }

  return (
    <div
      data-test="avatar-initials"
      className={css("", {
        [`-stdSize-${stdSize}`]: !!stdSize,
      })}
    >
      {initials}
    </div>
  );
};
