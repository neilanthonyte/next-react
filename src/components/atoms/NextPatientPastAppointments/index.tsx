import * as React from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { AppointmentCard } from "../../resources/AppointmentCard";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { PaginatedContent } from "../../structure/PaginatedContent";
import { IBookingWidgetProps } from "../../../entry/BookingWidget";
import { useSyncedPatientAppointments } from "../../../hooks/patient/useSyncedPatientAppointments";

export interface INextPatientPastAppointmentsProps {
  onBook?: (preselection?: Partial<IBookingWidgetProps>) => void;
}

/**
 * Component rendering a paginated list of the next patient in session
 */
export const NextPatientPastAppointments: React.FC<
  INextPatientPastAppointmentsProps
> = ({ onBook }) => {
  const { nextPatient } = useSyncedSessionData();

  const {
    isLoading,
    patientAppointments: { past: pastAppointments },
    ...appointmentQueryRest
  } = useSyncedPatientAppointments(nextPatient?.patientId);

  return (
    <LoadingBlock
      isLoading={isLoading || !pastAppointments}
      {...appointmentQueryRest}
    >
      <NoDataFallback message="You don't have any past appointments.">
        {pastAppointments?.length > 0 && (
          <PaginatedContent itemsPerPage={2}>
            {pastAppointments.map((a) => (
              <AppointmentCard
                key={a.appointment.id}
                appointment={a.appointment}
                hcp={a.hcp}
                location={a.location}
                onRebookAppoinmtent={onBook}
                layout={ELayoutVariant.Compact}
              />
            ))}
          </PaginatedContent>
        )}
      </NoDataFallback>
    </LoadingBlock>
  );
};
