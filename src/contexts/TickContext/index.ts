import * as React from "react";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

/**
 * tick context provider interface
 */
export interface ITickContextProvider {
  tick: unixTimestamp;
}

/**
 * tick context
 *
 * @type {React.Context<ITickContextProvider>}
 */
export const TickContext = React.createContext<ITickContextProvider>({
  tick: undefined,
});
