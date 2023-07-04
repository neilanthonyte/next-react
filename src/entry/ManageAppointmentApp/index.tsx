import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import moment from "moment";

import { ErrorResolverContext } from "../../contexts/ErrorResolver";
import { useAppointment } from "../../hooks/useAppointment";
import { useClient } from "../../hooks/useClient";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import { AppointmentsWithDetailsList } from "../../components/atoms/AppointmentsWithDetailsList";
import { ErrorPlaceholder } from "../../components/structure/ErrorPlaceholder";
import {
  ErrorMessage,
  MessageBody,
  MessageTitle,
  SuccessMessage,
} from "../../components/generic/Message";
import { LoadingBlock } from "../../components/structure/LoadingBlock";
import { ModalConfirm } from "../../components/generic/ModalConfirm";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";

export interface IManageAppointmentAppProps {
  ehrId: string;
  ehrAppointmentId: string;
  token?: string;
}

/**
 * App responsible of fetching and managing a specific appointment
 */
export const ManageAppointmentApp: React.FC<IManageAppointmentAppProps> = (
  props,
) => (
  <NextAppHandlerWeb configOverride={{ useRealClient: true }}>
    <Inner {...props} />
  </NextAppHandlerWeb>
);

const Inner: React.FC<IManageAppointmentAppProps> = ({
  ehrId,
  ehrAppointmentId,
  token,
}) => {
  const client = useClient();
  const [cancelSuccess, setCancelSuccess] = useState<boolean>(false);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

  const { resolveError } = useRequiredContext(ErrorResolverContext);

  // this route for single appointment is not synced, so we refetch manually on form submit success
  // probably doesn't need to be, as this is the at home appointment management via email link
  // and therefore will not benefit from socket event?
  const {
    appointment: appointmentWithDetail,
    isLoading,
    error: fetchError,
    refetch,
  } = useAppointment(ehrId, ehrAppointmentId, token);

  const [cancelAppointment, { error: cancelError }] = useMutation(
    () => client.appointments.cancelAppointment(ehrId, ehrAppointmentId, token),
    {
      onSuccess: () => {
        setCancelSuccess(true);
      },
      onSettled: () => setShowModalConfirm(false),
    },
  );

  useEffect(() => {
    if (!cancelError) return;
    resolveError({
      title: "Unable to cancel appointment, please try again",
      approach: "modal",
    });
  }, [cancelError]);

  useEffect(() => {
    if (!fetchError) return;
    resolveError({
      title: "Unable to retrieve appointment",
      approach: "inline",
      retry: refetch,
    });
  }, [fetchError]);

  const isPastAppointment = useMemo<boolean>(() => {
    if (!appointmentWithDetail) return;
    // appointment ended in the past, add 30 minutes buffer
    return moment(appointmentWithDetail.appointment.end.split("+")[0])
      .add(30, "minutes")
      .isBefore(moment());
  }, [appointmentWithDetail]);

  if (cancelSuccess) {
    return (
      <SuccessMessage>
        <MessageTitle>
          Your appointment has been successfully cancelled
        </MessageTitle>
        <MessageBody>You can rebook by visiting the bookings page.</MessageBody>
      </SuccessMessage>
    );
  }

  if (isPastAppointment) {
    return (
      <ErrorMessage>
        <MessageTitle>Your appointment has already ended.</MessageTitle>
        <MessageBody>
          Please contact your clinic if you require further assistance
        </MessageBody>
      </ErrorMessage>
    );
  }

  if (appointmentWithDetail?.appointment.status === "cancelled") {
    return (
      <ErrorMessage>
        <MessageTitle>Your appointment has been cancelled.</MessageTitle>
        <MessageBody>
          Please contact your clinic if you require further assistance
        </MessageBody>
      </ErrorMessage>
    );
  }

  return (
    <LoadingBlock isLoading={isLoading || !appointmentWithDetail}>
      {fetchError ? (
        <ErrorPlaceholder
          title="Unable to load the appointment"
          retry={refetch}
        />
      ) : (
        <AppointmentsWithDetailsList
          appointmentsWithDetails={[appointmentWithDetail]}
          onFormSaveSuccess={refetch}
          onCancelAppointment={() => setShowModalConfirm(true)}
        />
      )}
      {showModalConfirm && (
        <ModalConfirm
          onCancel={() => setShowModalConfirm(false)}
          cancellationButton={"Close"}
          onConfirm={cancelAppointment}
          heading="Are you sure you would like to cancel your appointment?"
        />
      )}
    </LoadingBlock>
  );
};
