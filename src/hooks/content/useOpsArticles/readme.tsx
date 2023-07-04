import * as React from "react";
import { useEffect, useRef } from "react";

import { useOpsArticles } from ".";
import { ArticleCard } from "../../../components/articles/ArticleCard";
import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";

export const DemoStandard = () => {
  const count = useRef<number>(0);
  const { opsArticles, ...rest } = useOpsArticles();

  useEffect(() => {
    count.current = count.current + 1;
  }, [opsArticles]);

  return (
    <>
      <LoadingBlock {...rest}>
        <Grid>
          {(opsArticles || []).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </Grid>
      </LoadingBlock>
      <p>Render count: {count.current}</p>
    </>
  );
};
