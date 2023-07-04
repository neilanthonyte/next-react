import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { Widget } from "../../generic/Widget";
import { VStack } from "../../structure/VStack";
import { ArticleCard } from "../../articles/ArticleCard";
import { useNewsArticles } from "../../../hooks/content/useNewsArticles";

export const NewsArticlesWidget: React.FC = () => {
  const { newsArticles } = useNewsArticles();

  const latestNews = useMemo(() => {
    if (!newsArticles) {
      return null;
    }
    return _.first(_.sortBy(newsArticles, (a) => -a.postDate));
  }, [newsArticles]);

  return (
    <Widget label="Latest news" loading={!latestNews} toMore={"/news"}>
      <VStack>
        <ArticleCard article={latestNews} />
      </VStack>
    </Widget>
  );
};
