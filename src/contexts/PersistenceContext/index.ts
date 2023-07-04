import * as React from "react";

export interface IPersistenceContextValue {
  getItem: (key: string) => Promise<string | void>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

/**
 * Context exposing universal local storage methods.
 * Needed to be able to share across multiple environment with different implementations (e.g. web vs mobile native)
 */
export const PersistenceContext = React.createContext<IPersistenceContextValue>(
  {
    getItem: undefined,
    setItem: undefined,
    removeItem: undefined,
  },
);
