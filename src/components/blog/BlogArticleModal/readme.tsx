import * as React from "react";
import { useState } from "react";

import { BlogArticleModal } from ".";
import { useBlogArticles } from "../../../hooks/content/useBlogArticles";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export interface IInnerProps {}

export const Inner: React.FC<IInnerProps> = ({}) => {
  const { blogArticles } = useBlogArticles();
  const [slug, setSlug] = useState<string>(null);
  return (
    <>
      <ul>
        {(blogArticles || []).map((article) => (
          <li key={article.slug} onClick={() => setSlug(article.slug)}>
            {article.title}
          </li>
        ))}
      </ul>
      <div data-test="component">
        <BlogArticleModal slug={slug} onClose={() => setSlug(null)} />
      </div>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <div data-test="BlogArticleModal-scenario-standard">
      <NextAppHandlerWeb>
        <Inner />
      </NextAppHandlerWeb>
    </div>
  );
};
