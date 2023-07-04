import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { useDebug } from "../../../debug/DemoWrapper";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import ObservationCard from "../../../components/resources/ObservationCard";
import { usePatientLifestyleObservations } from ".";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    appConfig: {
      debugClientMethodsError: ["patients.retrieveMedicalResources"],
    },
    test: {
      componentName: "usePatientLifestyleObservations",
      scenario: "standard",
    },
  });
  const { nextPatient } = useSyncedSessionData();
  const { error, isLoading, patientLifestyle, refetch } =
    usePatientLifestyleObservations(nextPatient?.patientId);

  const flattenedLifestyle = useMemo(() => {
    if (!patientLifestyle) return [];
    return _.flatten(Object.values(patientLifestyle));
  }, [patientLifestyle]);

  return (
    <LoadingBlock isLoading={isLoading} error={error} refetch={refetch}>
      <Grid>
        {flattenedLifestyle.map((lifestyle) => (
          <ObservationCard
            key={lifestyle.id}
            data={lifestyle as fhir3.Observation}
          />
        ))}
      </Grid>
    </LoadingBlock>
  );
};
