import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { CSSTransition } from "react-transition-group";

import { TNextBarModeType } from "next-shared/src/types/types";
import { ICreditCard } from "next-shared/src/types/ICreditCard";
import { IPaydockSubscription } from "next-shared/src/types/PaydockTypes";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { EStaffAlertType } from "next-shared/src/types/staffAlerts";

import { INextBarTab } from "../../../entry/NextBarApp";
import { ICssTransition } from "../../../helpers/cssTransitions";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import {
  PatientSummary,
  PatientSummaryAlerts,
} from "../../atoms/PatientSummary";
import { NextBarLoginPromptModal } from "../../bar/NextBarLoginPromptModal";
import { TabIcon } from "../../generic/TabIcon";
import { useClient } from "../../../hooks/useClient";
import { filterOutUnauthorizedRoutes } from "../../structure/MainView/helpers/filterOutUnAuthorizedRoutes";
import { useGetPhotoUrl } from "../../../hooks/useGetPhotoUrl";
import { NextBarContext } from "../../handlers/NextBarHandler";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { HcpBarSummary } from "../../atoms/HcpBarSummary";
import { Button } from "../../generic/Button";
import { nextBarEnvironments } from "../../../types/IBarEnvironment";
import { NextBarSettingsModal } from "../../bar-panels/NextBarSettingsModal";
import CircularIcon from "../../generic/CircularIcon";
import { useSyncedEhrPatientAppointments } from "../../../hooks/patient/useSyncedEhrPatientAppointments";
import { usePatientPaymentDetailsForGatewayId } from "../../../hooks/patient/usePatientPaymentDetailsForGatewayId";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";
import { EOptionalEhrDemographicsRequiredByNext } from "next-shared/src/types/ICheckForMatchingPatientResult";
const css = cssComposer(styles, "NextBarView");

export const transition: ICssTransition = {
  appear: styles.panelTransitionAppear,
  appearActive: styles.panelTransitionAppearActive,
  enter: styles.panelTransitionEnter,
  enterActive: styles.panelTransitionEnterActive,
  exit: styles.panelTransitionExit,
  exitActive: styles.panelTransitionExitActive,
};

export interface INextBarViewProps {
  tabs: INextBarTab[];
  mode: TNextBarModeType;
}

export interface INextPaymentDetails {
  subscription: null | IPaydockSubscription;
  creditCard: ICreditCard;
}

interface IEhrPatientDetails {
  patientSummary: {
    name?: string;
    DOB?: string;
  };
  missingDetails?: EOptionalEhrDemographicsRequiredByNext[];
}

export const NextBarView: React.FC<INextBarViewProps> = ({ tabs, mode }) => {
  const client = useClient();
  const { ehrPatient, nextPatient, scope } = useSyncedSessionData();
  const { activeLocation: currentLocation } = useActiveLocation();

  const { isMissingFormForToday } = useSyncedEhrPatientAppointments(
    ehrPatient?.association?.ehrId,
    ehrPatient?.association?.ehrPatientId,
  );

  const { patientPaymentDetails } = usePatientPaymentDetailsForGatewayId(
    nextPatient?.patientId,
    currentLocation?.paydockServiceId,
    currentLocation?.slug,
    nextPatient?.paymentInformationUpdatedAt,
  );

  const availableRoutes: INextBarTab[] = filterOutUnauthorizedRoutes(
    tabs,
    client.auth.session,
  );

  const { loadingPatientDetails, isOutOfDate, pushToScope } =
    useRequiredContext(NextBarContext);
  const [selectedTabIndex, setSelectedTabIndex] = useState<null | number>(null);
  const { url: patientPhotoUrl } = useGetPhotoUrl(nextPatient?.fhir);

  const staffMember = scope?.staffMember || client.auth.session?.staffMember;

  const { patientSummary, missingDetails } = useMemo<IEhrPatientDetails>(() => {
    if (loadingPatientDetails) return { patientSummary: loadingPatientDetails };

    if (!ehrPatient) return { patientSummary: null };
    if (!ehrPatient.fhir) {
      console.warn("ehrPatient.fhir missing", ehrPatient);
      return { patientSummary: null };
    }
    const patientUtil = fhirUtil<FhirPatientUtil>(ehrPatient.fhir);

    return {
      patientSummary: {
        name: patientUtil.getDisplayName(),
        DOB: ehrPatient.fhir.birthDate,
      },
      missingDetails: patientUtil.getMissingNextDetails(),
    };
  }, [loadingPatientDetails, ehrPatient]);

  // kinda hack, but this allows us to close any opened tabs while loading patient
  // e.g. switching to different patients in ehr UI and seeing stale data until the load is done
  useEffect(() => {
    if (!loadingPatientDetails) return;
    setSelectedTabIndex(null);
  }, [loadingPatientDetails]);

  const [showSettings, setShowSettings] = useState<boolean>(false);
  const toggleSettings = () => setShowSettings(!showSettings);

  // colour based on the environment or scope label
  const environment = localStorage.getItem("envName");
  const scopeColor = environment
    ? nextBarEnvironments.find((e) => e.name === environment)?.color
    : scope?.hexColor;

  const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);

  if (!client.auth.session) {
    return (
      <div className={css("")}>
        <div className={css("bar")}>
          <div className={css("overlay")}>
            <div />
            <Button
              onClick={() => setShowLoginPrompt(true)}
              variant="secondary"
            >
              Login
            </Button>
            <CircularIcon
              onClick={toggleSettings}
              name="maintenance-solid"
              size={EStandardSizes.Small}
            />
          </div>
        </div>
        <NextBarLoginPromptModal
          loginMode={mode}
          open={showLoginPrompt}
          onClose={() => setShowLoginPrompt(false)}
        />
        <NextBarSettingsModal open={showSettings} onClose={toggleSettings} />
      </div>
    );
  }

  // TODO consider moving to services
  let alerts = [];

  if (missingDetails?.length) {
    alerts.push({
      type: EStaffAlertType.Danger,
      icon: "alert-danger",
      text: "Missing details",
      description: `Missing the following: ${missingDetails.join(", ")}`,
    });
  }

  if (nextPatient) {
    alerts.push({
      type: EStaffAlertType.Highlight,
      icon: "alert-linked",
      text: "Linked",
      description: "Patient linked to clinic",
    });
  }

  if (isMissingFormForToday) {
    alerts.push({
      type: EStaffAlertType.Warning,
      icon: "alert-reason-for-visit-available",
      text: "Missing prefill",
      description: "Appointment form not provided",
    });
  }

  if (nextPatient && patientPaymentDetails) {
    if (!patientPaymentDetails.creditCard) {
      alerts.push({
        type: EStaffAlertType.Warning,
        icon: "icon-alert-credit-card-available",
        text: "No card",
        description: "No card set for patient",
      });
    }
    // TODO subscriptions for certain clinics?
  }

  // issues from the server
  if (nextPatient?.staffAlerts) {
    alerts = [...alerts, ...nextPatient.staffAlerts];
  }

  const selectedTab =
    selectedTabIndex === null ? null : availableRoutes[selectedTabIndex];
  return (
    <div className={css("")}>
      <CSSTransition
        in={selectedTab !== null}
        classNames={transition}
        unmountOnExit={true}
        mountOnEnter={true}
        timeout={500}
      >
        <div className={css("tab")}>
          {selectedTab && <selectedTab.component />}
        </div>
      </CSSTransition>
      <div
        className={css("bar")}
        style={{
          backgroundColor: scopeColor,
        }}
      >
        <div className={css("patient")}>
          {!!patientSummary && (
            <PatientSummary
              name={patientSummary.name}
              dob={patientSummary.DOB}
              photoUrl={patientPhotoUrl}
              isLoading={!!loadingPatientDetails}
            >
              {!!alerts && <PatientSummaryAlerts alerts={alerts} />}
            </PatientSummary>
          )}
        </div>
        <div className={css("icons")}>
          {availableRoutes
            .filter((i) => !i.hidden)
            .map((item, i) =>
              item.disabled ? (
                <div className={css("icon")} key={i}>
                  <TabIcon
                    icon={item.icon}
                    label={item.label}
                    disabled={true}
                    badge={!!loadingPatientDetails ? undefined : item.badge}
                    badgeVariant={item.badgeVariant}
                  />
                </div>
              ) : (
                <div
                  key={i}
                  className={css("icon", {
                    "-active": selectedTabIndex === i,
                  })}
                  onClick={() =>
                    setSelectedTabIndex(selectedTabIndex === i ? null : i)
                  }
                >
                  <TabIcon
                    isSelected={selectedTabIndex === i}
                    icon={item.icon}
                    label={item.label}
                    disabled={false}
                    badge={!!loadingPatientDetails ? undefined : item.badge}
                    badgeVariant={item.badgeVariant}
                  />
                </div>
              ),
            )}
        </div>
        <div className={css("logo")}>
          <HcpBarSummary
            staffMemberId={staffMember?.staffMemberId}
            onClick={toggleSettings}
          />
        </div>
        {isOutOfDate && (
          <div className={css("overlay")}>
            <div />
            <Button
              onClick={pushToScope}
              showChevron={true}
              size={EStandardSizes.Medium}
            >
              Start using &quot;{scope?.displayLabel}&quot;
            </Button>
            <CircularIcon
              onClick={toggleSettings}
              name="maintenance-solid"
              size={EStandardSizes.Small}
            />
          </div>
        )}
      </div>
      <NextBarSettingsModal open={showSettings} onClose={toggleSettings} />
    </div>
  );
};
