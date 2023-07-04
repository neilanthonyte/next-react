import * as React from "react";
import { useHistory, useParams } from "react-router-dom";

import { PendingContent } from "../../structure/PendingContent";
import { ArticleSideBar } from "../../articles/ArticleSideBar";
import { ArticleComponent } from "../../articles/Article";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { useOpsArticle } from "../../../hooks/content/useOpsArticles";
import { LoadingBlock } from "../../structure/LoadingBlock";

/**
 * Displays the contents of the active medical article.
 */
export const OpsArticleView: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { opsArticle, ...rest } = useOpsArticle(slug);

  return (
    <LoadingBlock {...rest}>
      {!!opsArticle && <ArticleComponent article={opsArticle} />}
    </LoadingBlock>
  );
};

/**
 * Side bar for the active medical article.
 */
export const OpsArticleSideBar: React.FC = () => {
  // TODO cannot use, as its not within the route
  // const { slug } = useParams<{ slug: string }>();
  // HACK assumes URL format
  const history = useHistory();
  const parts = history.location.pathname.replace(/^\//, "").split("/");
  const slug = parts[1];

  const { opsArticle } = useOpsArticle(slug);

  return opsArticle ? (
    <ArticleSideBar article={opsArticle} backPath="/ops-articles" />
  ) : null;
};
