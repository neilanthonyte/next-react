import { Action } from "next-shared/src/models/Action";
import { useMemo } from "react";
import { useMutation } from "react-query";

import { useClient } from "../../useClient";

interface IUseRemoveActionResult {
  removeAction: (action: Action) => Promise<Action>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to handle removing an action
 */
export const useRemoveAction = () => {
  const client = useClient();
  const [removeAction, { isLoading, error }] = useMutation<
    Action,
    Error | null,
    Action
  >(async (action) => {
    await client.actions.deleteAction(action);
    return action;
  });

  return useMemo<IUseRemoveActionResult>(() => {
    return {
      removeAction,
      error,
      isLoading,
    };
  }, [removeAction, error, isLoading]);
};
