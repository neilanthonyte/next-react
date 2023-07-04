import { useMutation } from "react-query";

import { NextClient } from "../client/NextClient";
import { useClient } from "../hooks/useClient";
import { Scope } from "next-shared/src/models/Scope";

export interface ICreateRoom {
  createRoom: (label: string) => Promise<Scope>;
  createRoomIsLoading: boolean;
  createRoomIsError: boolean;
}

/**
 * Create a Next scope
 */
export const useCreateRoom = (): ICreateRoom => {
  const client = useClient();

  const [mutate, { isLoading, isError, error }] = useMutation(
    (label: string) => {
      const newScope = new Scope();
      newScope.label = label;
      newScope.type = "room";
      return client.scopes.createScope(newScope);
    },
  );

  return {
    createRoom: mutate,
    createRoomIsLoading: isLoading,
    createRoomIsError: isError,
  };
};
