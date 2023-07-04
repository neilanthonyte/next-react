import * as React from "react";

import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { useDebug } from "../../../debug/DemoWrapper";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import ObservationCard from "../../../components/resources/ObservationCard";
import { usePatientFormObservations } from ".";

export const DemoStandard = () => {
  useDebug({
    setSessionDebug: true,
    appConfig: {
      debugClientMethodsError: ["patients.retrieveMedicalResources"],
    },
    test: {
      componentName: "usePatientFormObservations",
      scenario: "standard",
    },
  });
  const { nextPatient } = useSyncedSessionData();
  const { error, isLoading, patientForms, refetch } =
    usePatientFormObservations(nextPatient?.patientId);

  return (
    <LoadingBlock isLoading={isLoading} error={error} refetch={refetch}>
      <Grid>
        {(patientForms || []).map((form) => (
          <ObservationCard key={form.id} data={form} />
        ))}
      </Grid>
    </LoadingBlock>
  );
};
