import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { MemoryRouter } from "react-router";

import { useMedicalArticles } from ".";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { MedicalArticleCard } from "../../../components/medical-articles/MedicalArticleCard";
import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";

const Inner = () => {
  const count = useRef<number>(0);
  const { medicalArticles, isLoading } = useMedicalArticles();

  useEffect(() => {
    count.current = count.current + 1;
  }, [medicalArticles]);

  return (
    <>
      <LoadingBlock isLoading={isLoading}>
        <Grid>
          {(medicalArticles || []).map((a) => (
            <MedicalArticleCard key={a.slug} article={a} />
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
    <div data-test="useMedicalArticles-scenario-standard">
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
