import * as React from "react";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";

/**
 * Debug for enabling mock errors on client methods
 */
export const RequestErrorCountDebug: React.FC = () => {
  return (
    <>
      <h4>Requests error count</h4>
      <p>
        <a href={addParamsToUrl({ debugRequestErrorCount: 1 })}>
          Enable requests error count (change count manually in the url)
        </a>
      </p>
    </>
  );
};
