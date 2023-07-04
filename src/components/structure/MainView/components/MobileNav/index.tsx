import * as React from "react";
import * as PropTypes from "prop-types";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles);

interface IMobileNavProps {
  /** Changes the appearance */
  isOpen?: boolean;
  /** Callback to indicate the nav should be toggled. */
  onToggleOpen: Function;
  /** Custom styling class. */
  className?: string;
}

/**
 *  Mobile navigation
 */
export const MobileNav: React.FC<IMobileNavProps> = ({
  isOpen,
  onToggleOpen,
  className = "",
}) => {
  return (
    <div className={[css("mobileNav"), className].join(" ")}>
      <span onClick={() => onToggleOpen()}>{isOpen ? "Close" : "Menu"}</span>
    </div>
  );
};

export default MobileNav;
