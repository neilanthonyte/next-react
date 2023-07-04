import { FilesResource } from "next-shared/src/models/FilesResource";
import { useMemo } from "react";
import { useQuery } from "react-query";

import { useClient } from "../../useClient";

interface IUseOpsResources {
  opsResources: FilesResource[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<FilesResource[]>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useOpsResources = (): IUseOpsResources => {
  const client = useClient();

  const {
    data: opsResources,
    error,
    isLoading,
    refetch,
  } = useQuery<FilesResource[], Error>(
    "retrieveOpsResources",
    () => {
      return client.opsResources.retrieveOpsResources();
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseOpsResources>(
    () => ({
      opsResources,
      error,
      isLoading,
      refetch,
    }),
    [opsResources, error, isLoading, refetch],
  );
};
