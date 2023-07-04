import { ReactEventHandler } from "react";

/**
 * A higher-order function that takes an event handler and returns an event
 * handler that stops the propagation of the event.
 */
export const onClickStopPropagation: (
  f: ReactEventHandler,
) => ReactEventHandler = (f) => (e) => {
  e.stopPropagation();
  f(e);
};
