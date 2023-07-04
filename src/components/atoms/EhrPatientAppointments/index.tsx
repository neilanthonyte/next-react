import * as React from "react";
import { useMemo } from "react";

import { isUpcoming } from "next-shared/src/helpers/isUpcoming";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { AppointmentsWithDetailsList } from "../AppointmentsWithDetailsList";
import { useSyncedEhrPatientAppointments } from "../../../hooks/patient/useSyncedEhrPatientAppointments";

export interface IEhrPatientAppointmentsProps {
  variant?: "today" | "upcoming";
}

/**
 * Component rendering list of upcoming appointments with details for the ehr patient in session
 */
export const EhrPatientAppointments: React.FC<IEhrPatientAppointmentsProps> = ({
  variant = "upcoming",
}) => {
  const { ehrPatient } = useSyncedSessionData();

  const { patientAppointments, ...rest } = useSyncedEhrPatientAppointments(
    ehrPatient?.association?.ehrId,
    ehrPatient?.association?.ehrPatientId,
  );

  const upcomingAppointments = useMemo(() => {
    if (variant === "upcoming")
      return (patientAppointments?.all || []).filter((appt) =>
        isUpcoming(appt.appointment.end),
      );
    return patientAppointments.todays;
  }, [patientAppointments]);

  return (
    <LoadingBlock {...rest}>
      <NoDataFallback message="You do not have any upcoming appointments.">
        {upcomingAppointments?.length > 0 && (
          <AppointmentsWithDetailsList
            appointmentsWithDetails={upcomingAppointments}
          />
        )}
      </NoDataFallback>
    </LoadingBlock>
  );
};
