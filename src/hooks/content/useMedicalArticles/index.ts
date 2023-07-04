import { useMemo } from "react";
import { useQuery } from "react-query";

import { ArticlePreview, MedicalArticle } from "next-shared/src/models/Article";

import { useClient } from "../../useClient";

interface IUseMedicalArticles {
  medicalArticles: ArticlePreview[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<ArticlePreview[]>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useMedicalArticles = (): IUseMedicalArticles => {
  const client = useClient();

  const {
    data: medicalArticles,
    error,
    isLoading,
    refetch,
  } = useQuery<ArticlePreview[], Error>(
    "retrieveMedicalArticles",
    () => {
      return client.medicalArticles.retrieveMedicalArticles();
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseMedicalArticles>(
    () => ({
      medicalArticles,
      isLoading,
      error,
      refetch,
    }),
    [medicalArticles, isLoading, error, refetch],
  );
};

interface IUseMedicalArticle {
  medicalArticle: MedicalArticle;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<MedicalArticle>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useMedicalArticle = (slug: string): IUseMedicalArticle => {
  const client = useClient();

  const {
    data: medicalArticle,
    error,
    isLoading,
    refetch,
  } = useQuery<MedicalArticle, Error>(
    `retrieveMedicalArticle-${slug}`,
    () => {
      if (!slug) {
        return null;
      }
      return client.medicalArticles.retrieveMedicalArticle(slug);
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseMedicalArticle>(
    () => ({
      medicalArticle,
      isLoading,
      error,
      refetch,
    }),
    [medicalArticle, isLoading, error, refetch],
  );
};
