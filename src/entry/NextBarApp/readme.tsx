import * as React from "react";
import { useCallback, useEffect } from "react";
import { random } from "lodash";

import { SimpleEventEmitter } from "next-shared/src/lib/SimpleEventEmitter";
import { IEhrPatientSummary } from "next-shared/src/types/IEhrPatientSummary";
import { mockStaffSessionWithNextBarApp } from "next-shared/src/mockData/mockAuth";
import { mockMedicalStaffMembers } from "next-shared/src/mockData/mockMedicalStaffMembers";
import { IEhrUser } from "next-shared/src/types/helixTypes";
import { MedicalStaffMember } from "next-shared/src/models/MedicalStaffMember";
import {
  EVENT_CLOSE_PATIENT,
  EVENT_LOGIN,
  EVENT_LOGOUT,
  EVENT_MEDICATION_CHANGED,
  EVENT_OPEN_PATIENT,
  EVENT_SEND_BOOKING_CONFIRMATION,
} from "next-shared/src/types/watcherEventNames";
import {
  mockPatientInHelixNoAssociation,
  mockPatientInHelixNoAssociationWithMatch,
  mockPatientInHelixWithAssociation,
  mockPatientInHelixWithAssociationAndUpdates,
} from "next-shared/src/mockData/mockPatients";

import { showToast } from "../../components/generic/Toast";
import { SessionPatientTypeDebug } from "../../components/debug/SessionPatientTypeDebug";
import { helixConsultNotesBoxId } from "../../helpers/helixDomIdentifiers";
import { NextBarApp } from ".";
import { useDebug } from "../../debug/DemoWrapper";

import { useClient } from "../../hooks/useClient";
import { useConfig } from "../../hooks/core/useConfig";
import { useSyncedSessionData } from "../../hooks/core/useSyncedSessionData";
import { MockEhrProvider } from "../../contexts/EhrContext/MockEhrProvider";

const ehrWatcher = new SimpleEventEmitter();
const domInjectElId = "inject";
const LOCAL_STORAGE_HELIX_PATIENT_ID = "debug:nextBarDemoHelixPatientId";

/**
 * Emit an EVENT_LOGIN event through the ehrWatcher
 * @param realClient
 * @param ehrId
 */
const emitLoginEvent = (realClient: boolean = false, ehrId: string) => {
  if (!realClient) {
    ehrWatcher.emit(EVENT_LOGIN, {
      userCode: "??",
      id: ehrId,
      role: "GP",
    });
  } else {
    ehrWatcher.emit(EVENT_LOGIN, {
      userCode: "??",
      id: ehrId,
      role: "GP",
    });
  }
};

const gpUser: IEhrUser = {
  userCode: "??",
  id: mockStaffSessionWithNextBarApp.staffMemberId,
  role: "GP",
};

const staffUser: IEhrUser = {
  userCode: "??",
  id: mockStaffSessionWithNextBarApp.staffMemberId,
  role: "Practice Manager",
};

/**
 * Injects consult note into the dom to simulate helix dom changes.
 */
const handleInjectNotesContainer = () => {
  if (!!document.getElementById(helixConsultNotesBoxId)) return;
  const containerEl = document.getElementById(domInjectElId);
  const container = document.createElement("div");
  container.id = helixConsultNotesBoxId;
  const text = document.createTextNode("Consult notes:");
  containerEl.append(text, container);
};

/**
 * Remove the consult note if it's in the dom. This is another helix dom simulation method
 */
const handleRemoveNotesContainer = () => {
  const containerEl = document.getElementById(domInjectElId);
  if (containerEl) {
    containerEl.innerHTML = "";
  }
};

/**
 * A hook that checks if there's an EHR staff member in the session,
 * and invokes the callback if it does.
 * @param onSessionHasStaffMember - Invoked when there's an EHR staff member in session
 */
const useSetStaffMemberFromSession = (
  onSessionHasStaffMember: (ehrStaffMemberId: string) => void,
) => {
  const config = useConfig();
  const client = useClient();

  useEffect(() => {
    const ehrStaffMember = client?.auth?.session?.staffMember;
    if (ehrStaffMember && ehrStaffMember instanceof MedicalStaffMember) {
      emitLoginEvent(config.useRealClient, ehrStaffMember.ehrStaffMemberId);
      onSessionHasStaffMember(ehrStaffMember.ehrStaffMemberId);
    }
  }, [client?.auth?.session, config?.useRealClient, onSessionHasStaffMember]);
};

export const DemoStandard = () => {
  // appConfig: {sessionId: "practitioner-session-id"}
  const { setActions, setDebugElement, setOutput } = useDebug({
    isFixed: true,
    fixedFullscreen: false,
    setSessionDebug: true,
  });
  const config = useConfig();
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();

  const helixPatientIdRef = React.useRef<HTMLInputElement>();
  const helixStaffMemberIdRef = React.useRef<HTMLInputElement>();

  const onSessionHasStaffMember = useCallback(
    (sessionStaffMemberId: string) => {
      if (helixStaffMemberIdRef?.current) {
        helixStaffMemberIdRef.current.value = sessionStaffMemberId;
      }
    },
    [helixStaffMemberIdRef],
  );

  useEffect(() => {
    setActions([
      {
        label: `Helix: ${EVENT_LOGIN} as GP`,
        action: () => {
          ehrWatcher.emit(EVENT_LOGIN, gpUser);
        },
      },
      {
        label: `Helix: ${EVENT_LOGIN} as Staff`,
        action: () => {
          ehrWatcher.emit(EVENT_LOGIN, staffUser);
        },
      },
      {
        label: `Helix: ${EVENT_LOGOUT}`,
        action: () => {
          ehrWatcher.emit(EVENT_LOGOUT);
        },
      },
      {
        label: `Helix: ${EVENT_OPEN_PATIENT} (with match)`,
        action: () => {
          ehrWatcher.emit(
            EVENT_OPEN_PATIENT,
            mockPatientInHelixNoAssociationWithMatch,
          );
        },
      },
      {
        label: `Helix: ${EVENT_OPEN_PATIENT} (no match)`,
        action: () => {
          ehrWatcher.emit(EVENT_OPEN_PATIENT, mockPatientInHelixNoAssociation);
        },
      },
      {
        label: `Helix: ${EVENT_OPEN_PATIENT} (next patient)`,
        action: () => {
          ehrWatcher.emit(
            EVENT_OPEN_PATIENT,
            mockPatientInHelixWithAssociation,
          );
        },
      },
      {
        label: `Helix: ${EVENT_OPEN_PATIENT} (next patient with updates)`,
        action: () => {
          ehrWatcher.emit(
            EVENT_OPEN_PATIENT,
            mockPatientInHelixWithAssociationAndUpdates,
          );
        },
      },
      {
        label: `Helix: ${EVENT_CLOSE_PATIENT}`,
        action: () => {
          ehrWatcher.emit(EVENT_CLOSE_PATIENT);
        },
      },
      {
        label: `Helix: ${EVENT_SEND_BOOKING_CONFIRMATION}`,
        action: () => {
          ehrWatcher.emit(EVENT_SEND_BOOKING_CONFIRMATION);
        },
      },
      {
        label: nextPatient
          ? `Helix: ${EVENT_MEDICATION_CHANGED}`
          : `Helix: ${EVENT_MEDICATION_CHANGED} (DISABLED)`,
        action: () => {
          if (!nextPatient) return;
          ehrWatcher.emit(EVENT_MEDICATION_CHANGED, {
            medicationCount: random(0, 1000),
            patientId: nextPatient?.patientId,
          });
        },
      },
      {
        label: "Inject container",
        action: handleInjectNotesContainer,
      },
      {
        label: "Remove container",
        action: handleRemoveNotesContainer,
      },
      {
        label: "Show toast",
        action: () => showToast("Hello world"),
      },
    ]);
  }, [setActions, nextPatient]);

  useSetStaffMemberFromSession(onSessionHasStaffMember);

  // load a real patient
  // TODO: add action support to make it easier to do using the action items
  const handleSetHelixPatient = useCallback(() => {
    setHelixPatient(helixPatientIdRef.current.value);
  }, []);

  const setHelixPatient = useCallback((idStr: string) => {
    if (!config.useRealClient) {
      ehrWatcher.emit(EVENT_OPEN_PATIENT, mockPatientInHelixWithAssociation);
      return;
    }

    const id = parseInt(idStr, 10);
    if (Number.isNaN(id)) {
      console.warn("Input patient ID was not a number");
      return;
    }

    const helixPatient: IEhrPatientSummary = {
      DOB: new Date().toDateString(),
      email: "",
      id,
      name: "LOADING REAL PATIENT...",
    };

    ehrWatcher.emit(EVENT_OPEN_PATIENT, helixPatient);

    localStorage.setItem(LOCAL_STORAGE_HELIX_PATIENT_ID, idStr);
  }, []);

  useEffect(() => {
    const id = localStorage.getItem(LOCAL_STORAGE_HELIX_PATIENT_ID);
    if (id) setHelixPatient(id);
  }, []);

  useEffect(() => {
    if (!helixPatientIdRef.current) {
      return;
    }
    const id = localStorage.getItem(LOCAL_STORAGE_HELIX_PATIENT_ID);
    helixPatientIdRef.current.value = id;
  }, [helixPatientIdRef.current]);

  const handleSetRealHelixStaff = () => {
    if (config.useRealClient) {
      const staffId = parseInt(helixStaffMemberIdRef.current.value, 10);
      emitLoginEvent(true, `${staffId}`);
    }
  };

  useEffect(() => {
    if (!config.useRealClient) {
      emitLoginEvent(false, mockMedicalStaffMembers[0].ehrId);
    }
  }, [config.useRealClient]);

  const isAppSession = !!client.auth.session?.app;

  useEffect(() => {
    setDebugElement(
      <>
        <SessionPatientTypeDebug />
        <h4>Staff</h4>
        <div>{client.auth.session?.staffMember?.staffMemberId}</div>
        <h4>Manually Trigger</h4>
        {config.useRealClient && (
          <>
            {isAppSession && (
              <>
                <p>
                  Please not that the bar does not respond automatically to
                  staff changes as these do not happen during a session. Please
                  update the patient to trigger a remote update.
                </p>
                <label htmlFor="real-staff-input">
                  Helix Staff
                  <input
                    ref={helixStaffMemberIdRef}
                    id="real-staff-input"
                    type="Text"
                    placeholder="Helix staff ID"
                  />
                </label>
                <button onClick={handleSetRealHelixStaff}>
                  Set staff member
                </button>
              </>
            )}
            <label htmlFor="real-patient-input">
              Helix Patient
              <input
                id="real-patient-input"
                ref={helixPatientIdRef}
                type="text"
                placeholder="Helix patient ID"
              />
            </label>
            <button onClick={handleSetHelixPatient}>Set patient</button>
          </>
        )}
      </>,
    );
  }, [config, client.auth.session]);

  return (
    <>
      <div id={domInjectElId} />
      <MockEhrProvider>
        <NextBarApp />
      </MockEhrProvider>
    </>
  );
};
