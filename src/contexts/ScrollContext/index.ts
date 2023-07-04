import * as React from "react";

export interface IScrollContextProvider {
  setScroll?: (path: string, offsetPercent: number) => void;
  scrollOffsets?: {
    [path: string]: number;
  };
}

export const ScrollContext = React.createContext<IScrollContextProvider>({});
