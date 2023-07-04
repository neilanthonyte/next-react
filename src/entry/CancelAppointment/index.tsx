import React from "react";
import { useCallback, useEffect, useState } from "react";

import { NextClient } from "next-react/src/client/NextClient";
import {
  ErrorMessage,
  MessageTitle,
  MessageBody,
  SuccessMessage,
} from "next-react/src/components/generic/Message";
import { NextAppHandlerWeb } from "next-react/src/components/handlers/NextAppHandlerWeb";
import { PendingContent } from "next-react/src/components/structure/PendingContent";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { useClient } from "../../hooks/useClient";
import { ShowAppointment } from "./components/ShowAppointment";

export interface ICancelAppointmentProps {
  id: string;
  token: string;
  instanceId: string;
}

const Inner: React.FC<ICancelAppointmentProps> = ({
  id,
  token,
  instanceId,
}) => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);
  const [isMissing, setIsMissing] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<fhir3.Appointment>(null);
  const [location, setLocation] = useState<NextLocation>(null);
  const client = useClient() as unknown as NextClient;

  const fetchData = useCallback(async () => {
    try {
      const [appointment, location] = await Promise.all([
        client.appointments.retrieveAppointment(instanceId, id, token),
        client.locations.retrieveLocationByEhrId(instanceId),
      ]);
      setAppointment(appointment.appointment);
      setLocation(location);
    } catch (error) {
      console.warn(error);
      setIsMissing(true);
    }
  }, []);

  useEffect(() => {
    fetchData().catch(console.error);
  }, []);

  const cancelAppointment = useCallback(async () => {
    return client.appointments
      .cancelAppointment(instanceId, id, token)
      .then(() => {
        setIsSuccessful(true);
        setHasFailed(false);
      })
      .catch(() => {
        setIsSuccessful(false);
        setHasFailed(true);
      });
  }, []);

  if (isMissing) {
    return (
      <ErrorMessage>
        <MessageTitle>
          Unfortunately your appointment cannot be cancelled at this time
        </MessageTitle>
        <MessageBody>
          Please contact the clinic you booked your appointment at to help
          resolve this issue.
        </MessageBody>
      </ErrorMessage>
    );
  }
  if (isSuccessful) {
    return (
      <SuccessMessage>
        <MessageTitle>
          Your appointment has been successfully cancelled
        </MessageTitle>
        <MessageBody>You can rebook by visiting the bookings page.</MessageBody>
      </SuccessMessage>
    );
  }
  return (
    <PendingContent check={appointment !== null && location !== null}>
      <ShowAppointment
        onCancelAppointment={cancelAppointment}
        hasFailed={hasFailed}
        location={location}
        appointment={appointment}
      />
    </PendingContent>
  );
};

export const CancelAppointment: React.FC<ICancelAppointmentProps> = (props) => (
  <NextAppHandlerWeb>
    <Inner {...props} />
  </NextAppHandlerWeb>
);
