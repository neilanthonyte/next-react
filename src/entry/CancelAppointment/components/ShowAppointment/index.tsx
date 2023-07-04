import React from "react";
import moment from "moment";

import { Button } from "next-react/src/components/generic/Button";
import {
  ErrorMessage,
  MessageTitle,
  MessageBody,
} from "next-react/src/components/generic/Message";
import { AppointmentCard } from "next-react/src/components/resources/AppointmentCard";
import { ErrorPlaceholder } from "next-react/src/components/structure/ErrorPlaceholder";
import { NextLocation } from "next-shared/src/models/NextLocation";

interface IShowAppointmentProps {
  appointment: fhir3.Appointment;
  onCancelAppointment: () => any;
  hasFailed: boolean;
  location: NextLocation;
}

export const ShowAppointment: React.FC<IShowAppointmentProps> = ({
  appointment,
  onCancelAppointment,
  hasFailed,
  location,
}) => {
  // strip timezone for safety
  const bookedFor = appointment.start.split("+")[0];
  const cancellationHours = location.cancellationHours || 24;
  const hoursUntilAppointment =
    moment(bookedFor).diff(moment()) / 1000 / 60 / 60;

  const getContent = () => {
    if (hoursUntilAppointment < cancellationHours) {
      return (
        <ErrorMessage>
          <MessageTitle>
            You cannot cancel within {cancellationHours} hours of the
            appointment date.
          </MessageTitle>
          <MessageBody>
            Please contact your clinic if you require further assistance
          </MessageBody>
        </ErrorMessage>
      );
    }
    if (appointment.status === "cancelled") {
      return (
        <ErrorMessage>
          <MessageTitle>
            Your appointment has already been cancelled.
          </MessageTitle>
          <MessageBody>
            Please contact your clinic if you require further assistance
          </MessageBody>
        </ErrorMessage>
      );
    }
    return (
      <div>
        <header className="-center" style={{ marginBottom: "16px" }}>
          <h3>Appointment details</h3>
        </header>
        <AppointmentCard appointment={appointment} />
        <div style={{ marginTop: "32px", textAlign: "center" }}>
          {hasFailed ? (
            <ErrorPlaceholder retry={() => onCancelAppointment()} />
          ) : (
            <Button onClick={() => onCancelAppointment()}>
              Cancel appointment
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>{getContent()}</div>
  );
};
