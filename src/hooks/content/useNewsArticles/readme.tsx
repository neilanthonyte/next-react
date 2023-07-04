import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { MemoryRouter } from "react-router";

import { useNewsArticles } from ".";
import { ArticleCard } from "../../../components/articles/ArticleCard";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";

const Inner = () => {
  const count = useRef<number>(0);
  const { newsArticles, isLoading } = useNewsArticles();

  useEffect(() => {
    count.current = count.current + 1;
  }, [newsArticles]);

  return (
    <>
      <LoadingBlock isLoading={isLoading}>
        <Grid>
          {(newsArticles || []).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </Grid>
      </LoadingBlock>
      <p>Render count: {count.current}</p>
    </>
  );
};

export const DemoStandard = () => {
  const [result, setResult] = useState(null);
  return (
    <div data-test="useNewsArticles-scenario-standard">
      <NextAppHandlerWeb>
        <MemoryRouter>
          <div data-test="component">
            <Inner />
          </div>
        </MemoryRouter>
      </NextAppHandlerWeb>
    </div>
  );
};
