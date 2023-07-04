import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirAppointmentUtil } from "next-shared/src/fhirUtil/utilClasses/FhirAppointmentUtil";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

/**
 * The variable that defines the delay time of the ratings tour item.
 */
const RATINGS_DELAY_TIME = 1800; // 30 minutes

/**
 * The variable that defines how old appointments are allowed to be before we do not show them in the ratings tour.
 */
const RATINGS_APPOINTMENT_EXPIRY = 60 * 60 * 24 * 30; // (60*60*24*30 = 2,592,000) this is 30 days.

/**
 * Helper function determining whether a given appointment is due for rating
 */
export const isAppointmentRatingDue = (
  appointment: fhir3.Appointment,
  lastCheckAt: unixTimestamp,
): boolean => {
  const isTelehealth =
    !!fhirUtil<FhirAppointmentUtil>(appointment).getTelehealthUrl();
  const momentAppointmentEnd = moment(appointment.end);
  let showPatientRatingAt: number;
  /**
   * We add in another 30 minutes because we do not want the ratings tour item to
   * show straight after the appointment whilst the patient advocate
   * is walking through the app with the patient.
   */
  if (isTelehealth) {
    // If telehealth, we leave the appointment in the upcoming section for the whole day
    // so start checking from the day after
    const isDayAfterEnded = momentAppointmentEnd
      .clone()
      .add(1, "days")
      .isSameOrBefore(moment(), "days");
    if (isDayAfterEnded) {
      showPatientRatingAt = momentAppointmentEnd.unix() + RATINGS_DELAY_TIME;
    }
  } else {
    showPatientRatingAt = momentAppointmentEnd.unix() + RATINGS_DELAY_TIME;
  }

  const now = currentUnixTimestamp();

  const differenceBetweenNowAppointmentEnd = now - momentAppointmentEnd.unix();

  const appointmentIsNotTooOld =
    differenceBetweenNowAppointmentEnd < RATINGS_APPOINTMENT_EXPIRY;

  return (
    lastCheckAt < showPatientRatingAt &&
    showPatientRatingAt < now &&
    appointmentIsNotTooOld
  );
};
