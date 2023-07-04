import * as React from "react";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { AppContext } from "../../../contexts/AppContext";

/**
 * Debug for session persistence
 * Implemments different behaviours depending on the App config settings
 * It requires a ConfigContext provider (supplied by AppHandler)
 */
export const SessionPersistenceDebug: React.FC = () => {
  const { config } = useRequiredContext(ConfigContext);
  const { persistSession } = useRequiredContext(AppContext);
  return (
    <>
      <h4>Session persistence approach</h4>
      <p>
        {config.persistSessionOnLoad ? "on load" : "on request"} (
        <a href={addParamsToUrl({ persistSessionOnLoad: true })}>on load</a>
        {" | "}
        <a href={addParamsToUrl({ persistSessionOnLoad: false })}>on request</a>
        )
        {config.persistSessionOnLoad === false && (
          <>
            (<a onClick={persistSession}>request now</a>)
          </>
        )}
      </p>
    </>
  );
};
