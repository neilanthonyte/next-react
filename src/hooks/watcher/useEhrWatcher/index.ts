import { useState, useCallback, useEffect, useMemo } from "react";

import { SimpleEventEmitter } from "next-shared/src/lib/SimpleEventEmitter";
import { IEhrPatientSummary } from "next-shared/src/types/IEhrPatientSummary";
import {
  EVENT_CLOSE_PATIENT,
  EVENT_LOGIN,
  EVENT_LOGOUT,
  EVENT_OPEN_PATIENT,
  EVENT_MEDICATION_CHANGED,
} from "next-shared/src/types/watcherEventNames";
import { IEhrUser } from "next-shared/src/types/helixTypes";

export interface IEhrLocalDetails {
  localPatient: IEhrPatientSummary;
  localUser: IEhrUser;
  medicationCount: number;
}

export interface IHelixMedicationDetails {
  medicationCount: number;
  patientId: string;
}

/**
 * Maintains the patient and user passed back from the Helix
 */
export const useEhrWatcher = (
  ehrWatcher?: SimpleEventEmitter,
): IEhrLocalDetails => {
  const [helixPatient, setHelixPatient] = useState<null | IEhrPatientSummary>(
    null,
  );
  const [helixUser, setHelixUser] = useState<IEhrUser>();
  const [patientMedicationCount, setPatientMedicationCount] =
    useState<number>(0);

  const clearPatientSummary = useCallback(() => setHelixPatient(null), []);
  const clearHelixUser = useCallback(() => setHelixUser(null), []);

  const handleMedicationCount = ({
    medicationCount,
  }: IHelixMedicationDetails) => {
    setPatientMedicationCount(medicationCount);
  };

  useEffect(() => {
    if (!ehrWatcher) {
      return;
    }

    // subscribe to events on mount
    ehrWatcher.on(EVENT_OPEN_PATIENT, setHelixPatient);
    ehrWatcher.on(EVENT_CLOSE_PATIENT, clearPatientSummary);
    ehrWatcher.on(EVENT_LOGIN, setHelixUser);
    ehrWatcher.on(EVENT_LOGOUT, clearHelixUser);
    ehrWatcher.on(EVENT_MEDICATION_CHANGED, handleMedicationCount);

    return () => {
      // unsubscribe
      ehrWatcher.off(EVENT_OPEN_PATIENT, setHelixPatient);
      ehrWatcher.off(EVENT_CLOSE_PATIENT, clearPatientSummary);
      ehrWatcher.off(EVENT_LOGIN, setHelixUser);
      ehrWatcher.off(EVENT_LOGOUT, clearHelixUser);
      ehrWatcher.off(EVENT_MEDICATION_CHANGED, handleMedicationCount);
    };
  }, []);

  return useMemo(
    () => ({
      localPatient: helixPatient,
      localUser: helixUser,
      medicationCount: patientMedicationCount,
    }),
    [helixUser, helixPatient, patientMedicationCount],
  );
};
