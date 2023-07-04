import * as React from "react";
import { IMedicalProgram } from "next-shared/src/models/IMedicalProgram";

export interface IMedicalProgramsContextValue {
  medicalPrograms?: IMedicalProgram[];
}

/**
 * Program templates
 */
export const MedicalProgramsContext =
  React.createContext<IMedicalProgramsContextValue>({
    medicalPrograms: undefined,
  });
