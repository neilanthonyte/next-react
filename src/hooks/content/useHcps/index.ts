import { Hcp } from "next-shared/src/models/Hcp";
import { useMemo } from "react";
import { useQuery } from "react-query";

import { useClient } from "../../useClient";

interface IUseHcps {
  hcps: Hcp[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<Hcp[]>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useHcps = (): IUseHcps => {
  const client = useClient();

  const {
    data: hcps,
    error: error,
    isLoading: isLoading,
    refetch: refetch,
  } = useQuery<Hcp[], Error>(
    "retrieveAllHcps",
    () => {
      return client.hcps.retrieveAllHcps();
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseHcps>(
    () => ({
      hcps,
      error,
      isLoading,
      refetch,
    }),
    [hcps, error, isLoading, refetch],
  );
};
