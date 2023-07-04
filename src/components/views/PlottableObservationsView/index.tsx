import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { PendingContent } from "../../structure/PendingContent";
import { Page, PageBody } from "../../structure/Page";
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";

import { PlottableObservation } from "../../atoms/PlottableObservation";
import { usePlottableObservationTypes } from "../../../hooks/usePlottableObservationTypes";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useSyncedPatientMedicalResources } from "../../../hooks/patient/useSyncedPatientMedicalResources";

export interface IPlotDataProps extends RouteComponentProps {}

export const PlottableObservationView: React.FC<IPlotDataProps> = () => {
  const { scope } = useSyncedSessionData();
  const { patientObservations } = useSyncedPatientMedicalResources(
    scope?.patientId,
  );

  const plottableObservationTypes =
    usePlottableObservationTypes(patientObservations);

  const filteredNames = plottableObservationTypes.filter((name: string) => {
    const obs = patientObservations[name] as fhir3.Observation[];
    return obs.length > 0;
  });

  return (
    <PendingContent check={plottableObservationTypes !== null}>
      <Page>
        <PageBody>
          {filteredNames.map((key: string) => {
            const obs = patientObservations[key] as fhir3.Observation[];
            const obsName = fhirUtil<FhirObservationUtil>(
              obs[0],
            ).getObservationDisplayName();
            return (
              <PageSection key={key} id={key.replace(":", "_")}>
                <PageSectionHeader>
                  <PageSectionTitle>{obsName}</PageSectionTitle>
                </PageSectionHeader>
                <PageSectionBody>
                  <PlottableObservation observations={obs} />
                </PageSectionBody>
              </PageSection>
            );
          })}
        </PageBody>
      </Page>
    </PendingContent>
  );
};
