import { SearchContext } from "next-react/src/contexts/SearchContext";
import { useAppointmentTypes } from "next-react/src/hooks/useAppointmentTypes";
import { useRequiredContext } from "next-react/src/hooks/useRequiredContext";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import * as React from "react";
import { AppointmentTypeCard } from "../../atoms/AppointmentTypeCard";
import { LoadingBlock } from "../../structure/LoadingBlock";

import { Results, ResultsBody, ResultsTitle } from "../Results";

interface ISearchResultsAppointmentTypesProps {}

// HACK quick and dirty way of dealing with unknown error type
const parseError = (error: unknown): Error | null => {
  if (!error) {
    return null;
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("An unknown error occurred.");
};

/**
 * Displays appointment type search results for Next search feature.
 */
export const SearchResultsAppointmentTypes: React.FC<
  ISearchResultsAppointmentTypesProps
> = () => {
  const { results, initiateBooking } = useRequiredContext(SearchContext);
  const {
    data: appointmentTypes,
    error,
    isLoading,
    refetch,
  } = useAppointmentTypes();

  if (!results) {
    return null;
  }

  return (
    <Results>
      <ResultsTitle>Appointment Types</ResultsTitle>
      <ResultsBody>
        <LoadingBlock
          isLoading={isLoading}
          error={parseError(error)}
          refetch={refetch}
        >
          {results.appointmentTypes.map((appointmentType: AppointmentType) => (
            <AppointmentTypeCard
              key={appointmentType.slug}
              type={appointmentType}
              onClick={() => {
                // HACK
                initiateBooking({
                  appointmentTypeSlug: appointmentTypes.find(
                    (h) => h.slug === appointmentType.slug,
                  )?.slug,
                });
              }}
            />
          ))}
        </LoadingBlock>
      </ResultsBody>
    </Results>
  );
};
