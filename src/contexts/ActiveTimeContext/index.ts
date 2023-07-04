import * as React from "react";

export interface IActiveTimeContextValue {
  // formatted as YYYY-MM-DD
  activeDate: string | null;
  setActiveDate: (newDate: string) => void;
  // 4 digits representation of 24hr e.g. "2030" for 8:30PM
  activeTimeOfDay: string | null;
  setActiveTimeOfDay: (newTimeSlot: string) => void;
}

export const ActiveTimeContext = React.createContext<IActiveTimeContextValue>({
  activeDate: undefined,
  setActiveDate: undefined,
  activeTimeOfDay: undefined,
  setActiveTimeOfDay: undefined,
});
