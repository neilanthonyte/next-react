import { useMemo } from "react";

import { Action } from "next-shared/src/models/Action";
import { IRetrieveActionsOptions } from "next-shared/src/types/IRetrieveActionsOptions";

import { useSyncedActions } from "../useSyncedActions";

interface IUseAction {
  actions: Action[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook handling fetching of Actions of various types.
 * For known actions relating to a patient, use "usePatientActions" instead.
 * @param subjectId - The subject that the actions relates to. This is often the Patient ID
 */
export const useActions = (
  /** The ID of the person/entity owning these actions */
  subjectId: string,
  options?: IRetrieveActionsOptions,
): IUseAction => {
  const { actions, isLoading, error } = useSyncedActions(subjectId, options);

  return useMemo<IUseAction>(
    () => ({
      actions,
      error,
      isLoading,
    }),
    [actions, error, isLoading],
  );
};
