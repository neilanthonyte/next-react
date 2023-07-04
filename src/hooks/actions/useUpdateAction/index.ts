import { Action } from "next-shared/src/models/Action";
import { useMemo } from "react";
import { useMutation } from "react-query";

import { useClient } from "../../useClient";

interface IUseUpdateAction {
  updateAction: (updatedAction: Action) => Promise<Action>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook handling the update of an action
 */
export const useUpdateAction = (): IUseUpdateAction => {
  const client = useClient();

  const [updateAction, { isLoading, error }] = useMutation<
    Action,
    Error,
    Action
  >((updatedAction: Action) => client.actions.updateAction(updatedAction));

  return useMemo<IUseUpdateAction>(
    () => ({
      updateAction,
      error,
      isLoading,
    }),
    [updateAction, error, isLoading],
  );
};
