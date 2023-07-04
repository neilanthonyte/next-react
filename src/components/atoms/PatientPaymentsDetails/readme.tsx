import * as React from "react";
import { useEffect, useState } from "react";

import { NextLocation } from "next-shared/src/models/NextLocation";
import { generateFhirPatient } from "next-shared/src/mockData/generateFhirPatient";

import { useDebug } from "../../../debug/DemoWrapper";
import { useLocations } from "../../../hooks/content/useLocations";
import { VStack } from "../../structure/VStack";
import { EPaymentDetailsPatientSource, PatientPaymentDetails } from ".";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export const DemoStandard = () => {
  const { setActions, setDebugElement } = useDebug({
    test: { componentName: "PatientPaymentDetails", scenario: "standard" },
    requireSession: "patient",
    setSessionDebug: true,
  });

  const [showInlineForm, setShowInlineForm] = useState<boolean>(false);
  const [activeLocation, setActiveLocation] = useState<NextLocation>();
  const [patientSource, setPatientSource] =
    useState<EPaymentDetailsPatientSource>(
      EPaymentDetailsPatientSource.Session,
    );
  const [patient, setPatient] = useState<fhir3.Patient>();

  const { nextPatient } = useSyncedSessionData();
  const { locations } = useLocations();

  useEffect(() => {
    setActions([
      {
        label: "Show inline form if no credit card",
        action: () => setShowInlineForm(true),
      },
      {
        label: "Show summary if no credit card",
        action: () => setShowInlineForm(false),
      },
      {
        label: "Set patient source to session",
        action: () => {
          setPatientSource(EPaymentDetailsPatientSource.Session);
          setPatient(undefined);
        },
      },
      {
        label: "Set patient source to props",
        action: async () => {
          setPatientSource(EPaymentDetailsPatientSource.Props);
          const mockPatient = await generateFhirPatient();
          setPatient(mockPatient);
        },
      },
      ...(locations || []).map((loc) => ({
        label: `Set ${loc.title}`,
        action: () => setActiveLocation(loc),
      })),
    ]);
  }, [locations]);

  useEffect(() => {
    setDebugElement(
      <div>
        <div>Active location: {activeLocation?.title}</div>
        <div>GatewayId: {activeLocation?.paydockServiceId}</div>
        <div>Patient source: {patientSource}</div>
        <div>
          Patient:
          {patientSource === EPaymentDetailsPatientSource.Session ? (
            <pre>{JSON.stringify(nextPatient?.fhir, null, 2)}</pre>
          ) : (
            <pre>{JSON.stringify(patient, null, 2)}</pre>
          )}
        </div>
      </div>,
    );
  }, [patient, patientSource, activeLocation]);

  return (
    <PatientPaymentDetails
      patientSource={patientSource}
      patient={patient}
      showInlineForm={showInlineForm}
      gatewayId={activeLocation?.paydockServiceId}
    />
  );
};
