import { injectable } from "inversify";

import { IPatientAppointmentRemindersModule } from "../modules/PatientAppointmentRemindersModule";
import { IPatientAppointmentReminder } from "next-shared/src/types/IPatientAppointmentReminder";

@injectable()
export class MockPatientAppointmentRemindersModule
  implements IPatientAppointmentRemindersModule
{
  public async getPatientAppointmentReminders(
    patientId: string,
  ): Promise<IPatientAppointmentReminder[]> {
    return [];
  }
}
