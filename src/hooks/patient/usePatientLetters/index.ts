import { useMemo } from "react";
import { useQuery } from "react-query";

import { PatientLetter } from "next-shared/src/models/PatientLetter";
import { sortByReleaseDate } from "next-react/src/helpers/sortByReleaseDate";
import { DOCUMENT_CATEGORY_LETTER } from "next-shared/src/models/Action";

import { useClient } from "../../useClient";
import { usePatientActions } from "../../actions/usePatientActions";
import { IPatientRecordQuery } from "../../../types/TPatientRecord";

export interface IFetchPatientLetters<T = PatientLetter[]>
  extends IPatientRecordQuery<T> {
  patientLetters: T;
}

/**
 * Return all letters sorted by their released date
 * for a patient.
 */
export const usePatientLetters = (patientId: string): IFetchPatientLetters => {
  const client = useClient();
  const { documentActions } = usePatientActions(patientId);

  const {
    data: patientLetters,
    error,
    isLoading,
    refetch,
  } = useQuery<PatientLetter[], Error>(
    ["retrievePatientLetters", patientId],
    () => {
      return client.patients.retrievePatientLetters(patientId);
    },
    {
      enabled: !!patientId,
    },
  );

  const sortedLetters = useMemo(() => {
    if (!patientLetters || !Array.isArray(patientLetters)) return null;
    if (!documentActions) {
      return patientLetters.sort(sortByReleaseDate);
    }
    // loop through patient letters and add released date if a matching action exist
    const patientLettersWithReleaseStatus = patientLetters.map((letter) => {
      const matchingAction = documentActions.find((action) => {
        return (
          action.resource.category === DOCUMENT_CATEGORY_LETTER &&
          action.resource.documentId === letter.id.toString()
        );
      });
      letter.released = matchingAction?.createdAt || false;
      return letter;
    });

    return patientLettersWithReleaseStatus.sort(sortByReleaseDate);
  }, [patientLetters, documentActions]);

  return useMemo(
    () => ({
      patientLetters: sortedLetters,
      refetch,
      isLoading,
      error,
    }),
    [sortedLetters, refetch, isLoading, error],
  );
};
