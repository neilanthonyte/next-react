import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import * as _ from "lodash";
import moment from "moment";

import { useClient } from "../../../hooks/useClient";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { Hcp } from "next-shared/src/models/Hcp";
import {
  PageSectionBody,
  PageSection,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";
import { HcpCard } from "../../atoms/HcpCard";
import { Grid } from "../../structure/Grid";
import { IAggregateResponse } from "next-shared/src/models/Rating";
import { LoadingBlock } from "../../structure/LoadingBlock";

export interface IHcpsPerformanceSectionProps {}

export const HcpsPerformanceSection: React.FC<
  IHcpsPerformanceSectionProps
> = ({}) => {
  const client = useClient();

  const [locations, setLocations] = useState<NextLocation[]>(null);
  const [hcps, setHcps] = useState<Hcp[]>(null);
  const [ratings, setRatings] = useState<IAggregateResponse[]>(null);

  useEffect(() => {
    client.locations
      .retrieveAllLocations()
      .then((locations) => setLocations(locations));
  }, []);

  useEffect(() => {
    const locationId = _.get(client.auth, "session.staffMember.cmsLocationId");

    if (!locationId) {
      setHcps(null);
      return;
    }

    client.hcps
      .retrieveAllHcpsByRole("patientAdvocate")
      .then((hcps: Hcp[]) => {
        setHcps(hcps);
      })
      .catch((e) => console.error(e));

    // TODO - allow user to set the date range
    const to = moment().endOf("day").unix();
    const from = moment.unix(to).subtract(31, "days").unix();

    client.statistics
      .getPaRatingsForCurrentLocation(from, to)
      .then((stats: IAggregateResponse[]) => {
        setRatings(stats);
      })
      .catch((e) => console.error(e));
  }, [client.auth.session]);

  const hcpsWithStats: Hcp[] = useMemo(() => {
    if (hcps === null || ratings === null || locations === null) {
      return null;
    }
    const locationSlug: string = _.get(
      client.auth,
      "session.staffMember.cmsLocationSlug",
    );
    const location = _.find(
      locations,
      (l: NextLocation) => l.slug === locationSlug,
    );

    if (!location) {
      console.warn("Unable to find location", locations, locationSlug);
      return [];
    }

    return hcps.filter((hcp) => hcp.worksAt === location.slug);
    // TODO - is this being used?
    // .map((hcp: Hcp) => {
    //   const rating = _.find(ratings, (r) => r.rateeId === hcp.slug);
    //   return {
    //     ...hcp,
    //     bioShort: null,
    //     url: null,
    //     rating
    //   };
    // });
  }, [hcps, ratings, locations]);

  return (
    <PageSection>
      <PageSectionHeader>
        <PageSectionTitle>Team performance</PageSectionTitle>
      </PageSectionHeader>
      <PageSectionBody>
        <LoadingBlock isLoading={hcpsWithStats === null}>
          {hcpsWithStats && (
            <Grid size="lg">
              {hcpsWithStats.map((hcp) => (
                <HcpCard hcp={hcp} quickBook={false} key={hcp.npServicesId} />
              ))}
            </Grid>
          )}
        </LoadingBlock>
      </PageSectionBody>
    </PageSection>
  );
};
