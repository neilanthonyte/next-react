import * as React from "react";
import { useContext } from "react";

import { ErrorResolverContext } from "../../../contexts/ErrorResolver";

/**
 * Debug for testing component response to the ErrorResolver context/handler
 */
export const ErrorResolverDebug: React.FC = () => {
  const { resolveError } = useContext(ErrorResolverContext);
  const handleOnClick = () => {
    return new Promise<void>((_, reject) => {
      reject();
    }).catch(() => {
      resolveError({
        title: "Mocked error",
        retry: () =>
          new Promise<void>((resolve) =>
            setTimeout(() => {
              resolve();
            }, 3000),
          ),
        approach: "modal",
      });
    });
  };

  return (
    <>
      <h4>Resolve error</h4>
      <p>
        <button onClick={handleOnClick}>Resolve error</button>
      </p>
    </>
  );
};
