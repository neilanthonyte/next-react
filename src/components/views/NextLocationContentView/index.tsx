import * as React from "react";

import { Page, PageBody, PageHeader, PageTitle } from "../../structure/Page";
import { BlogArticlesSection } from "../../pageSections/BlogArticlesSection";

export interface INextLocationContentViewProps {}

export const NextLocationContentView: React.FC<
  INextLocationContentViewProps
> = () => {
  return (
    <Page>
      <PageHeader>
        <PageTitle>Clinic content</PageTitle>
      </PageHeader>
      <PageBody>
        <BlogArticlesSection />
      </PageBody>
    </Page>
  );
};
