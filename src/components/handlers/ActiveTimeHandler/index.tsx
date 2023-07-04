import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import moment from "moment";

import {
  IActiveTimeContextValue,
  ActiveTimeContext,
} from "../../../contexts/ActiveTimeContext";

/**
 * Handler exposing the active time context
 */
export interface IActiveTimeHandlerProps {
  defaultToToday?: boolean;
  defaultToNow?: boolean;
}
export const ActiveTimeHandler: React.FC<IActiveTimeHandlerProps> = ({
  children,
  defaultToToday,
  defaultToNow,
}) => {
  const now = moment();
  // default to today
  const [activeDate, setActiveDate] = useState<string>(
    defaultToToday ? now.format("YYYY-MM-DD") : null,
  );
  const [activeTimeOfDay, setActiveTimeOfDay] = useState<string>(
    defaultToNow ? now.format("HHmm") : null,
  );

  const handleSetActiveDate = useCallback((date: string) => {
    if (date !== null && !moment(date, "YYYY-MM-DD", true).isValid())
      throw new Error(
        "Invalid date string passed to ActiveTimeContext. Please make sure to pass a valid YYYY-MM-DD date string.",
      );
    setActiveDate(date);
  }, []);

  const handleSetActiveTimeOfDay = useCallback((timeOfDay) => {
    if (timeOfDay !== null && !moment(timeOfDay, "HHmm", true).isValid())
      throw new Error(
        "Invalid timeOfDay string passed to ActiveTimeContext. Please make sure to pass a valid HHmm time.",
      );
    setActiveTimeOfDay(timeOfDay);
  }, []);

  const value = useMemo<IActiveTimeContextValue>(
    () => ({
      activeDate,
      activeTimeOfDay,
      setActiveDate: handleSetActiveDate,
      setActiveTimeOfDay: handleSetActiveTimeOfDay,
    }),
    [
      activeDate,
      activeTimeOfDay,
      handleSetActiveDate,
      handleSetActiveTimeOfDay,
    ],
  );
  return (
    <ActiveTimeContext.Provider value={value}>
      {children}
    </ActiveTimeContext.Provider>
  );
};
