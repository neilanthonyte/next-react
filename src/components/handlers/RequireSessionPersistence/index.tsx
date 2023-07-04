import * as React from "react";

import { AppContext } from "../../../contexts/AppContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { PendingContent } from "../../structure/PendingContent";
import { Loader } from "../../generic/Loader";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "RequireSessionPersistence");

/**
 * Display a loading screen whilst the app loads.
 */
const SessionPersistence: React.FC = () => {
  const { sessionPersistenceRetry, sessionPersistenceError } =
    useRequiredContext(AppContext);
  return (
    <div className={css("")}>
      {!sessionPersistenceError ? (
        <Loader />
      ) : (
        <ErrorPlaceholder
          retry={sessionPersistenceRetry}
          retryLabel="Try again"
        />
      )}
    </div>
  );
};

export interface IRequireSessionPersistenceProps {}

/**
 * Block the app until we have attempted to load the session.
 */
export const RequireSessionPersistence: React.FC<
  IRequireSessionPersistenceProps
> = ({ children }) => {
  const { sessionPersistenceComplete } = useRequiredContext(AppContext);

  return (
    <PendingContent
      check={sessionPersistenceComplete}
      fallback={SessionPersistence}
    >
      {sessionPersistenceComplete && children}
    </PendingContent>
  );
};
