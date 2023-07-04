import * as React from "react";
import { useEffect, useMemo, useState } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirAppointmentUtil } from "next-shared/src/fhirUtil/utilClasses/FhirAppointmentUtil";
import {
  mockPastAppointmentWithDetailsWithForm,
  mockUpcomingAppointmentWithDetailsCancelled,
  mockUpcomingAppointmentWithDetailsNotCancellable,
  mockUpcomingAppointmentWithDetailsWithForm,
  mockUpcomingAppointmentWithDetailsWithoutForm,
} from "next-shared/src/mockData/mockAppointments";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { IDemoAction, useDebug } from "../../debug/DemoWrapper";
import { ManageAppointmentApp } from ".";

export const DemoStandard = () => {
  const [appointmentWithDetails, setAppointmentWithDetails] =
    useState<IAppointmentWithDetails>(null);
  const { setActions } = useDebug({
    test: { componentName: "ManageAppointmentApp", scenario: "standard" },
    appConfig: {
      debugClientMethodsError: [
        "appointments.cancelAppointment",
        "appointments.retrieveAppointment",
        "bookings.retrieveAppointmentTypes",
        "bookings.retrieveLocations",
        "forms.retrieveLocationForm",
      ],
    },
  });

  useEffect(() => {
    const actions: IDemoAction[] = [];
    actions.push(
      {
        label: "Set upcoming with form",
        action: () =>
          setAppointmentWithDetails(mockUpcomingAppointmentWithDetailsWithForm),
      },
      {
        label: "Set upcoming without form",
        action: () =>
          setAppointmentWithDetails(
            mockUpcomingAppointmentWithDetailsWithoutForm,
          ),
      },
      {
        label: "Set not cancellable",
        action: () =>
          setAppointmentWithDetails(
            mockUpcomingAppointmentWithDetailsNotCancellable,
          ),
      },
      {
        label: "Set cancelled",
        action: () =>
          setAppointmentWithDetails(
            mockUpcomingAppointmentWithDetailsCancelled,
          ),
      },
      {
        label: "Set past",
        action: () =>
          setAppointmentWithDetails(mockPastAppointmentWithDetailsWithForm),
      },
    );
    setActions(actions);
  }, []);

  const { ehrId, ehrAppointmentId, token } = useMemo(() => {
    return {
      ehrId: appointmentWithDetails?.location?.ehrId,
      ehrAppointmentId: appointmentWithDetails?.appointment?.id,
      token: appointmentWithDetails
        ? fhirUtil<FhirAppointmentUtil>(
            appointmentWithDetails.appointment,
          ).getCancellationToken()
        : undefined,
    };
  }, [appointmentWithDetails]);

  return (
    <ManageAppointmentApp
      ehrId={ehrId}
      ehrAppointmentId={ehrAppointmentId}
      token={token}
    />
  );
};
