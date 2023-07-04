import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import {
  INextAgentContextValue,
  NextAgentContext,
} from "../../../contexts/NextAgentContext";
import { delay } from "../../../helpers/delay";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";

export interface IMockNextAgentHandlerProps {
  initiallyLoggedIn: boolean;
  isConnected: boolean;
  serverMessage?: null | string;
}

export const MockNextAgentHandler: React.FC<IMockNextAgentHandlerProps> = ({
  initiallyLoggedIn,
  isConnected,
  serverMessage = null,
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(initiallyLoggedIn);
  const [userConfig, setUserConfig] = useState<any>({});

  const login = useCallback(async () => {
    await delay(250);
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(async () => {
    await delay(250);
    setIsLoggedIn(false);
  }, []);

  const contextValue = useMemo<INextAgentContextValue>(
    () => ({
      locationName: isLoggedIn ? mockNextLocations[0].title : null,
      isConnected,
      userConfig,
      setUserConfig,
      login,
      logout,
      serverMessage,
    }),
    [isLoggedIn, isConnected, userConfig, login, logout],
  );

  return (
    <NextAgentContext.Provider value={contextValue}>
      {children}
    </NextAgentContext.Provider>
  );
};
