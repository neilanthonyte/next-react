import * as React from "react";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { ISimplePatientEhrAssociation } from "next-shared/src/types/IPatientEhrAssociation";

export interface IAppContextValue {
  // method used to perform session persistence on request
  persistSession: () => void;
  // flag to indicate the check for a persisted session has been completed
  // (for components sensitive to client.auth.session changes where the persistence check is async)
  sessionPersistenceComplete: boolean;
  sessionPersistenceLoading: boolean;
  sessionPersistenceError: Error;
  sessionPersistenceRetry: () => Promise<Session>;
  /** simple patient ehr association made available globally to apps if needed */
  globalSimplePatientEhrAssociation?: ISimplePatientEhrAssociation;
  setGlobalSimplePatientEhrAssociation?: (
    globalSimplePatientEhrAssociation: ISimplePatientEhrAssociation,
  ) => void;
}

export const AppContext = React.createContext<IAppContextValue>({
  persistSession: undefined,
  sessionPersistenceComplete: undefined,
  sessionPersistenceLoading: undefined,
  sessionPersistenceError: undefined,
  sessionPersistenceRetry: undefined,
  globalSimplePatientEhrAssociation: undefined,
  setGlobalSimplePatientEhrAssociation: undefined,
});
