import * as React from "react";

import { NewsArticle } from "next-shared/src/models/Article";
import { Listing, Menu } from "../../prefabs/ListingView";
import { operationsPaths } from "../opsRoutes";
import { getNewsArticleCategory } from "../../news/helpers/getNewsItemCategory";
import { ArticleCard } from "../../articles/ArticleCard";
import { useNewsArticles } from "../../../hooks/content/useNewsArticles";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { newsPaths } from "../newsPaths";

export interface INewsArticlesViewProps {}

export const NewsArticlesView: React.FC<INewsArticlesViewProps> = () => {
  const { newsArticles, ...rest } = useNewsArticles();

  return (
    <LoadingBlock {...rest}>
      <Listing
        content={newsArticles}
        getItemCategory={getNewsArticleCategory}
        title="Network news"
        renderItem={(item: NewsArticle) => {
          return <ArticleCard key={item.slug} article={item} />;
        }}
      />
    </LoadingBlock>
  );
};

export interface INewsArticlesSidebarProps {}

export const NewsArticlesSidebar: React.FC<INewsArticlesSidebarProps> = () => {
  const { newsArticles } = useNewsArticles();

  if (!newsArticles) {
    return null;
  }

  return (
    <Menu
      title={"News"}
      content={newsArticles}
      getItemCategory={getNewsArticleCategory}
      baseUrl={operationsPaths.news}
    />
  );
};
