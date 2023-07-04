import { Action } from "next-shared/src/models/Action";
import { useMemo } from "react";
import { useMutation } from "react-query";

import { useClient } from "../../useClient";

// TODO - merge with interface with the same name
interface ICreateActionOptions {
  createAsFulfilled?: boolean;
}

interface ICreateActionVariables {
  action: Action;
  options?: ICreateActionOptions;
}

interface IUseCreateActionResult {
  createAction: ({
    action,
    options,
  }: ICreateActionVariables) => Promise<Action>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * A useMutation hook for creating Actions
 */
export const useCreateAction = (
  onSuccess?: (data: Action) => void,
  onError?: (error?: Error) => void,
): IUseCreateActionResult => {
  const client = useClient();

  const [createAction, { isLoading, error }] = useMutation<
    Action,
    Error,
    ICreateActionVariables
  >(
    ({ action, options }) => {
      return client.actions.createAction(action, options);
    },
    {
      onSuccess,
      onError,
    },
  );

  return useMemo<IUseCreateActionResult>(() => {
    return {
      createAction,
      error,
      isLoading,
    };
  }, [createAction, error, isLoading]);
};
