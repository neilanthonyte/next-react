import * as React from "react";
import { useState, useEffect } from "react";

/**
 * Debug for throwing unexpected component level errors
 */
export const ErrorBoundaryDebug: React.FC = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) throw new Error("Mock Error");
  }, [error]);

  return (
    <>
      <h4>Error boundary</h4>
      <p>
        <button onClick={() => setError(true)}>Throw error</button>
      </p>
    </>
  );
};
