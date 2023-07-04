import * as React from "react";

import {
  mockAppointmentsSerialized,
  mockUpcomingAppointmentWithDetailsWithForm,
} from "next-shared/src/mockData/mockAppointments";
import { mockReasonForVisit } from "next-shared/src/mockData/mockFhirPatientResources";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { IFormResources } from "next-shared/src/types/types";
import { mockCreditCard } from "next-shared/src/mockData/mockCreditCard";

import { PendingStyleDebug } from "../../debug/PendingStyleDebug";
import { AppointmentWithDetails } from ".";
import { VStack } from "../../structure/VStack";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  useDebug({
    test: { componentName: "AppointmentWithDetails", scenario: "standard" },
  });
  return (
    <AppointmentWithDetails
      appointmentWithDetails={{
        appointment: mockAppointmentsSerialized[0],
      }}
    />
  );
};

export const DemoWithLocation = () => {
  useDebug({
    test: { componentName: "AppointmentWithDetails", scenario: "location" },
  });
  return (
    <AppointmentWithDetails
      appointmentWithDetails={{
        appointment: mockAppointmentsSerialized[0],
        location: mockNextLocations[0],
      }}
    />
  );
};

export const DemoWithLocationAndHcp = () => {
  useDebug({
    test: { componentName: "AppointmentWithDetails", scenario: "location-hcp" },
  });
  return (
    <AppointmentWithDetails
      appointmentWithDetails={{
        appointment: mockAppointmentsSerialized[0],
        location: mockNextLocations[0],
        hcp: mockHcps[0],
      }}
    />
  );
};

export const DemoWithForm = () => {
  useDebug({
    test: { componentName: "AppointmentWithDetails", scenario: "form" },
  });
  return (
    <AppointmentWithDetails
      appointmentWithDetails={{
        appointment: mockAppointmentsSerialized[0],
        location: mockNextLocations[0],
        hcp: mockHcps[0],
        forms: [mockReasonForVisit[0]],
      }}
    />
  );
};

export const DemoWithPayment = () => {
  useDebug({
    test: { componentName: "AppointmentWithDetails", scenario: "payment" },
  });
  const payment = mockCreditCard;
  return (
    <AppointmentWithDetails
      appointmentWithDetails={{
        ...mockUpcomingAppointmentWithDetailsWithForm,
        payment,
      }}
    />
  );
};

export const DemoCancel = () => {
  const { setOutput } = useDebug({
    test: { componentName: "AppointmentWithDetails", scenario: "cancel" },
  });

  const handleSetResult = async (id: string) => {
    setOutput(id);
  };

  const payment = mockCreditCard;
  return (
    <VStack>
      <AppointmentWithDetails
        appointmentWithDetails={{
          appointment: mockAppointmentsSerialized[0],
          location: mockNextLocations[0],
          hcp: mockHcps[0],
          forms: [mockReasonForVisit[0]],
        }}
        onCancelAppointment={handleSetResult}
      />
      <AppointmentWithDetails
        appointmentWithDetails={{
          ...mockUpcomingAppointmentWithDetailsWithForm,
          payment,
        }}
        onCancelAppointment={handleSetResult}
      />
    </VStack>
  );
};

export const DemoEditForm = () => {
  const { setOutput } = useDebug({
    test: { componentName: "AppointmentWithDetails", scenario: "edit" },
  });

  const handleSetResult = async (
    formSlug: string,
    prefillData: IFormResources,
  ) => {
    setOutput({ formSlug, prefillData });
  };

  return (
    <AppointmentWithDetails
      appointmentWithDetails={{
        appointment: mockAppointmentsSerialized[0],
        location: mockNextLocations[0],
        hcp: mockHcps[0],
        forms: [mockReasonForVisit[0]],
      }}
    />
  );
};

export const DemoWithFormCompact = () => {
  useDebug({
    test: { componentName: "AppointmentWithDetails", scenario: "compact" },
  });
  return (
    <PendingStyleDebug>
      <div style={{ height: "250px" }}>
        <AppointmentWithDetails
          appointmentWithDetails={{
            appointment: mockAppointmentsSerialized[0],
            location: mockNextLocations[0],
            hcp: mockHcps[0],
            forms: [mockReasonForVisit[0]],
          }}
        />
      </div>
    </PendingStyleDebug>
  );
};
