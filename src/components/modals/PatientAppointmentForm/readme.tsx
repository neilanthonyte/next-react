import * as React from "react";
import { useState } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { mockAppointmentsWithDetails } from "next-shared/src/mockData/mockAppointments";
import { IFormResources } from "next-shared/src/types/types";

import { PatientAppointmentForm } from ".";

export const DemoStandard = () => {
  const [result, setResult] = useState(null);
  const [formSlug, setFormSlug] = useState<string>(null);

  const appointmentWithDetailsWithForm = mockAppointmentsWithDetails.find(
    (a) => !!a.forms,
  );

  if (!appointmentWithDetailsWithForm) {
    console.error("No mock appointments with form found");
  }

  const { appointment, forms } = appointmentWithDetailsWithForm;
  const appointmentId = appointment.id;
  const ehrId = fhirUtil(appointment).getOriginEhrId();

  const handleOnClick = () => {
    setFormSlug(
      fhirUtil<FhirObservationUtil>(forms[0]).getObservationFormSlug(),
    );
  };

  const handleOnSuccess = (formData: IFormResources) => {
    setResult(formData);
    setFormSlug(null);
  };

  return (
    <div data-test="PatientAppointmentFormModal-scenario-standard">
      <div data-test="component">
        <PatientAppointmentForm
          appointmentId={appointmentId}
          ehrId={ehrId}
          formSlug={formSlug}
          onCancel={() => setFormSlug(null)}
          onSuccess={handleOnSuccess}
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};
