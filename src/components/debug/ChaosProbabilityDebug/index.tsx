import * as React from "react";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";

/**
 * Debug for switching chaos monkey probability
 */
export const ChaosProbabilityDebug: React.FC = () => {
  return (
    <>
      <h4>Chaos probability</h4>
      <p>
        <a href={addParamsToUrl({ debugChaosProbability: 0.3 })}>
          Enable chaos probability (change amount manually in the url)
        </a>
      </p>
    </>
  );
};
