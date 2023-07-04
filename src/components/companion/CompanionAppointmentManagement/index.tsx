import * as React from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirAppointmentUtil } from "next-shared/src/fhirUtil/utilClasses/FhirAppointmentUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { MedicalResourceType } from "next-shared/src/types/types";

import { computeAppointmentWithDetailsPlaceholder } from "../../../helpers/computeAppointmentWithDetailsPlaceholder";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useSyncedEhrPatientAppointments } from "../../../hooks/patient/useSyncedEhrPatientAppointments";
import { useAppointmentTypes } from "../../../hooks/useAppointmentTypes";
import { EhrPatientAppointments } from "../../atoms/EhrPatientAppointments";
import { PatientAppointmentForm } from "../../modals/PatientAppointmentForm";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { VStack } from "../../structure/VStack";
import { Message, MessageBody } from "../../generic/Message";
import { AppointmentFormObservation } from "../../atoms/AppointmentFormObservation";
import { DialogFooter } from "../../structure/Dialog";
import { Resource } from "../../generic/Resource";

export interface ICompanionAppointmentManagementProps {
  onComplete: () => unknown;
}

export const CompanionAppointmentManagement: React.FC<
  ICompanionAppointmentManagementProps
> = ({ onComplete }) => {
  const { ehrPatient } = useSyncedSessionData();
  const { data: appointmentTypes } = useAppointmentTypes();

  // if missing prefill information
  const { patientAppointments, ...fetchProps } =
    useSyncedEhrPatientAppointments(
      ehrPatient?.association?.ehrId,
      ehrPatient?.association?.ehrPatientId,
    );

  const todaysAppointments = patientAppointments?.todays;

  // hone in on a single appointment for today
  const todaysAppointment =
    patientAppointments?.todays?.length === 1 && patientAppointments.todays[0];
  // the existing form for an appointment
  const existingForm =
    todaysAppointment?.forms?.length === 1 && todaysAppointment?.forms[0];
  // flesh out to something with default details, including form
  const primaryAppointment =
    todaysAppointment && appointmentTypes
      ? computeAppointmentWithDetailsPlaceholder(
          todaysAppointment,
          appointmentTypes,
        )
      : null;
  // the single form for a fleshed out appointment
  const primaryForm =
    primaryAppointment?.forms?.length === 1 && primaryAppointment?.forms[0];

  // is simple case if there is a single appointment with a single form
  const isSimpleCase = primaryForm
    ? {
        formSlug:
          fhirUtil<FhirObservationUtil>(primaryForm).getObservationFormSlug(),
        prefillData: { [MedicalResourceType.ReasonForVisit]: primaryForm },
        ehrId: fhirUtil<FhirAppointmentUtil>(
          primaryAppointment.appointment,
        ).getOriginEhrId(),
        appointmentId: primaryAppointment.appointment.id,
      }
    : null;

  const getContent = () => {
    if (!todaysAppointments) return null;

    if (todaysAppointments.length === 0) {
      return (
        <VStack>
          <Message>
            <MessageBody>
              You do not appear to have any appointments for today. Please speak
              to our friendly care team for assistance.
            </MessageBody>
          </Message>
          <DialogFooter acceptLabel="Next" onAccept={onComplete} />
        </VStack>
      );
    }

    if (isSimpleCase) {
      // use the same view as the profile to handle multiple appointments
      if (existingForm) {
        return (
          <VStack>
            <div>
              <p>
                Please review your reason for visit form. Click{" "}
                <strong>Edit</strong> to make any changes.
              </p>
            </div>
            <AppointmentFormObservation
              form={existingForm}
              appointmentWithDetails={todaysAppointments[0]}
              onFormSaveSuccess={onComplete}
            />
            <DialogFooter acceptLabel="Next" onAccept={onComplete} />
          </VStack>
        );
      }

      // directly embed the form
      return (
        <VStack>
          <p>Please complete your reason for visit form.</p>
          <Resource>
            <PatientAppointmentForm
              formSlug={isSimpleCase.formSlug}
              prefillData={isSimpleCase.prefillData}
              appointmentId={isSimpleCase.appointmentId}
              ehrId={isSimpleCase.ehrId}
              onSuccess={onComplete}
              onCancel={onComplete}
            />
          </Resource>
        </VStack>
      );
    }
    return (
      <VStack>
        <p>Please complete any missing reason for visit forms.</p>
        <EhrPatientAppointments variant="today" />
        <DialogFooter acceptLabel="Next" onAccept={onComplete} />
      </VStack>
    );
  };

  return <LoadingBlock {...fetchProps}>{getContent()}</LoadingBlock>;
};
