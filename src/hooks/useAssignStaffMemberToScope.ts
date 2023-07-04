import { useMutation } from "react-query";
import { useEffect } from "react";

import { NextClient } from "../client/NextClient";
import { useClient } from "../hooks/useClient";
import { useRequiredContext } from "../hooks/useRequiredContext";
import { ErrorResolverContext } from "../contexts/ErrorResolver";
import { Scope } from "next-shared/src/models/Scope";

export interface IAssignStaffMemberToScope {
  assignStaffMember: () => Promise<Scope>;
  assignStaffMemberIsLoading: boolean;
  assignStaffMemberIsError: boolean;
}

/**
 * Place a staffMember into a room.
 */
export const useAssignStaffMemberToScope = (
  scopeId: string,
  staffMemberId: string,
): IAssignStaffMemberToScope => {
  const client = useClient();
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const [mutate, { isLoading, isError, error }] = useMutation(() =>
    client.scopes.setScopeUsers(scopeId, { staffMemberId }),
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
    assignStaffMember: mutate,
    assignStaffMemberIsLoading: isLoading,
    assignStaffMemberIsError: isError,
  };
};
