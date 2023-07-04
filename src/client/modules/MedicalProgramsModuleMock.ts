import { injectable } from "inversify";

import { IMedicalProgram } from "next-shared/src/models/IMedicalProgram";
import { IMedicalProgramsModule } from "../modules/MedicalProgramsModule";

import { mockGoals } from "next-shared/src/mockData/mockGoals";

@injectable()
export class MockMedicalProgramsModule implements IMedicalProgramsModule {
  public async retrieveMedicalPrograms(): Promise<IMedicalProgram[]> {
    return [
      {
        name: "Hypertension",
        goals: mockGoals,
        articles: ["blood-pressure-hypertension", "physical-activity"],
      },
    ];
  }
}
