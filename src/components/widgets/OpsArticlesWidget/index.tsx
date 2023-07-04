import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";

import { Widget } from "../../generic/Widget";
import { ArticleCard } from "../../articles/ArticleCard";
import { VStack } from "../../structure/VStack";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { useOpsArticles } from "../../../hooks/content/useOpsArticles";

export const OpsArticlesWidget: React.FC = () => {
  const { opsArticles, isLoading, error, refetch } = useOpsArticles();

  const latestArticles = useMemo(() => {
    if (!opsArticles) {
      return null;
    }
    return _.sortBy(opsArticles, (a) => -a.postDate)
      .splice(0, 2)
      .map((a) => {
        const article = cloneModelObject(a);
        article.url = `ops-articles/${a.slug}`;
        return article;
      });
  }, [opsArticles, isLoading]);

  return (
    <Widget label="Latest guides" loading={isLoading} toMore={"/ops-articles"}>
      {!!error && <ErrorPlaceholder retry={refetch} />}
      <VStack>
        {(latestArticles || []).map((a) => (
          <ArticleCard key={a.slug} article={a} variant="wide" />
        ))}
      </VStack>
    </Widget>
  );
};
