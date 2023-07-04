import * as React from "react";
import { useEffect } from "react";

import { autoAppUpdate } from "../../../helpers/autoAppUpdate";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export interface INextAutoUpdateProps {}

/**
 * Checks if the app is ready to update.
 */
export const NextAutoUpdate: React.FC<INextAutoUpdateProps> = () => {
  const { nextPatient, ehrPatient } = useSyncedSessionData();

  useEffect(() => {
    // set up app auto updating
    autoAppUpdate({
      maxTtl: 60 * 60 * 24, // ensure the app is refreshed at least once a day
      // block refreshing if there is a patient using the device
      isAppropriateToRefresh: () => !nextPatient && !ehrPatient,
    });
  }, []);

  return null;
};
