import { SearchContext } from "next-react/src/contexts/SearchContext";
import { useLocations } from "next-react/src/hooks/content/useLocations";
import { useRequiredContext } from "next-react/src/hooks/useRequiredContext";
import { Hcp } from "next-shared/src/models/Hcp";
import * as React from "react";
import ContentGrid from "../../structure/ContentGrid";
import { LoadingBlock } from "../../structure/LoadingBlock";

import { Results, ResultsBody, ResultsTitle, ResultHcp } from "../Results";

interface ISearchResultsHcpsProps {}

/**
 * Displays HCP search results for Next search feature.
 */
export const SearchResultsHcps: React.FC<ISearchResultsHcpsProps> = () => {
  const { results, initiateBooking } = useRequiredContext(SearchContext);
  const { locations, error, isLoading, refetch } = useLocations();

  if (!results) {
    return null;
  }

  return (
    <>
      <Results>
        <ResultsTitle>Providers</ResultsTitle>
        <ResultsBody>
          <LoadingBlock isLoading={isLoading} error={error} refetch={refetch}>
            {!isLoading && (
              <ContentGrid columns={2}>
                {results.hcps.map((hcp: Hcp) => {
                  const worksAt =
                    locations &&
                    locations.find((loc) => loc.slug === hcp.worksAt);
                  return (
                    <ResultHcp
                      hcp={hcp}
                      key={hcp.slug}
                      location={worksAt}
                      onBook={
                        worksAt && worksAt.isBookable()
                          ? () =>
                              initiateBooking({
                                hcpSlug: hcp.slug,
                                locationSlug: worksAt.slug,
                              })
                          : null
                      }
                    />
                  );
                })}
              </ContentGrid>
            )}
          </LoadingBlock>
        </ResultsBody>
      </Results>
    </>
  );
};
