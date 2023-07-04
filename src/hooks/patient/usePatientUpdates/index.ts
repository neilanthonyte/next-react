import { useMemo } from "react";
import moment from "moment";

import { IPatientUpdates } from "next-shared/src/types/IPatientUpdates";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { Patient } from "next-shared/src/models/Patient";
import {
  ArticleAction,
  DocumentAction,
  InstructionAction,
  MedicationAction,
} from "next-shared/src/models/Action";

import { isAppointmentRatingDue } from "../../../helpers/isAppointmentRatingDue";
import { useSyncedActions } from "../../actions/useSyncedActions";
import { useSyncedPatientAppointments } from "../useSyncedPatientAppointments";

export interface IUsePatientUpdates extends IPatientUpdates {
  isLoading: boolean;
  actionsError: Error;
  appointmentsError: Error;
}

/**
 * Hook handling patient updates since last check
 * calls onPatientUpdates callback when new updates are available
 */
export const usePatientUpdates = (
  patient: Patient,
  lastCheck: unixTimestamp | null,
): IUsePatientUpdates => {
  const patientId = patient?.patientId;

  const {
    actions,
    isLoading: isLoadingActions,
    error: actionsError,
  } = useSyncedActions(patientId);

  const {
    patientAppointments: { past: pastAppointments },
    isLoading: isLoadingAppointments,
    error: appointmentsError,
  } = useSyncedPatientAppointments(patientId);

  // when loading the value will be undefined.
  // The first time a patient is onboarded, the value after fetching will be null
  const isReadyToCheck = typeof lastCheck !== "undefined";

  const lastCompletedAppointmentWithDetails = useMemo(() => {
    return (pastAppointments || []).reduce((previous, current) => {
      if (!previous) return current;

      const currentEnd = moment(current.appointment.end);
      const previousEnd = moment(previous.appointment.end);
      // if the current appointment end time is greater than the previous appointment's end time then its more recent, return it.
      if (currentEnd.isAfter(previousEnd)) return current;

      return previous;
    }, null);
  }, [pastAppointments]);

  const newAppointmentWithDetails = useMemo(() => {
    if (!isReadyToCheck || !lastCompletedAppointmentWithDetails) return null;
    const endedAt = moment(
      lastCompletedAppointmentWithDetails.appointment.end,
    ).unix();
    if (endedAt <= lastCheck) return null;
    return lastCompletedAppointmentWithDetails;
  }, [lastCompletedAppointmentWithDetails, lastCheck, isReadyToCheck]);

  const {
    newMedicationActions,
    newArticleActions,
    newDocumentActions,
    newInstructionActions,
  } = useMemo(() => {
    if (!isReadyToCheck) {
      return {
        newMedicationActions: null,
        newArticleActions: null,
        newDocumentActions: null,
        newInstructionActions: null,
      };
    }
    const allActions = actions || [];
    return {
      newMedicationActions: allActions.filter(
        (a) => a.type === "medication" && a.createdAt > lastCheck,
      ) as MedicationAction[],
      newArticleActions: allActions.filter(
        (a) => a.type === "article" && a.createdAt > lastCheck,
      ) as ArticleAction[],
      newDocumentActions: allActions.filter(
        (a) => a.type === "document" && a.createdAt > lastCheck,
      ) as DocumentAction[],
      newInstructionActions: allActions.filter(
        (a) => a.type === "instruction" && a.createdAt > lastCheck,
      ) as InstructionAction[],
    };
  }, [actions, lastCheck, isReadyToCheck]);

  const newAssociations = useMemo(() => {
    if (!isReadyToCheck) return null;
    return (patient?.ehrPatients || []).filter(
      (association) => association.linkedAt > lastCheck,
    );
  }, [patient, isReadyToCheck, lastCheck]);

  const appointmentWithDetailsToRate = useMemo(() => {
    if (!lastCompletedAppointmentWithDetails || !isReadyToCheck) return null;
    return isAppointmentRatingDue(
      lastCompletedAppointmentWithDetails.appointment,
      lastCheck,
    )
      ? lastCompletedAppointmentWithDetails
      : null;
  }, [lastCompletedAppointmentWithDetails, isReadyToCheck, lastCheck]);

  const updatesCounter = useMemo<number>(() => {
    if (!isReadyToCheck) return 0;
    let counter =
      newMedicationActions.length +
      newArticleActions.length +
      newDocumentActions.length +
      newInstructionActions.length +
      newAssociations.length;
    // HACK kindof. We don't want to show an update if nothing was added to the appointment
    // e.g. there is a new appointment but nothing to show
    if (!!newAppointmentWithDetails && counter > 0) counter += 1;
    return counter;
  }, [
    isReadyToCheck,
    newMedicationActions,
    newArticleActions,
    newDocumentActions,
    newInstructionActions,
    newAssociations,
    newAppointmentWithDetails,
  ]);

  return useMemo(() => {
    if (!isReadyToCheck) return;

    return {
      lastCompletedAppointmentWithDetails,
      newAppointmentWithDetails,
      newArticleActions,
      newMedicationActions,
      newDocumentActions,
      newInstructionActions,
      newAssociations,
      appointmentWithDetailsToRate,
      updatesCounter,
      isLoading: isLoadingActions || isLoadingAppointments,
      actionsError,
      appointmentsError,
    };
  }, [
    updatesCounter,
    isReadyToCheck,
    isLoadingActions,
    isLoadingAppointments,
    actionsError,
    appointmentsError,
  ]);
};
