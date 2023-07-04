import { useMemo } from "react";
import { useQuery } from "react-query";

import { ICmsAnatomy } from "next-shared/src/types/ICmsAnatomy";
import { useClient } from "../../useClient";

interface IAnatomies {
  anatomies: ICmsAnatomy[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<ICmsAnatomy[]>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useAnatomies = (): IAnatomies => {
  const client = useClient();

  const {
    data: anatomies,
    error,
    isLoading,
    refetch,
  } = useQuery<ICmsAnatomy[], Error>(
    "retrieveAnatomies",
    () => {
      return client.anatomies.retrieveAnatomies();
    },
    { refetchOnMount: false },
  );

  return useMemo<IAnatomies>(
    () => ({
      anatomies,
      error,
      isLoading,
      refetch,
    }),
    [anatomies, error, isLoading, refetch],
  );
};
