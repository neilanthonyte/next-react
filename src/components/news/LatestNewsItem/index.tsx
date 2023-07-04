import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { ICardProps } from "../../structure/Card";
import { ArticleCard } from "../../articles/ArticleCard";
import { NewsArticle } from "next-shared/src/models/Article";
import { useNewsArticles } from "../../../hooks/content/useNewsArticles";

export interface ILatestNewsArticleProps extends ICardProps {}

export const LatestNewsArticle: React.FC<ILatestNewsArticleProps> = (props) => {
  const { newsArticles } = useNewsArticles();

  const latestNewsArticle = useMemo(() => {
    if (newsArticles === null) {
      return null;
    }
    return _.maxBy(newsArticles, "postDate");
  }, [newsArticles]);

  return latestNewsArticle ? (
    <ArticleCard article={latestNewsArticle} {...props} />
  ) : null;
};
