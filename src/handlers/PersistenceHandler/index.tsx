import * as React from "react";

import { PersistenceContext } from "../../contexts/PersistenceContext";

export const PersistenceHandler: React.FC = ({ children }) => {
  // need to be arrouw function to bind the window context
  // also need to be async as RN environment is Promise based

  const handleGetItem = (key: string) => {
    return new Promise<string | void>((res) => {
      res(window.localStorage.getItem(key));
    }).catch(console.error);
  };

  const handleSetItem = (key: string, value: string) => {
    return new Promise<void>((res) => {
      res(window.localStorage.setItem(key, value));
    }).catch(console.error);
  };
  const handleRemoveItem = (key: string) => {
    return new Promise<void>((res) => {
      res(window.localStorage.removeItem(key));
    }).catch(console.error);
  };

  const value = {
    getItem: handleGetItem,
    setItem: handleSetItem,
    removeItem: handleRemoveItem,
  };

  return (
    <PersistenceContext.Provider value={value}>
      {children}
    </PersistenceContext.Provider>
  );
};
