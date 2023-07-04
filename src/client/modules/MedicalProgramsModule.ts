import { IMedicalProgram } from "next-shared/src/models/IMedicalProgram";

export interface IMedicalProgramsModule {
  retrieveMedicalPrograms(): Promise<IMedicalProgram[]>;
}
