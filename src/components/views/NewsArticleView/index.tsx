import * as React from "react";
import { useParams } from "react-router";

import { PendingContent } from "../../structure/PendingContent";
import { ArticleComponent } from "../../articles/Article";
import { useNewsArticle } from "../../../hooks/content/useNewsArticles";
import { LoadingBlock } from "../../structure/LoadingBlock";

export interface INewsArticleViewRoute {
  slug: string;
}

export interface INewsArticleViewProps {}

export const NewsArticleView: React.FC<INewsArticleViewProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const { newsArticle, ...rest } = useNewsArticle(slug);

  return (
    <LoadingBlock {...rest}>
      {!!newsArticle && <ArticleComponent article={newsArticle} />}
    </LoadingBlock>
  );
};
