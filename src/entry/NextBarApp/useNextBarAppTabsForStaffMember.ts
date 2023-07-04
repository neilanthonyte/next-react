import { useMemo } from "react";

import { NextBarRoleType } from "next-shared/src/types/types";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import { CompanionsPanel } from "../../components/bar-panels/CompanionsPanel";
import { LabResultsPanel } from "../../components/bar-panels/LabResultsPanel";
import { LettersPanel } from "../../components/bar-panels/LettersPanel";
import { PaymentsPanel } from "../../components/bar-panels/PaymentsPanel";
import { RoomsPanel } from "../../components/bar-panels/RoomsPanel";
import { useClient } from "../../hooks/useClient";
import { useSyncedSessionData } from "../../hooks/core/useSyncedSessionData";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import { AppointmentsPanel } from "../../components/bar-panels/AppointmentsPanel";
import { ProfilePanel } from "../../components/bar-panels/ProfilePanel";
import { usePatientStatus } from "../../hooks/patient/usePatientStatus";
import { NextBarContext } from "../../components/handlers/NextBarHandler";
import { useSyncedEhrPatientAppointments } from "../../hooks/patient/useSyncedEhrPatientAppointments";
import { INextBarTab } from ".";

/**
 * Hook providing tabs for staff member type session based on active patient
 */
export const useNextBarAppTabsForStaffMember = (): INextBarTab[] => {
  const client = useClient();

  const session = client.auth.session;

  const { ehrPatient, nextPatient } = useSyncedSessionData();
  const { loadingPatientDetails } = useRequiredContext(NextBarContext);

  const ehrId = useMemo(() => {
    return session?.staffMember?.ehrId;
  }, [session]);

  const isPatientOfEhr: boolean = useMemo(() => {
    if (!nextPatient || !ehrId || !!loadingPatientDetails) {
      return false;
    }
    return nextPatient.isPatientOfEhr(ehrId);
  }, [nextPatient, ehrId, loadingPatientDetails]);

  const { patientDataSections, numberOfUpdates: profileUpdates } =
    usePatientStatus();

  const hasMatchingNext = useMemo<boolean>(() => {
    return !nextPatient && (patientDataSections || []).length > 0;
  }, [nextPatient, patientDataSections]);

  const {
    patientAppointments: { all: allAppointments, todays: todaysAppointments },
  } = useSyncedEhrPatientAppointments(ehrId, ehrPatient?.ehrPatientId);

  const appointmentsWithPaymentsCount = useMemo(() => {
    if (!allAppointments) return 0;
    return allAppointments.filter((a) => !!a.payment).length;
  }, [allAppointments]);

  // const hasPayments = isPatientOfEhr || appointmentsWithPaymentsCount > 0;

  return useMemo<INextBarTab[]>(
    () => [
      {
        icon: "ipad-2",
        label: "Companions",
        component: CompanionsPanel,
      },
      {
        icon: "home",
        label: "Rooms",
        disabled: !(
          session &&
          session.staffMember &&
          session.staffMember.type === NextBarRoleType.MedicalStaffMember
        ),
        component: RoomsPanel,
      },
      {
        icon: "appointments",
        label: "Appointments",
        disabled: !ehrPatient,
        component: AppointmentsPanel,
        badge: todaysAppointments?.length,
      },
      {
        icon: "manage",
        label: "Profile",
        disabled: !ehrPatient,
        component: ProfilePanel,
        badge: hasMatchingNext ? "match" : profileUpdates,
        badgeVariant: hasMatchingNext ? TColorVariants.Success : undefined,
      },
      {
        icon: "lotus",
        label: "Payments",
        // disabled: !hasPayments,
        disabled: !ehrPatient,
        component: PaymentsPanel,
        badge: appointmentsWithPaymentsCount,
      },
      {
        icon: "drawer",
        label: "Documents",
        // disabled: patient.ehrHelixId == null,
        disabled: true,
        component: LettersPanel,
      },
      // {
      //   icon: "lab",
      //   label: "Lab results",
      //   // disabled: patient.ehrHelixId == null,
      //   disabled: true,
      //   component: LabResultsPanel,
      // },
    ],
    [
      ehrPatient,
      session,
      isPatientOfEhr,
      profileUpdates,
      hasMatchingNext,
      allAppointments,
      appointmentsWithPaymentsCount,
    ],
  );
};
