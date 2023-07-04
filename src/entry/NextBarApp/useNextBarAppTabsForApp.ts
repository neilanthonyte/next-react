import { useMemo } from "react";
import { EEhrKey } from "next-shared/src/types/EEhrKey";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import { CompanionsPanel } from "../../components/bar-panels/CompanionsPanel";
import { InstructionsPanel } from "../../components/bar-panels/InstructionsPanel";
import { LettersPanel } from "../../components/bar-panels/LettersPanel";
import { PaymentsPanel } from "../../components/bar-panels/PaymentsPanel";
import { ReviewsPanel } from "../../components/bar-panels/ReviewsPanel";
import { useClient } from "../../hooks/useClient";
import { usePatientReviewItems } from "../../hooks/patient/usePatientReviewItems";
import { useSyncedSessionData } from "../../hooks/core/useSyncedSessionData";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import { NextBarContext } from "../../components/handlers/NextBarHandler";
import { useSyncedEhrPatientAppointments } from "../../hooks/patient/useSyncedEhrPatientAppointments";
import { INextBarTab } from ".";
import { EhrContext } from "../../contexts/EhrContext/EhrContext";
import { AppointmentsPanel } from "../../components/bar-panels/AppointmentsPanel";
import { ProfilePanel } from "../../components/bar-panels/ProfilePanel";
import { usePatientStatus } from "../../hooks/patient/usePatientStatus";

/**
 * Hook providing tabs for app type session based on active patient
 */
export const useNextBarAppTabsForApp = (): INextBarTab[] => {
  const client = useClient();

  const session = client.auth.session;

  const { underlyingEhr } = useRequiredContext(EhrContext);

  const { ehrPatient, nextPatient, scope } = useSyncedSessionData();
  const { loadingPatientDetails } = useRequiredContext(NextBarContext);

  const { ehrId, locationSlug } = useMemo(() => {
    return {
      // for providers, we pull the staff member from the scope (they might be on the session,
      // but we shouldn't rely on this). For advocates, the staff member is available via the session
      ehrId: scope?.ehrId || session?.staffMember?.ehrId,
      locationSlug:
        scope?.cmsLocationSlug || session?.staffMember?.cmsLocationSlug,
    };
  }, [session, scope]);

  const isPatientOfEhr: boolean = useMemo(() => {
    if (!nextPatient || !ehrId || !!loadingPatientDetails) {
      return false;
    }
    return nextPatient.isPatientOfEhr(ehrId);
  }, [nextPatient, ehrId, loadingPatientDetails]);

  const { reviewTotalCount } = usePatientReviewItems({
    nextPatientId: nextPatient?.patientId,
    ehrPatientId: ehrPatient?.ehrPatientId,
    locationSlug,
    ehrId,
  });

  const {
    patientAppointments: { all: allAppointments, todays: todaysAppointments },
  } = useSyncedEhrPatientAppointments(ehrId, ehrPatient?.ehrPatientId);

  const appointmentsWithPaymentsCount = useMemo(() => {
    if (!allAppointments) return 0;
    return allAppointments.filter((a) => !!a.payment).length;
  }, [allAppointments]);

  const { patientDataSections, numberOfUpdates: profileUpdates } =
    usePatientStatus();

  const hasMatchingNext = useMemo<boolean>(() => {
    return !nextPatient && (patientDataSections || []).length > 0;
  }, [nextPatient, patientDataSections]);

  return useMemo<INextBarTab[]>(() => {
    // if this is a "Next EHR Bar", then show appointments and manage tab to support the advocate functions.
    // but don't show the documents tab as it's not yet supported.
    // only show if it's a Helix bar
    const nextEhrTabs =
      underlyingEhr === EEhrKey.HelloHealth
        ? [
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
              badgeVariant: hasMatchingNext
                ? TColorVariants.Success
                : undefined,
            },
          ]
        : [];

    const nonNetEhrTabs =
      underlyingEhr !== EEhrKey.HelloHealth
        ? [
            {
              icon: "drawer",
              label: "Documents",
              disabled: !isPatientOfEhr,
              component: LettersPanel,
            },
          ]
        : [];

    return [
      {
        icon: "ipad-2",
        label: "Companions",
        disabled: false,
        component: CompanionsPanel,
      },
      ...nextEhrTabs,
      {
        icon: "eye",
        label: "Reviews",
        component: ReviewsPanel,
        disabled: !ehrPatient,
        badge: reviewTotalCount,
      },
      {
        icon: "pencil",
        label: "Instructions",
        disabled: !isPatientOfEhr,
        component: InstructionsPanel,
      },
      ...nonNetEhrTabs,
      {
        icon: "lotus",
        label: "Payments",
        disabled: !ehrPatient,
        component: PaymentsPanel,
        badge: appointmentsWithPaymentsCount,
      },
    ];
  }, [
    underlyingEhr,
    todaysAppointments,
    hasMatchingNext,
    profileUpdates,
    isPatientOfEhr,
    reviewTotalCount,
    ehrPatient,
    appointmentsWithPaymentsCount,
  ]);
};
