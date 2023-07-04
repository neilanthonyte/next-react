import { useMemo } from "react";
import { useMutation } from "react-query";

import {
  ErrorResolverContext,
  TErrorHandlingApproach,
} from "../contexts/ErrorResolver";
import { useRequiredContext } from "../hooks/useRequiredContext";
import { useClient } from "../hooks/useClient";

export interface ILogoutUser {
  isLoading: boolean;
  error: Error | null;
  mutate: () => Promise<void>;
}

export interface IUseLogoutUserProps {
  onSuccess?: () => any;
  onError?: (error: Error) => any;
  onSettled?: (args?: any) => any;
  errorApproach?: TErrorHandlingApproach;
}

export const useLogoutUser = (
  {
    onSuccess,
    onError,
    onSettled,
    errorApproach = "modal",
  }: IUseLogoutUserProps = { errorApproach: "modal" },
): ILogoutUser => {
  const client = useClient();
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const defaultErrorHandler = (error: Error) => {
    console.error(error);
    resolveError({
      title: "Unable to log out",
      approach: errorApproach,
      retry: () => mutate(),
    });
  };

  const [mutate, { isLoading, error }] = useMutation(
    () => {
      return client.auth.logout();
    },
    {
      onSuccess,
      onError: onError || defaultErrorHandler,
      onSettled,
    },
  );

  return useMemo(
    () => ({
      isLoading,
      error,
      mutate,
    }),
    [isLoading, error, mutate],
  );
};
