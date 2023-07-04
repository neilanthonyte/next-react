import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";

import { fhirUtil } from "next-shared/src/fhirUtil";

import { ErrorResolverContext } from "../../../contexts/ErrorResolver";
import { useClient } from "../../../hooks/useClient";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { ModalConfirm } from "../../generic/ModalConfirm";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { AppointmentsWithDetailsList } from "../AppointmentsWithDetailsList";
import { useSyncedPatientAppointments } from "../../../hooks/patient/useSyncedPatientAppointments";

export interface INextPatientUpcomingAppointmentsProps {
  onBook?: () => void;
}

/**
 * Component rendering list of appointments with details for the next patient in session
 * Used for patients logged in accessing their record
 *
 * TODO reconcile with ManageAppointment for repeated cancel logic if possible
 */
export const NextPatientUpcomingAppointments: React.FC<
  INextPatientUpcomingAppointmentsProps
> = ({ onBook }) => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const [cancelAppointmentId, setCancelAppointmentId] = useState<string>();

  const {
    error,
    isLoading,
    patientAppointments: { upcoming: upcomingAppointments },
  } = useSyncedPatientAppointments(nextPatient?.patientId);

  const appointmentToCancel = useMemo(() => {
    if (!cancelAppointmentId) return;
    return (upcomingAppointments || []).find(
      (appt) => appt.appointment.id === cancelAppointmentId,
    );
  }, [upcomingAppointments, cancelAppointmentId]);

  const [cancelAppointment, { error: cancelError }] = useMutation(
    () => {
      const { appointment, token } = appointmentToCancel;
      const ehrId = fhirUtil(appointment).getOriginEhrId();
      return client.appointments.cancelAppointment(
        ehrId,
        appointment.id,
        token,
      );
    },
    {
      onSettled: () => {
        // reset local state to close modal
        setCancelAppointmentId(undefined);
      },
    },
  );

  useEffect(() => {
    if (!cancelError) return;
    resolveError({
      title: "Unable to cancel appointment, please try again",
      approach: "modal",
    });
  }, [cancelError]);

  return (
    <LoadingBlock isLoading={isLoading || !upcomingAppointments} error={error}>
      <NoDataFallback
        message="You don't have any upcoming appointments."
        actions={[{ label: "Book an appointment", onClick: () => onBook() }]}
      >
        {upcomingAppointments?.length > 0 && (
          <AppointmentsWithDetailsList
            appointmentsWithDetails={upcomingAppointments}
            onCancelAppointment={setCancelAppointmentId}
          />
        )}
      </NoDataFallback>
      {appointmentToCancel && (
        <ModalConfirm
          onCancel={() => setCancelAppointmentId(undefined)}
          cancellationButton={"Close"}
          onConfirm={cancelAppointment}
          heading="Are you sure you would like to cancel your appointment?"
        />
      )}
    </LoadingBlock>
  );
};
