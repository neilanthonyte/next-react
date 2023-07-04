import { createBlankObservation } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import { MedicalResourceType } from "next-shared/src/types/types";
import { getReasonForVisitFormSlug } from "next-shared/src/helpers/getReasonForVisitFormSlug";
import { findAppointmentTypeFromAppointment } from "next-shared/src/helpers/findAppointmentTypeFromAppointment";
import { AppointmentType } from "next-shared/src/models/AppointmentType";

/**
 * Flesh out an appointment with suitable placeholder details, based on the appointment details and
 * the known appointment types.
 *
 * @param apptWithDetails
 * @param appointmentTypes
 * @returns
 */
export const computeAppointmentWithDetailsPlaceholder = (
  apptWithDetails: IAppointmentWithDetails,
  appointmentTypes: AppointmentType[],
) => {
  const { appointment, forms, location } = apptWithDetails;

  if (forms?.length > 0) {
    return apptWithDetails;
  }
  if (!appointmentTypes) {
    return null;
  }

  const appointmentType = findAppointmentTypeFromAppointment(
    appointment,
    appointmentTypes,
  );

  const slug = getReasonForVisitFormSlug({ appointmentType, location });

  const formPlaceholder = createBlankObservation({
    type: MedicalResourceType.ReasonForVisit,
    title: "Pre-consult information",
    slug,
  });

  return { ...apptWithDetails, forms: [formPlaceholder] };
};
