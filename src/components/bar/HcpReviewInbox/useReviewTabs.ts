import { usePatientReviewItems } from "../../../hooks/patient/usePatientReviewItems";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

export enum EReviewTabs {
  Appointments = "Appointments",
  Metrics = "Metrics",
  Lifestyle = "Lifestyle",
  Forms = "Forms",
}
export type TReviewTabName = keyof typeof EReviewTabs;

interface IReviewTab {
  name: TReviewTabName;
  label: string;
  counter?: number;
  isLoading: boolean;
}

/**
 * Helper hook used to generate review inbox tabbed content tabs
 */
export const useReviewTabs = (): IReviewTab[] => {
  const { nextPatient, ehrPatient, scope } = useSyncedSessionData();

  const {
    reviewMetricsCounter,
    reviewLifestyleCounter,
    patientFormsCounter,
    patientAppointments,
    isLoadingAppointments,
    isLoadingMedicalResources,
  } = usePatientReviewItems({
    nextPatientId: nextPatient?.patientId,
    ehrPatientId: ehrPatient?.ehrPatientId,
    locationSlug: scope?.cmsLocationSlug,
    ehrId: scope?.ehrId,
  });

  return [
    {
      name: "Appointments",
      label: "Appointments",
      counter: patientAppointments?.length,
      isLoading: isLoadingAppointments,
    },
    {
      name: "Metrics",
      label: "Metrics",
      counter: reviewMetricsCounter,
      isLoading: isLoadingMedicalResources,
    },
    {
      name: "Lifestyle",
      label: "Lifestyle",
      counter: reviewLifestyleCounter,
      isLoading: isLoadingMedicalResources,
    },
    {
      name: "Forms",
      label: "Patient Forms",
      counter: patientFormsCounter,
      isLoading: isLoadingMedicalResources,
    },
  ];
};
