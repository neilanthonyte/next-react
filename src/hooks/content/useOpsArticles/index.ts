import { useMemo } from "react";
import { useQuery } from "react-query";

import { ArticlePreview, OpsArticle } from "next-shared/src/models/Article";

import { useClient } from "../../useClient";

interface IUseOpsArticles {
  opsArticles: ArticlePreview[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<ArticlePreview[]>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useOpsArticles = (): IUseOpsArticles => {
  const client = useClient();

  const {
    data: opsArticles,
    error,
    isLoading,
    refetch,
  } = useQuery<ArticlePreview[], Error>(
    "retrieveOpsArticles",
    () => {
      return client.opsArticles.retrieveOpsArticles();
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseOpsArticles>(
    () => ({
      opsArticles,
      isLoading,
      error,
      refetch,
    }),
    [opsArticles, isLoading, error, refetch],
  );
};

interface IUseOpsArticle {
  opsArticle: OpsArticle;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<OpsArticle>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useOpsArticle = (slug: string): IUseOpsArticle => {
  const client = useClient();

  const {
    data: opsArticle,
    error,
    isLoading,
    refetch,
  } = useQuery<OpsArticle, Error>(
    `retrieveOpsArticle-${slug}`,
    () => {
      if (!slug) {
        return null;
      }
      return client.opsArticles.retrieveOpsArticle(slug);
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseOpsArticle>(
    () => ({
      opsArticle,
      isLoading,
      error,
      refetch,
    }),
    [opsArticle, isLoading, error, refetch],
  );
};
