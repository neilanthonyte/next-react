import * as React from "react";

import { Button, IButtonProps } from "../Button";
import { Icon, IIconProps } from "../Icon";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "iconButton");

// need to remove children because we can't make it optional here
// and its required in the button component
// it will complain otherwise
// the icon button will never need to render children anyway
interface IIconButtonProps extends Omit<IButtonProps, "children"> {
  name: string;
  size: EStandardSizes;
}

/**
 * Component to render a button with a single icon and nothing else
 * Still has full button functionality
 * We do this because creating the icon component as a child of a button
 * looks like shit
 */
export const IconButton: React.FC<IIconButtonProps> = (props) => {
  // we need to pull out name just for the icon and size to keep it
  // consistent between the button and icon
  // we also check the variant because we cannot have text icon buttons
  // pull out isBlock so it's never used as you can't have a full width
  // icon button
  // the rest of the props are for the button
  const { name, size, isBlock, ...buttonProps } = props;
  return (
    <div className={css("", `-size-${size}`)}>
      <Button {...buttonProps} size={size} className={css("btn")}>
        <Icon name={name} size={size} className={css("icon")} />
      </Button>
    </div>
  );
};
