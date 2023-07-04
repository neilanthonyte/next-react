import * as React from "react";

export interface IFirebaseContextValue {
  logEvent(eventName: string, data: { [key: string]: any }): void;
}

export const FirebaseContext = React.createContext<IFirebaseContextValue>({
  logEvent: undefined,
});
