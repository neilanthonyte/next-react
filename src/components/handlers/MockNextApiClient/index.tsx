import * as React from "react";
import { IMockConfigValues } from "../../../client/MockConfiguration";
import { nextClientFactoryMock } from "../../../client/nextClientFactoryMock";
import { useMemo } from "react";
import { ApiClientContext } from "../../../contexts/ApiClientContext";

export interface IMockNextApiClientProps {
  config?: IMockConfigValues;
  loginPatient?: boolean;
}
/**
 * This component should only be used for testing and in readme's.
 * It implements an ApiClientContext with the mock client.
 */
export const MockNextApiClient: React.FC<IMockNextApiClientProps> = ({
  children,
  config,
  loginPatient = false,
}) => {
  const provider = useMemo(() => {
    const client = nextClientFactoryMock("", config);
    if (loginPatient) {
      client.auth.setSessionFromSessionId("0");
    }
    return {
      client,
    };
  }, []);

  return (
    // hack, gets around the orders and store issue for the time being.
    <ApiClientContext.Provider value={provider as any}>
      {children}
    </ApiClientContext.Provider>
  );
};
