import * as React from "react";
import { useState } from "react";

import { OpsArticleModal } from ".";
import { useOpsArticles } from "../../../hooks/content/useOpsArticles";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export interface IInnerProps {}

export const Inner: React.FC<IInnerProps> = ({}) => {
  const { opsArticles } = useOpsArticles();
  const [slug, setSlug] = useState<string>(null);
  return (
    <>
      <ul>
        {(opsArticles || []).map((article) => (
          <li key={article.slug} onClick={() => setSlug(article.slug)}>
            {article.title}
          </li>
        ))}
      </ul>
      <div data-test="component">
        <OpsArticleModal articleSlug={slug} onClose={() => setSlug(null)} />
      </div>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <div data-test="OpsArticleModal-scenario-standard">
      <NextAppHandlerWeb>
        <Inner />
      </NextAppHandlerWeb>
    </div>
  );
};
