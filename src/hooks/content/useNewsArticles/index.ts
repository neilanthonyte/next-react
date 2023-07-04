import { useMemo } from "react";
import { useQuery } from "react-query";

import { ArticlePreview, NewsArticle } from "next-shared/src/models/Article";

import { useClient } from "../../useClient";

interface IUseNewsArticles {
  newsArticles: ArticlePreview[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<ArticlePreview[]>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useNewsArticles = (): IUseNewsArticles => {
  const client = useClient();

  const {
    data: newsArticles,
    error,
    isLoading,
    refetch,
  } = useQuery<ArticlePreview[], Error>(
    "retrieveNewsArticles",
    () => {
      return client.news.retrieveNewsArticles();
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseNewsArticles>(
    () => ({
      newsArticles,
      isLoading,
      error,
      refetch,
    }),
    [newsArticles, isLoading, error, refetch],
  );
};

interface IUseNewsArticle {
  newsArticle: NewsArticle;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<NewsArticle>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useNewsArticle = (slug: string): IUseNewsArticle => {
  const client = useClient();

  const {
    data: newsArticle,
    error,
    isLoading,
    refetch,
  } = useQuery<NewsArticle, Error>(
    `retrieveNewsArticle-${slug}`,
    () => {
      if (!slug) {
        return null;
      }
      return client.news.retrieveNewsArticle(slug);
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseNewsArticle>(
    () => ({
      newsArticle,
      isLoading,
      error,
      refetch,
    }),
    [newsArticle, isLoading, error, refetch],
  );
};
