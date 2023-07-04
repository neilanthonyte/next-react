import * as React from "react";
import { useEffect, useState } from "react";

import { mockAppointmentTypes } from "next-shared/src/mockData/mockAppointmentTypes";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { mockPatients } from "next-shared/src/mockData/mockPatients";

import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingPayment } from ".";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { useClient } from "../../../hooks/useClient";
import { BookingProvider } from "../BookingProvider";
import { useDebug } from "../../../debug/DemoWrapper";
import {
  mockPatientSessionWithoutCreditCard,
  mockPatientSessionWithCreditCard,
  mockPatientSessionWithExpiredCreditCard,
} from "next-shared/src/mockData/mockAuth";

const optionalPaymentType = mockAppointmentTypes.find(
  (a) => a.requireCard === false && a.patientType !== "new",
);

const requiredPaymentType = mockAppointmentTypes.find(
  (a) => a.requireCard === true && a.deposit === 0 && a.patientType !== "new",
);

const requiredPaymentDepositType = mockAppointmentTypes.find(
  (a) => a.requireCard === true && a.deposit > 0 && a.patientType !== "new",
);

export const DemoStandard = () => {
  return (
    <BookingProvider
      preselection={{
        location: mockNextLocations[0].slug,
        hcp: mockHcps[0].slug,
        appointmentType: optionalPaymentType.slug,
      }}
    >
      <Inner />
    </BookingProvider>
  );
};

const Inner: React.FC = ({}) => {
  const { setActions, setOutput } = useDebug();
  const client = useClient();

  const { setAppointmentType, setPatient, existingCard, newCard } =
    useRequiredContext(BookingContext);

  useEffect(() => {
    setActions([
      {
        label: "Set patient, no Credit Card",
        action: () =>
          client.auth.setSession(mockPatientSessionWithoutCreditCard),
      },
      {
        label: "Set patient, with Credit Card",
        action: () => client.auth.setSession(mockPatientSessionWithCreditCard),
      },
      {
        label: "Set patient, with expired Credit Card",
        action: () =>
          client.auth.setSession(mockPatientSessionWithExpiredCreditCard),
      },
      {
        label: "Set patient (1)",
        action: () => setPatient(mockPatients[0].fhir),
      },
      {
        label: "Set patient (2)",
        action: () => setPatient(mockPatients[1].fhir),
      },
      {
        label: "Set appointment, optional card",
        action: () => setAppointmentType(optionalPaymentType),
      },
      {
        label: "Set appointment, require card",
        action: () => setAppointmentType(requiredPaymentType),
      },
      {
        label: "Set appointment, require payment",
        action: () => setAppointmentType(requiredPaymentDepositType),
      },
      {
        label: "Mock error: fetch payment details",
        action: () =>
          (window.location.href = addParamsToUrl({
            debugClientMethodsError: ["payments.getPaymentDetails"],
          })),
      },
      {
        label: "Mock error: set payment details",
        action: () =>
          (window.location.href = addParamsToUrl({
            debugClientMethodsError: ["payments.setPaymentMethod"],
          })),
      },
    ]);
  }, []);

  useEffect(() => {
    setOutput({ existingCard, newCard });
  }, [existingCard, newCard]);

  const [success, setSuccess] = useState<boolean>(false);

  return (
    <>
      {success ? (
        <div>
          <h2>Success!</h2>
          <a onClick={() => setSuccess(false)}>Go back</a>
        </div>
      ) : (
        <BookingPayment onSuccess={() => setSuccess(true)} />
      )}
    </>
  );
};
