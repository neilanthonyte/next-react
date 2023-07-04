import { useMutation } from "react-query";
import { useEffect } from "react";

import { useClient } from "../hooks/useClient";
import { useRequiredContext } from "../hooks/useRequiredContext";
import { ErrorResolverContext } from "../contexts/ErrorResolver";
import { Scope } from "next-shared/src/models/Scope";

export interface IRemovePatientFromScope {
  removePatient: () => Promise<Scope>;
  removePatientIsLoading: boolean;
  removePatientIsError: boolean;
}

/**
 * Remove an ehr patient from a room.
 */
export const useRemovePatientFromScope = (
  scopeId: string,
): IRemovePatientFromScope => {
  const client = useClient();
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const [mutate, { isLoading, isError, error }] = useMutation(() =>
    client.scopes.setScopeUsers(scopeId, { ehrPatientId: null }),
  );

  useEffect(() => {
    if (!error) {
      return;
    }
    resolveError({
      title: "The patient cannot be removed at this time",
      approach: "modal",
    });
  }, [error]);

  return {
    removePatient: mutate,
    removePatientIsLoading: isLoading,
    removePatientIsError: isError,
  };
};
