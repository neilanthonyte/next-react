import * as React from "react";
import { IPatientAppointmentReminder } from "next-shared/src/types/IPatientAppointmentReminder";

export interface IPatientAppointmentRemindersContextValue {
  appointmentReminders: IPatientAppointmentReminder[];
}

/**
 * The patient's goals
 */
export const PatientAppointmentRemindersContext =
  React.createContext<IPatientAppointmentRemindersContextValue>({
    appointmentReminders: undefined,
  });
