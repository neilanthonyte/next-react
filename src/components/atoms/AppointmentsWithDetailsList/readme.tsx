import * as React from "react";

import { mockEhrPatients } from "next-shared/src/mockData/mockEhrPatients";

import { useDebug } from "../../../debug/DemoWrapper";
import { AppointmentsWithDetailsList } from ".";
import { useSyncedEhrPatientAppointments } from "../../../hooks/patient/useSyncedEhrPatientAppointments";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useEffect, useState } from "react";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "AppointmentsWithDetailsList",
      scenario: "standard",
    },
  });

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setActions([
      {
        label: "Set patient 0",
        action: () => setIndex(0),
      },
      {
        label: "Set patient 1",
        action: () => setIndex(1),
      },
    ]);
  }, []);

  const {
    patientAppointments: { upcoming, all },
    ...rest
  } = useSyncedEhrPatientAppointments(
    mockEhrPatients[index].association.ehrId,
    mockEhrPatients[index].ehrPatientId,
  );

  return (
    <LoadingBlock isLoading={!upcoming} {...rest}>
      <AppointmentsWithDetailsList appointmentsWithDetails={upcoming} />
    </LoadingBlock>
  );
};
