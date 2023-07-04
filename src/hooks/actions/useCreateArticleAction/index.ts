import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { Action, ArticleAction } from "next-shared/src/models/Action";
import { ArticlePreview } from "next-shared/src/models/Article";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { useMemo } from "react";
import { useMutation } from "react-query";

import { useClient } from "../../useClient";

interface ICreateArticleOptions {
  patientId: string;
  authorId: string;
  article: ArticlePreview;
  dueAt?: unixTimestamp;
}

interface IUseCreateArticleAction {
  createArticleAction: (options: ICreateArticleOptions) => Promise<Action>;
  isLoading: boolean;
  error: Error;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useCreateArticleAction = (): IUseCreateArticleAction => {
  const client = useClient();

  const [createArticleAction, { isLoading, error }] = useMutation<
    Action,
    Error,
    ICreateArticleOptions
  >(({ article, patientId, authorId, dueAt }) => {
    if (!patientId) {
      console.warn("no active patient");
      return;
    }
    if (!authorId) {
      console.warn("expecting an author ID to create an action");
      return;
    }

    dueAt = dueAt || currentUnixTimestamp();
    // TODO: Use the correct class type
    const action = ArticleAction.unserialize({
      type: "article",
      title: article.title, //"You have an article to read",
      externalId: article.slug,
      subjectId: patientId,
      authorId: authorId,
      ownerId: patientId,
      activeAt: dueAt,
      occurrences: [
        {
          // due now
          type: "single",
          time: dueAt,
        },
      ],
      data: article,
    });
    return client.actions.createAction(action);
  });

  return useMemo<IUseCreateArticleAction>(
    () => ({
      createArticleAction,
      error,
      isLoading,
    }),
    [createArticleAction, error, isLoading],
  );
};
