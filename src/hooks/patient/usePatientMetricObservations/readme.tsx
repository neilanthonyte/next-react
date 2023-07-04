import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { useDebug } from "../../../debug/DemoWrapper";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import ObservationCard from "../../../components/resources/ObservationCard";
import { usePatientMetricObservations } from ".";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    appConfig: {
      debugClientMethodsError: ["patients.retrieveMedicalResources"],
    },
    test: {
      componentName: "usePatientMetricObservations",
      scenario: "standard",
    },
  });
  const { nextPatient } = useSyncedSessionData();
  const { error, isLoading, patientMetrics, refetch } =
    usePatientMetricObservations(nextPatient?.patientId);

  const flattenedMetrics = useMemo(() => {
    if (!patientMetrics) return [];
    return _.flatten(Object.values(patientMetrics));
  }, [patientMetrics]);

  return (
    <LoadingBlock isLoading={isLoading} error={error} refetch={refetch}>
      <Grid>
        {flattenedMetrics.map((metric) => (
          <ObservationCard key={metric.id} data={metric as fhir3.Observation} />
        ))}
      </Grid>
    </LoadingBlock>
  );
};
