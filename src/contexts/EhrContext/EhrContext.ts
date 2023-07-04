import { createContext } from "react";
import { IEhrPatientSummary } from "next-shared/src/types/IEhrPatientSummary";
import { IEhrUser } from "next-shared/src/types/helixTypes";
import { EEhrKey } from "next-shared/src/types/EEhrKey";

export interface IEhrContextValue {
  underlyingEhr: EEhrKey;
  currentUser?: null | IEhrUser;
  currentPatient?: null | IEhrPatientSummary;
  currentMedicationList?: null | string[];
  medicationCount?: null | number;
  /**
   * Each time an appointment change is made in the current EHR session, this also changes.
   */
  appointmentsRevision?: null | string;
  /**
   * Transcribes the supplied observations into the EHR's clinical notes.
   * @param observations the observations to transcribe.
   * @returns true if the EHR accepts the transcribed notes, false otherwise.
   */
  transcribeObservations: (observations: fhir3.Observation[]) => boolean;
}

/**
 * Provides a facade for the EHR in which the bar is embedded. Some properties are only
 * available in Helix.
 */
export const EhrContext = createContext<IEhrContextValue>({
  underlyingEhr: undefined,
  appointmentsRevision: undefined,
  transcribeObservations: undefined,
});
