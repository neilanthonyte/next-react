import * as React from "react";
import { useEffect, useState } from "react";
import moment from "moment";

import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";

import { useDebug } from "../../../debug/DemoWrapper";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { currentUnixTimestamp } from "../../../helpers/currentUnixTimestamp";
import { Grid } from "../../../components/structure/Grid";
import {
  Resource,
  ResourceBody,
  ResourceHeader,
  ResourceType,
} from "../../../components/generic/Resource";
import { VStack } from "../../../components/structure/VStack";
import { ArticleCard } from "../../../components/articles/ArticleCard";
import { InstructionResource } from "../../../components/resources/InstructionResource";
import { AppointmentWithDetails } from "../../../components/atoms/AppointmentWithDetails";
import { LocationCell } from "../../../components/cells/LocationCell";
import { usePatientUpdates } from ".";
import { HcpCard } from "../../../components/atoms/HcpCard";
import { Badge } from "../../../components/generic/Badge";

export const DemoStandard = () => {
  const { setActions } = useDebug({ setSessionDebug: true });
  const [lastCheck, setLastCheck] = useState<unixTimestamp>();

  const { nextPatient } = useSyncedSessionData();
  const updates = usePatientUpdates(nextPatient, lastCheck);

  useEffect(() => {
    setActions([
      {
        label: "Set last check before last appointment",
        action: () => {
          const lastEndedAt = moment().subtract(1, "months").unix();
          setLastCheck(lastEndedAt);
        },
      },
      {
        label: "Set last check to now",
        action: () => setLastCheck(currentUnixTimestamp()),
      },
    ]);
  }, [updates?.lastCompletedAppointmentWithDetails]);

  return (
    <LoadingBlock isLoading={!lastCheck}>
      {updates && (
        <VStack>
          <h4>
            Number of updates: <Badge>{updates.updatesCounter}</Badge>
          </h4>

          <h4>Most recent appoinmtent</h4>
          <div>
            {!!updates.lastCompletedAppointmentWithDetails && (
              <AppointmentWithDetails
                appointmentWithDetails={
                  updates.lastCompletedAppointmentWithDetails
                }
              />
            )}
          </div>
          <hr />
          <h4>Hcp used for decoration</h4>
          <div>
            {!!updates.lastCompletedAppointmentWithDetails && (
              <HcpCard hcp={updates.lastCompletedAppointmentWithDetails.hcp} />
            )}
          </div>
          <hr />
          <h4>New appointment</h4>
          <div>
            {!!updates.newAppointmentWithDetails && (
              <AppointmentWithDetails
                appointmentWithDetails={updates.newAppointmentWithDetails}
              />
            )}
          </div>
          <hr />
          <h4>New Medications</h4>
          <div>
            <Grid size="lg">
              {(updates.newMedicationActions || []).map((m) => (
                <Resource key={m.actionId}>
                  <ResourceBody>
                    <ResourceHeader icon="medications">
                      <ResourceType>Medication</ResourceType>
                    </ResourceHeader>
                    {m.resource.title}
                  </ResourceBody>
                </Resource>
              ))}
            </Grid>
          </div>
          <hr />
          <h4>New Documents</h4>
          <div>
            <Grid size="lg">
              {(updates.newDocumentActions || []).map((d) => (
                <Resource key={d.actionId}>
                  <ResourceBody>
                    <ResourceHeader icon="certificate">
                      <ResourceType>{d.resource.category}</ResourceType>
                    </ResourceHeader>
                    {d.resource.title}
                  </ResourceBody>
                </Resource>
              ))}
            </Grid>
          </div>
          <hr />
          <h4>New articles</h4>
          <div>
            <Grid size="lg">
              {(updates.newArticleActions || []).map((a) => (
                <ArticleCard key={a.actionId} article={a.resource} />
              ))}
            </Grid>
          </div>
          <hr />
          <h4>New instructions</h4>
          <div>
            <Grid size="lg">
              {(updates.newInstructionActions || []).map((i) => (
                <InstructionResource
                  key={i.actionId}
                  title={i.title}
                  htmlMessage={i.resource.message}
                />
              ))}
            </Grid>
          </div>
          <hr />
          <h4>Appointment to rate</h4>
          <div>
            {!!updates.appointmentWithDetailsToRate && (
              <AppointmentWithDetails
                appointmentWithDetails={updates.appointmentWithDetailsToRate}
              />
            )}
          </div>
          <hr />
          <h4>New associations</h4>
          <div>
            <Grid size="lg">
              {(updates.newAssociations || []).map((a) => (
                <LocationCell
                  key={a.patientId}
                  location={mockNextLocations.find(
                    (l) => l.slug === a.cmsLocationSlug,
                  )}
                />
              ))}
            </Grid>
          </div>
        </VStack>
      )}
    </LoadingBlock>
  );
};
