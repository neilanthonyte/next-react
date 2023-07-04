import { useMemo } from "react";
import { useQuery } from "react-query";

import {
  ArticlePreview,
  BlogArticle,
  BlogArticlePreview,
} from "next-shared/src/models/Article";
import { TBlogTarget, IBlogFilter } from "next-shared/src/types/blog";

import { useClient } from "../../useClient";

interface IUseBlogArticles {
  blogArticles: BlogArticlePreview[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<BlogArticlePreview[]>;
}

/**
 * Hook handling fetching of blog articles
 *
 * TODO support for the various types of visibility
 */
export const useBlogArticles = (
  filter: IBlogFilter = {},
  enabled: boolean = true,
): IUseBlogArticles => {
  const client = useClient();

  const {
    data: blogArticles,
    error,
    isLoading,
    refetch,
  } = useQuery<BlogArticlePreview[], Error>(
    ["retrieveBlogArticles", ...Object.keys(filter)],
    () => {
      return client.blog.retrieveBlogArticles(filter);
    },
    {
      // allow so we have a refresh between navigation - required by the manager content section
      refetchOnMount: true,
      // if locationSlug is in the array, we assume it will be set
      enabled,
    },
  );

  return useMemo<IUseBlogArticles>(
    () => ({
      blogArticles,
      isLoading,
      error,
      refetch,
    }),
    [blogArticles, isLoading, error, refetch],
  );
};

interface IUseBlogArticle {
  blogArticle: BlogArticle;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<BlogArticle>;
}

/**
 * Hook handling fetching a single blog article.
 */
export const useBlogArticle = (slug: string): IUseBlogArticle => {
  const client = useClient();

  const {
    data: blogArticle,
    error,
    isLoading,
    refetch,
  } = useQuery<BlogArticle, Error>(
    `retrieveBlogArticle-${slug}`,
    () => {
      if (!slug) {
        return null;
      }
      return client.blog.retrieveBlogArticle(slug);
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseBlogArticle>(
    () => ({
      blogArticle,
      isLoading,
      error,
      refetch,
    }),
    [blogArticle, isLoading, error, refetch],
  );
};
