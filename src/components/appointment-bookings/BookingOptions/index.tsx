import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "BookingOptions");

/**
 * Wrapping component for a booking choice.
 *
 * TODO: replace with the Choice component
 */
export const BookingOptions: React.FC = ({ children }) => {
  return <ul className={css("")}>{children}</ul>;
};

interface IBookingOption {
  selected: boolean;
  onSelect: () => void;
}

/**
 * A booking choice.
 */
export const BookingOption: React.FC<IBookingOption> = ({
  children,
  onSelect,
  selected,
}) => {
  return (
    <li
      onClick={onSelect}
      className={css("option", {
        "-selected": selected,
      })}
      data-test="BookingOption-button"
    >
      {children}
    </li>
  );
};
