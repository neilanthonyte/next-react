import { SearchContext } from "next-react/src/contexts/SearchContext";
import { useHcps } from "next-react/src/hooks/content/useHcps";
import { useRequiredContext } from "next-react/src/hooks/useRequiredContext";
import { NextLocation } from "next-shared/src/models/NextLocation";
import * as React from "react";
import ContentGrid from "../../structure/ContentGrid";
import { LoadingBlock } from "../../structure/LoadingBlock";

import { Results, ResultsBody, ResultsTitle, ResultLocation } from "../Results";

interface ISearchResultsLocationsProps {}

/**
 * Displays location search results for Next search feature.
 */
export const SearchResultsLocations: React.FC<
  ISearchResultsLocationsProps
> = () => {
  const { results, initiateBooking } = useRequiredContext(SearchContext);
  const { hcps, error, isLoading, refetch } = useHcps();

  if (!results) {
    return null;
  }

  return (
    <Results>
      <ResultsTitle>Practices</ResultsTitle>
      <ResultsBody>
        <LoadingBlock isLoading={isLoading} error={error} refetch={refetch}>
          <ContentGrid columns={2}>
            {results.locations.map((loc: NextLocation) => (
              <ResultLocation
                location={loc}
                key={loc.slug}
                hcps={
                  hcps &&
                  hcps.filter(
                    (hcp) =>
                      hcp.worksAt === loc.slug &&
                      hcp.appointmentTypeSlugs &&
                      Array.isArray(hcp.appointmentTypeSlugs) &&
                      hcp.appointmentTypeSlugs.length > 0,
                  )
                }
                onBook={
                  loc.isBookable()
                    ? () => initiateBooking({ locationSlug: loc.slug })
                    : null
                }
              />
            ))}
          </ContentGrid>
        </LoadingBlock>
      </ResultsBody>
    </Results>
  );
};
