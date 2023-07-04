import { useMemo } from "react";

import {
  Action,
  ArticleAction,
  DocumentAction,
  InstructionAction,
  MedicationAction,
} from "next-shared/src/models/Action";
import { useSyncedActions } from "../useSyncedActions";
import { IRetrieveActionsOptions } from "next-shared/src/types/IRetrieveActionsOptions";

export interface IUsePatientActions {
  allActions: Action[];
  articleActions: ArticleAction[];
  instructionActions: InstructionAction[];
  medicationActions: MedicationAction[];
  documentActions: DocumentAction[];
  isLoading: boolean;
  error: Error;
}

/**
 * Fetches the actions for the current patient, complete with any related resources
 */
export const usePatientActions = (
  patientId: string,
  options?: IRetrieveActionsOptions,
): IUsePatientActions => {
  const {
    actions,
    isLoading,
    error,
    // refetch: actionsRefetch,
  } = useSyncedActions(patientId, options);

  const articleActions = useMemo(() => {
    if (isLoading || !Array.isArray(actions)) {
      return;
    }
    return actions.filter((a) => a.type === "article") as ArticleAction[];
  }, [actions, isLoading]);

  const instructionActions = useMemo(() => {
    if (!Array.isArray(actions) || isLoading) {
      return;
    }
    return actions.filter((a) => a.type === "instruction");
  }, [actions, isLoading]) as InstructionAction[];

  const medicationActions = useMemo(() => {
    if (!Array.isArray(actions) || isLoading) {
      return;
    }
    return actions.filter((a) => a.type === "medication");
  }, [actions, isLoading]) as MedicationAction[];

  const documentActions = useMemo(() => {
    if (!Array.isArray(actions) || isLoading) {
      return;
    }
    return actions.filter((a) => a.type === "document");
  }, [actions, isLoading]) as DocumentAction[];

  return {
    allActions: actions,
    articleActions,
    instructionActions,
    medicationActions,
    documentActions,
    isLoading,
    error,
  };
};
