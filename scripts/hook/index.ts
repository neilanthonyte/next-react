import { useMemo } from "react";
import { useQuery } from "react-query";

import { useClient } from "../../useClient";

interface IHOOK_NAME {
  foo: IFoo[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<IFoo[]>
}

/**
 * Hook handling fetching of anatomy articles
 */
export const HOOK_NAME = (): IHOOK_NAME => {
  const client = useClient();

  const {
    data: foo,
    error,
    isLoading,
    refetch,
  } = useQuery<IFoo[], Error>(
    "retrieveBar",
    () => {
      return client.foo.retrieveBar();
    },
    { refetchOnMount: false },
  );

  return useMemo<IMyHook>(
    () => ({
      foo,
      error,
      isLoading,
      refetch,
    }),
    [foo, error, isLoading, refetch],
  );
};
