import { useMutation } from "react-query";

import { NextClient } from "../client/NextClient";
import { useClient } from "../hooks/useClient";
import { App } from "next-shared/src/models/App";

export interface ICreateCompanion {
  createCompanion: (label: string) => Promise<App>;
  createCompanionIsLoading: boolean;
  createCompanionIsError: boolean;
}

/**
 * Create a Next companion - a special type of scope.
 */
export const useCreateCompanion = (): ICreateCompanion => {
  const client = useClient();

  const [mutate, { isLoading, isError, error }] = useMutation(
    (label: string) => {
      return client.apps.createCompanion(label);
    },
  );

  return {
    createCompanion: mutate,
    createCompanionIsLoading: isLoading,
    createCompanionIsError: isError,
  };
};
