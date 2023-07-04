import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { IMessageAuthor } from "next-shared/src/types/messaging";
import { getInitialsFromFullName } from "next-shared/src/helpers/getInitialsFromFullName";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { Avatar } from "../../generic/Avatar";
import { AvatarInitials } from "../../generic/AvatarInitials";
import { StaticLogo } from "../../branding/StaticLogo";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { useMemo } from "react";
const css = cssComposer(styles, "MessageAvatar");

export interface IMessageAvatarProps {
  author: IMessageAuthor;
  layout?: ELayoutVariant;
}

/**
 * Component rendering an avatar image or the initials of the author of a message
 */
export const MessageAvatar: React.FC<IMessageAvatarProps> = ({
  author,
  layout = ELayoutVariant.Standard,
}) => {
  const { isSystem, imageSource, name } = author || {};

  if (!isSystem && !imageSource && !name) {
    console.error(
      "MessageAvatar: a non-system author expects either an imageSource or name property",
    );
    return null;
  }

  const showImage = !isSystem && !!imageSource;

  const initials = useMemo(() => {
    if (isSystem || showImage) return;
    return getInitialsFromFullName(name);
  }, [showImage, isSystem, name]);

  const size =
    layout === ELayoutVariant.Compact
      ? EStandardSizes.ExtraSmall
      : EStandardSizes.Small;

  return (
    <div data-test="message-author" className={css("")}>
      {isSystem && (
        <div
          data-test="avatar-logo"
          className={css("logo", `-stdSize-${size}`)}
        >
          <StaticLogo variant="thumb" colorScheme="color" />
        </div>
      )}
      {showImage && (
        <div data-test="avatar-image">
          <Avatar src={imageSource} stdSize={size} />
        </div>
      )}
      {!!initials && (
        <div data-test="avatar-initials">
          <AvatarInitials initials={initials} stdSize={size} />
        </div>
      )}
    </div>
  );
};
