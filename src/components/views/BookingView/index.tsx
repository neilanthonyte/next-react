import * as React from "react";
import * as _ from "lodash";

import { Page, PageHeader, PageTitle, PageBody } from "../../structure/Page";
import { PageSection, PageSectionBody } from "../../structure/PageSection";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { BookingWidget } from "../../../entry/BookingWidget";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";

export interface IBookingViewProps {}

/**
 * Provides an internal version of the booking widget that displays
 * private bookings.
 */
export const BookingView: React.FC<IBookingViewProps> = ({}) => {
  const { activeLocation: currentLocation } = useActiveLocation();

  return (
    <Page>
      <PageHeader>
        <PageTitle>Internal Bookings</PageTitle>
      </PageHeader>
      <PageBody>
        <PageSection>
          <PageSectionBody>
            <LoadingBlock isLoading={!currentLocation}>
              {!!currentLocation && (
                <BookingWidget
                  locationSlug={currentLocation.slug}
                  allowLogin={false}
                  backLink={{ path: "/", label: "Cancel" }}
                  covidRisk={false}
                />
              )}
            </LoadingBlock>
          </PageSectionBody>
        </PageSection>
      </PageBody>
    </Page>
  );
};
