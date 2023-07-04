import { useMemo } from "react";
import { useMutation, useQuery } from "react-query";

import { unixTimestamp } from "next-shared/src/types/dateTypes";

import { useClient } from "../../useClient";
import { IPatientRecordQuery } from "../../../types/TPatientRecord";

export interface ILastTourTime<T = unixTimestamp>
  extends IPatientRecordQuery<T> {
  tourLastSeen: T;
  updateTourLastSeen: (lastSeen: T) => void;
}

// in the app, we want to do hold some checks (tours, suggestions, tutorials) based on some flags (e.g. passed biometric/pin)
// TODO maybe hold the session loading until those are satisfied in the future, requires signin/signup flows refactor
interface ILastTourTimeOptions {
  enabled?: boolean;
}

/**
 * Hook handling fetch and update of the given patient last tour seen flag
 */
export const useLastTourTime = (
  patientId: string,
  options: ILastTourTimeOptions = { enabled: true },
): ILastTourTime => {
  const client = useClient();

  const {
    data: tourLastSeen,
    isLoading,
    error,
    refetch,
    clear,
  } = useQuery<unixTimestamp, Error>(
    ["retrieveTourLastSeen", patientId],
    () => client.patients.retrieveTourLastSeen(patientId),
    {
      enabled: options.enabled && !!patientId,
      onError: console.error,
    },
  );

  const [updateTourLastSeen] = useMutation<void, Error, unixTimestamp>(
    (timestamp: unixTimestamp) =>
      client.patients.touchTourLastSeen(patientId, timestamp),
    {
      onError: (err) => {
        console.error(err);
      },
      onSuccess: () => {
        // clear instead of refetch as the tourLastSeen will be instantly reset to undefined and avoid updates check to be triggered with stale data while refetching
        clear();
      },
    },
  );

  return useMemo(
    () => ({
      tourLastSeen,
      updateTourLastSeen,
      isLoading,
      error,
      refetch,
    }),
    [tourLastSeen, updateTourLastSeen, isLoading, error, refetch],
  );
};
