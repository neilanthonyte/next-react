import { IPatientAppointmentReminder } from "next-shared/src/types/IPatientAppointmentReminder";

export interface IPatientAppointmentRemindersModule {
  /**
   * Fetch the patient's appointment reminders.
   */
  getPatientAppointmentReminders(
    patientId: string,
  ): Promise<IPatientAppointmentReminder[]>;
}
