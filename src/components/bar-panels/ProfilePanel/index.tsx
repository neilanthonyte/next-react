import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import {
  EPatientDataSelection,
  IPatientDataSection,
} from "next-shared/src/types/IPatientDataSection";
import { defaultPatientDataSections } from "next-shared/src/helpers/defaultPatientDataSections";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
  NextBarPanelInfoPaneDecoration,
} from "../../bar/NextBarPanel";
import { PendingContent } from "../../structure/PendingContent";
import { PatientEhrAssociation } from "../../atoms/PatientEhrAssociation";
import { AccessCode } from "../../atoms/AccessCode";
import { PatientDataSectionsStatus } from "../../atoms/PatientDataSectionsStatus";
import { PatientsComparisonModal } from "../../modals/PatientsComparisonModal";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { useClient } from "../../../hooks/useClient";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { usePatientStatus } from "../../../hooks/patient/usePatientStatus";
const css = cssComposer(styles, "ProfilePanel");

export interface IProfilePanelProps {}

/**
 * Component rendering information about the most relevant patient in the session
 */
export const ProfilePanel: React.FC<IProfilePanelProps> = ({}) => {
  const { ehrPatient } = useSyncedSessionData();
  return (
    <NextBarPanel>
      <NextBarPanelInfoPane actions={null}>
        <NextBarPanelInfoPaneTitle>Patient profile</NextBarPanelInfoPaneTitle>
        <NextBarPanelInfoPaneBody>
          View the status of the patient profile and their link information
        </NextBarPanelInfoPaneBody>
        <NextBarPanelInfoPaneDecoration>
          <PendingContent check={!!ehrPatient}>
            <PatientEhrAssociation ehrAssociation={ehrPatient?.association} />
          </PendingContent>
        </NextBarPanelInfoPaneDecoration>
      </NextBarPanelInfoPane>
      <NextBarPanelContentPane>
        <div className={css("")}>
          <RequireEhrPatientOnly>
            <EhrPatientProfile />
          </RequireEhrPatientOnly>
          <RequireNextPatient>
            <NextPatientProfile />
          </RequireNextPatient>
        </div>
      </NextBarPanelContentPane>
    </NextBarPanel>
  );
};

export const EhrPatientProfile = () => {
  const { ehrPatient } = useSyncedSessionData();

  const {
    patientDataSections,
    isLoading,
    error,
    refetch: refetchPatientStatus,
  } = usePatientStatus();

  const { hasMatch, message } = useMemo(() => {
    const _hasMatch = !!patientDataSections && patientDataSections.length > 0;
    return {
      hasMatch: _hasMatch,
      message: error
        ? "To start the signup process, please ask the patient to scan the QR code using their phone, or assign them to a companion."
        : _hasMatch
        ? "The patient appears to have a matching Next Practice account. You can import more details once they have linked their account. To link, either ask the patient to scan the QR code using their phone, or assign them to a companion."
        : "The patient does not appear to have a matching Next Practice account. To start the signup process, please ask the patient to scan the QR code using their phone, or assign them to a companion.",
    };
  }, [patientDataSections, error]);

  // TODO handle loading and error
  return (
    <PatientProfileContent>
      <PatientProfileMain>
        <PendingContent check={!isLoading}>
          <PatientProfileTitle>Link patient account</PatientProfileTitle>
          <PatientProfileMessage>{message}</PatientProfileMessage>
          {!!error ? (
            <ErrorPlaceholder
              title="Unable to check for any matching Next patients."
              retry={refetchPatientStatus}
            />
          ) : (
            hasMatch && (
              <div className={css("match")}>
                <PatientDataSectionsStatus
                  title="Matching Next patient available data"
                  dataSections={patientDataSections}
                />
              </div>
            )
          )}
        </PendingContent>
      </PatientProfileMain>
      <PatientProfileAccessCode code={ehrPatient?.appAccessCode} />
    </PatientProfileContent>
  );
};

export const NextPatientProfile = () => {
  const client = useClient();
  const [showImportModal, setShowImportModal] = useState<boolean>(false);
  const { ehrPatient, nextPatient } = useSyncedSessionData();

  const {
    patientDataSections,
    isLoading,
    error,
    refetch: refetchPatientStatus,
  } = usePatientStatus();

  const { hasUpdates, message } = useMemo(() => {
    const _hasUpdates =
      !!patientDataSections &&
      patientDataSections.some((section) => section.status === "updated");
    return {
      hasUpdates: _hasUpdates,
      message: _hasUpdates
        ? "Some of the data provided by the patient appears to be more recent. You can review the items below and import those that are more recent:"
        : "No updates available. The patient records match.",
    };
  }, [patientDataSections]);

  const preppedSections = useMemo<IPatientDataSection[]>(() => {
    if (!patientDataSections) return null;
    return patientDataSections.map((section) => {
      const { name, status } = section;
      const sectionWithMeta = defaultPatientDataSections.find(
        (s) => s.name === name,
      );
      return {
        ...sectionWithMeta,
        selection:
          status === "matching"
            ? EPatientDataSelection.Match
            : EPatientDataSelection.Ehr,
      };
    });
  }, [patientDataSections]);

  const handleOnSave = useCallback(
    async (updatedFhirPatient: fhir3.Patient) => {
      // impossible, but just in case
      if (!ehrPatient) return;
      // error handling inside patient comparison component,
      // where button executing this method is rendered
      await client.patients.updateEhrPatient(
        ehrPatient.association.ehrPatientId,
        updatedFhirPatient,
      );
      setShowImportModal(false);
    },
    [ehrPatient],
  );

  return (
    <PatientProfileContent>
      <PatientProfileMain>
        {!!error && !isLoading ? (
          <ErrorPlaceholder
            title="Unable to check for patient record updates."
            retry={refetchPatientStatus}
          />
        ) : (
          <PendingContent check={!isLoading}>
            <PatientProfileTitle>Patient updates</PatientProfileTitle>
            <PatientProfileMessage>{message}</PatientProfileMessage>
            {hasUpdates && (
              <div className={css("match")}>
                <PatientDataSectionsStatus
                  dataSections={patientDataSections}
                  action={{
                    label: "Review and import",
                    onClick: () => setShowImportModal(true),
                  }}
                  showStatus={true}
                />
              </div>
            )}
          </PendingContent>
        )}
        <PatientsComparisonModal
          open={showImportModal}
          ehrPatient={ehrPatient?.fhir}
          nextPatient={nextPatient?.fhir}
          sections={preppedSections}
          onClose={() => setShowImportModal(false)}
          onSave={handleOnSave}
          ehrId={ehrPatient?.association?.ehrId}
        />
      </PatientProfileMain>
    </PatientProfileContent>
  );
};

export const RequireEhrPatientOnly: React.FC = ({ children }) => {
  const { nextPatient } = useSyncedSessionData();
  if (nextPatient) return null;
  return <>{children}</>;
};

export const RequireNextPatient: React.FC = ({ children }) => {
  const { nextPatient } = useSyncedSessionData();
  if (!nextPatient) return null;
  return <>{children}</>;
};

export const PatientProfileTitle: React.FC = ({ children }) => (
  <h4>{children}</h4>
);

export const PatientProfileMessage: React.FC = ({ children }) => (
  <p className={css("message")}>{children}</p>
);

export interface IQRAssosiaciontCodeProps {
  code: string;
}

export const PatientProfileAccessCode: React.FC<IQRAssosiaciontCodeProps> = ({
  code,
}) => (
  <div className={css("accessCode")}>
    <AccessCode
      code={code}
      showAppStoreLinks={false}
      size="sm"
      showInstructions={false}
    />
  </div>
);

export const PatientProfileContent: React.FC = ({ children }) => (
  <div className={css("content")}>{children}</div>
);

export const PatientProfileMain: React.FC = ({ children }) => (
  <div className={css("main")}>{children}</div>
);
