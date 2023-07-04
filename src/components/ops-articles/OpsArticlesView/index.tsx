import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { ArticlePreview } from "next-shared/src/models/Article";

import { Listing, Menu } from "../../prefabs/ListingView";
import { ArticleCard } from "../../articles/ArticleCard";
import { getArticleCategory } from "../../../helpers/getArticleCategory";
import { getItemCategory } from "../../../helpers/getItemCategory";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { operationsPaths } from "../../views/opsRoutes";
import { useOpsArticles } from "../../../hooks/content/useOpsArticles";

const sort = (items: ArticlePreview[]) =>
  items ? _.sortBy(items, ["category", "title"]) : null;

export const OpsArticlesView: React.FC = () => {
  const { opsArticles, error, refetch } = useOpsArticles();

  const sortedArticles = useMemo(() => {
    return sort(opsArticles);
  }, [opsArticles]);

  if (error) {
    return <ErrorPlaceholder retry={refetch} />;
  }

  return (
    <Listing
      content={sortedArticles}
      getItemCategory={getArticleCategory}
      showSearch={true}
      renderItem={(n) => (
        <ArticleCard
          key={n.slug}
          article={{ ...n, url: `ops-articles/${n.slug}` }}
        />
      )}
    />
  );
};

export const OpsArticlesSideBar: React.FC = () => {
  const { opsArticles } = useOpsArticles();

  return (
    <Menu
      title="Handbook"
      content={sort(opsArticles)}
      getItemCategory={getItemCategory}
      baseUrl={operationsPaths.opsArticles}
    />
  );
};
