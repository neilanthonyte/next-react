import { useMemo } from "react";
import { useMutation } from "react-query";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { Action, ArticleAction } from "next-shared/src/models/Action";
import { ArticlePreview } from "next-shared/src/models/Article";

import { useClient } from "../../useClient";

interface ICreateArticleOptions {
  patientId: string;
  authorId: string;
  article: ArticlePreview;
}

interface IUseCreateFulfilledArticleAction {
  createFulfilledArticleAction: (
    options: ICreateArticleOptions,
  ) => Promise<Action>;
  isLoading: boolean;
  error: Error;
}

/**
 * Hook exposing method to create an article action with a flag to also automatically fulfil it
 * used by patients when reading an article on their own (not prescribed by HCP)
 */
export const useCreateFulfilledArticleAction =
  (): IUseCreateFulfilledArticleAction => {
    const client = useClient();

    const [createFulfilledArticleAction, { isLoading, error }] = useMutation<
      Action,
      Error,
      ICreateArticleOptions
    >(({ article, patientId, authorId }) => {
      if (!patientId) {
        console.warn("no active patient");
        return;
      }
      if (!authorId) {
        console.warn("expecting an author ID to create an action");
        return;
      }
      const action = ArticleAction.unserialize({
        type: "article",
        title: article.title,
        externalId: article.slug,
        subjectId: patientId,
        authorId: authorId,
        ownerId: patientId,
        occurrences: [
          {
            type: "single",
            time: currentUnixTimestamp(),
          },
        ],
        data: article,
      });
      return client.actions.createAction(action, { createAsFulfilled: true });
    });

    return useMemo<IUseCreateFulfilledArticleAction>(
      () => ({
        createFulfilledArticleAction,
        error,
        isLoading,
      }),
      [createFulfilledArticleAction, error, isLoading],
    );
  };
