import { useMutation } from "react-query";
import { useEffect } from "react";

import { Scope } from "next-shared/src/models/Scope";

import { useClient } from "../hooks/useClient";
import { useRequiredContext } from "../hooks/useRequiredContext";
import { ErrorResolverContext } from "../contexts/ErrorResolver";

export interface IAssignPatientToScope {
  assignPatient: () => Promise<Scope>;
  assignPatientIsLoading: boolean;
  assignPatientIsError: boolean;
}

/**
 * Place an ehr patient into a room.
 */
export const useAssignPatientToScope = (
  scopeId: string,
  ehrPatientId: string,
): IAssignPatientToScope => {
  const client = useClient();
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const [mutate, { isLoading, isError, error }] = useMutation(() =>
    client.scopes.setScopeUsers(scopeId, { ehrPatientId }),
  );

  useEffect(() => {
    if (!error) {
      return;
    }
    resolveError({
      title: "Unable to update room, please try again",
      approach: "modal",
    });
  }, [error]);

  return {
    assignPatient: mutate,
    assignPatientIsLoading: isLoading,
    assignPatientIsError: isError,
  };
};
