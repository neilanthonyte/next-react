import { useMutation } from "react-query";
import { useEffect } from "react";

import { NextClient } from "../client/NextClient";
import { useClient } from "../hooks/useClient";
import { useRequiredContext } from "../hooks/useRequiredContext";
import { ErrorResolverContext } from "../contexts/ErrorResolver";
import { Scope } from "next-shared/src/models/Scope";

export interface IRemoveStaffMemberFromScope {
  removeStaffMember: () => Promise<Scope>;
  removeStaffMemberIsLoading: boolean;
  removeStaffMemberIsError: boolean;
}

/**
 * Remove a staff member from the scope
 */
export const useRemoveStaffMemberFromScope = (
  scopeId: string,
): IRemoveStaffMemberFromScope => {
  const client = useClient();
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const [mutate, { isLoading, isError, error }] = useMutation(() =>
    client.scopes.setScopeUsers(scopeId, { staffMemberId: null }),
  );

  useEffect(() => {
    if (!error) {
      return;
    }
    resolveError({
      title: "The staffMember cannot be removed at this time",
      approach: "modal",
    });
  }, [error]);

  return {
    removeStaffMember: mutate,
    removeStaffMemberIsLoading: isLoading,
    removeStaffMemberIsError: isError,
  };
};
