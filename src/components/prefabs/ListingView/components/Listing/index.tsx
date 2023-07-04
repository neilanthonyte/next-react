import * as React from "react";
import * as _ from "lodash";
import { useState, useMemo } from "react";

import { PendingContent } from "../../../../structure/PendingContent";
import { ArticleCard } from "../../../../articles/ArticleCard";
import { Page, PageBody, PageHeader } from "../../../../structure/Page";
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../../../structure/PageSection";
import { Grid, IGridSize } from "../../../../structure/Grid";
import { SearchInput } from "../../../../generic/SearchInput";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { FilterControl } from "../../../../generic/FilterControl";

export interface IListingProps {
  title?: string;
  content?: any[];
  getItemCategory: (item: any) => string;
  isFavourite?: (item: any) => boolean;
  renderItem?: (item: any) => any;
  showCategoryFilter?: boolean;
  showSearch?: boolean;
  gridSize?: IGridSize;
}

export const Listing: React.FC<IListingProps> = ({
  content = null,
  getItemCategory,
  renderItem = (n) => (
    <ArticleCard key={n.slug} article={{ to: n.url, ...n }} />
  ),
  showCategoryFilter = false,
  showSearch = false,
  isFavourite,
  gridSize = "lg",
}) => {
  const [onlyFavourites, setOnlyFavourites] = useState<boolean>(false);
  const [search, setSearch] = useState<string>(null);

  const toggleFavourites = () => setOnlyFavourites(!onlyFavourites);

  const allCategories = useMemo(() => {
    if (!content) {
      return [];
    }

    return _.uniq(content.map((i) => getItemCategory(i)));
  }, [content]);

  const filteredContent = useMemo(() => {
    if (!content) {
      return [];
    }
    return (
      content
        .filter((i) =>
          search ? JSON.stringify(i).toLowerCase().match(search) : true,
        )
        .filter((i) => (onlyFavourites ? isFavourite(i) : true)) || []
    );
  }, [content, onlyFavourites, search]);

  const categorisedContent = _.groupBy(filteredContent, getItemCategory);
  // honour original category ordering
  const orderedContent: { [category: string]: any[] } = {};
  allCategories.map((c) => {
    if (!!categorisedContent[c]) {
      orderedContent[c] = categorisedContent[c];
    }
  });

  return (
    <Page>
      <PageHeader>
        {showSearch && (
          <SearchInput
            stdSize={EStandardSizes.Small}
            onChange={(v: string) => setSearch((v || "").toLowerCase())}
          />
        )}
        {!!isFavourite && (
          <FilterControl
            values={["All", "Common"]}
            selectedValue={onlyFavourites ? "Common" : "All"}
            onClick={toggleFavourites}
          />
        )}
      </PageHeader>
      <PageBody>
        <PendingContent check={filteredContent !== null}>
          {Object.keys(orderedContent).map((category: string) => {
            const slug = _.kebabCase(category);
            return (
              <PageSection key={slug} id={slug}>
                <PageSectionHeader>
                  <PageSectionTitle>{category}</PageSectionTitle>
                </PageSectionHeader>
                <PageSectionBody>
                  <Grid size={gridSize}>
                    {categorisedContent[category].map((i: any) =>
                      renderItem(i),
                    )}
                  </Grid>
                </PageSectionBody>
              </PageSection>
            );
          })}
        </PendingContent>
      </PageBody>
    </Page>
  );
};
