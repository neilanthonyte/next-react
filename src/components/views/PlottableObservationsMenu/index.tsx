import * as _ from "lodash";
import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { fhirUtil } from "next-shared/src/fhirUtil";
import {
  SideBar,
  SideBarTitle,
  SideBarHeader,
  SideBarBody,
} from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
} from "../../structure/SideBarSection";

import { mapObservationTypeToIcon } from "../../../helpers/mapObservationTypeToIcon";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { usePlottableObservationTypes } from "../../../hooks/usePlottableObservationTypes";
import {
  Resource,
  ResourceBody,
  ResourceContent,
  ResourceHeader,
  ResourceSource,
  ResourceType,
} from "../../generic/Resource";
import { VStack } from "../../structure/VStack";
import { useSyncedPatientMedicalResources } from "../../../hooks/patient/useSyncedPatientMedicalResources";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { humaneDate } from "../../../helpers/humaneDate";

interface IPlottableObservationsSideBarSection {
  plottableObservationTypes: any;
  observationsByType: Record<string, fhir3.Observation[]>;
  basePath: any;
}

const PlottableObservationsSideBarSection: React.FC<
  IPlottableObservationsSideBarSection
> = ({ plottableObservationTypes, observationsByType }) => {
  if (plottableObservationTypes.length === 0) {
    return null;
  }
  return (
    <SideBarSection>
      <SideBarSectionBody>
        <VStack>
          {plottableObservationTypes.map((type: string, i: number) => {
            const latestMetric = _.last(observationsByType[type]);
            if (!latestMetric) {
              return null;
            }
            const icon = mapObservationTypeToIcon(
              fhirUtil(latestMetric).getMedicalResourceType(),
            );
            const resourceType =
              fhirUtil<FhirObservationUtil>(
                latestMetric,
              ).getObservationDisplayName() || "Unknown";

            const updated = humaneDate(
              fhirUtil(latestMetric).getLastModified(),
            );

            const metric = fhirUtil(latestMetric).getDisplayText();

            return (
              <Resource url={`#${type.replace(":", "_")}`} key={i}>
                <ResourceHeader icon={icon}>
                  <ResourceType>{resourceType}</ResourceType>
                </ResourceHeader>
                <ResourceBody>
                  <ResourceContent>
                    <h3>{metric}</h3>
                  </ResourceContent>
                </ResourceBody>
                <ResourceSource description={`Updated ${updated}`} />
              </Resource>
            );
          })}
        </VStack>
      </SideBarSectionBody>
    </SideBarSection>
  );
};

export interface IPlottableObservationsMenuProps extends RouteComponentProps {
  plottableObservationTypes: any;
  observationsByType: any;
  basePath?: string;
}

export const PlottableObservationsSideBar: React.FC<
  IPlottableObservationsMenuProps
> = ({ basePath = "/metrics" }) => {
  const { scope } = useSyncedSessionData();
  const { patientObservations } = useSyncedPatientMedicalResources(
    scope?.patientId,
  );

  const plottableObservationTypes =
    usePlottableObservationTypes(patientObservations);

  if (plottableObservationTypes === null) {
    return null;
  }
  return (
    <SideBar>
      <SideBarHeader>
        <SideBarTitle>Observations</SideBarTitle>
      </SideBarHeader>
      <SideBarBody>
        <PlottableObservationsSideBarSection
          plottableObservationTypes={plottableObservationTypes}
          observationsByType={patientObservations}
          basePath={basePath}
        />
      </SideBarBody>
    </SideBar>
  );
};
