import { useContext } from "react";

import { TickContext } from "../contexts/TickContext";

/**
 * use context to for re-render on tick update
 *
 * @returns {unixTimestamp}
 */
export function useTickReRender() {
  const { tick } = useContext(TickContext);
  return tick;
}
