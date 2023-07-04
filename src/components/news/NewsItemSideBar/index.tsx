import { NewsArticle } from "next-shared/src/models/Article";
import * as React from "react";
import { useNewsArticle } from "../../../hooks/content/useNewsArticles";

import { ArticleSideBar } from "../../articles/ArticleSideBar";
import { operationsPaths } from "../../views/opsRoutes";

export interface INewsArticleSideBarProps {}

export const NewsArticleSideBar: React.FC<INewsArticleSideBarProps> = ({}) => {
  // TODO
  const slug: string = null;
  const { newsArticle } = useNewsArticle(slug);

  if (!newsArticle) {
    return null;
  }
  return (
    <ArticleSideBar article={newsArticle} backPath={operationsPaths.news} />
  );
};
