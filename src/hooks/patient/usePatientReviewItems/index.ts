import { useMemo } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import {
  IGroupedPatientMedicalResources,
  MedicalResourceType,
  PatientMedicalResource,
} from "next-shared/src/types/types";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { useSyncedPatientMedicalResources } from "../useSyncedPatientMedicalResources";
import { useSyncedEhrPatientAppointments } from "../useSyncedEhrPatientAppointments";

const sortByLastModifiedDesc = (
  ob1: fhir3.Observation,
  ob2: fhir3.Observation,
): number => {
  const utilOb1 = fhirUtil<FhirObservationUtil>(ob1);
  const utilOb2 = fhirUtil<FhirObservationUtil>(ob2);
  return utilOb2.getLastModified() - utilOb1.getLastModified();
};

export interface IPatientReviewItems {
  reviewMetrics: PatientMedicalResource[];
  reviewLifestyle: PatientMedicalResource[];
  patientForms: PatientMedicalResource[];
  patientAppointments: IAppointmentWithDetails[];
  reviewMetricsCounter: number;
  reviewLifestyleCounter: number;
  patientFormsCounter: number;
  patientAppointmentsCounter: number;
  reviewTotalCount: number;
  errorMedicalResources: Error | null;
  errorAppointments: Error | null;
  isLoadingMedicalResources: boolean;
  isLoadingAppointments: boolean;
  refetchMedicalResources: () => Promise<void | IGroupedPatientMedicalResources>;
}

/**
 * Hook handling patient reviewable items based on available patient medical resources
 *
 * TODO isReviewItem on fhirUtil takes a cms location slug instead of ehrId
 * We will also need to review the multiple centre id / Helix tenancy setup and config
 */
export const usePatientReviewItems = ({
  nextPatientId,
  ehrPatientId,
  locationSlug,
  ehrId,
}: {
  nextPatientId?: string;
  ehrPatientId?: string;
  locationSlug?: string;
  ehrId?: string;
}): IPatientReviewItems => {
  const {
    patientMetrics,
    patientSubmittedInformation,
    patientLifestyle,
    isLoading: isLoadingMedicalResources,
    error: errorMedicalResources,
    refetch: refetchMedicalResources,
  } = useSyncedPatientMedicalResources(nextPatientId);

  const {
    patientAppointments: { todays: todaysAppointments },
    isLoading: isLoadingAppointments,
    error: errorAppointments,
  } = useSyncedEhrPatientAppointments(ehrId, ehrPatientId);

  const { reviewMetrics, reviewMetricsCounter } = useMemo(() => {
    if (!patientMetrics)
      return { reviewMetrics: null, reviewMetricsCounter: 0 };
    const _reviewMetrics = Object.values(patientMetrics)
      .reduce((acc, current) => {
        return acc.concat(
          current.filter((obs) => fhirUtil(obs).isReviewItem(locationSlug)),
        );
      }, [])
      .sort(sortByLastModifiedDesc);
    return {
      reviwMetrics: _reviewMetrics,
      reviewMetricsCounter: _reviewMetrics.length,
    };
  }, [patientMetrics]);

  const { reviewLifestyle, reviewLifestyleCounter } = useMemo(() => {
    if (!patientLifestyle)
      return { reviewLifestyle: null, reviewLifestyleCounter: 0 };
    const _reviewLifestyle = Object.values(patientLifestyle)
      .reduce((acc, current) => {
        return acc.concat(
          current.filter((obs) => fhirUtil(obs).isReviewItem(locationSlug)),
        );
      }, [])
      .sort(sortByLastModifiedDesc);
    return {
      reviewLifestyle: _reviewLifestyle,
      reviewLifestyleCounter: _reviewLifestyle.length,
    };
  }, [patientLifestyle]);

  const { patientForms, patientFormsCounter } = useMemo(() => {
    if (
      !patientSubmittedInformation ||
      !patientSubmittedInformation[MedicalResourceType.PatientForm]
    )
      return { patientForms: null, patientFormsCounter: 0 };
    const _patientForms = [
      ...patientSubmittedInformation[MedicalResourceType.PatientForm],
      ...patientSubmittedInformation[MedicalResourceType.OnboardingForm],
    ]
      .filter((item) => fhirUtil(item).isReviewItem(locationSlug))
      .sort(sortByLastModifiedDesc);
    return {
      patientForms: _patientForms,
      patientFormsCounter: _patientForms.length,
    };
  }, [patientSubmittedInformation]);

  const { patientAppointments, patientAppointmentsCounter } = useMemo(() => {
    if (!todaysAppointments)
      return { patientAppointments: null, patientAppointmentsCounter: 0 };

    const _patientAppointments = todaysAppointments.filter(
      // there is at least one review item
      (appt) =>
        !!appt.forms?.length &&
        appt.forms.filter((form) => fhirUtil(form).isReviewItem(locationSlug)),
    );

    return {
      patientAppointments: _patientAppointments,
      patientAppointmentsCounter: _patientAppointments.length,
    };
  }, [todaysAppointments]);

  return useMemo(
    () => ({
      reviewMetrics,
      reviewLifestyle,
      patientForms,
      patientAppointments,
      reviewMetricsCounter,
      reviewLifestyleCounter,
      patientFormsCounter,
      patientAppointmentsCounter,
      reviewTotalCount:
        reviewMetricsCounter +
        reviewLifestyleCounter +
        patientFormsCounter +
        patientAppointmentsCounter,
      errorAppointments,
      errorMedicalResources,
      isLoadingAppointments,
      isLoadingMedicalResources,
      refetchMedicalResources,
    }),
    [
      reviewMetrics,
      reviewMetricsCounter,
      reviewLifestyle,
      reviewLifestyleCounter,
      patientForms,
      patientFormsCounter,
      patientAppointments,
      patientAppointmentsCounter,
      errorAppointments,
      errorMedicalResources,
      isLoadingAppointments,
      isLoadingMedicalResources,
      refetchMedicalResources,
    ],
  );
};
