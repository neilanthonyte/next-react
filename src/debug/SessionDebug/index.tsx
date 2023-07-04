import * as React from "react";
import { useCallback, useMemo, useRef, useState } from "react";

import { TNextBarModeType } from "next-shared/src/types/types";
import {
  mockStaffSession,
  mockMedicalStaffSessionWithApp,
  mockMedicalStaffSessionWithAppAndPatient,
  mockStaffSessionWithDashboardAppAndPatient,
  mockStaffSessionWithNextBarApp,
  mockPatientSession,
  mockPatientSessionWithCreditCard,
  mockPatientSessionWithExpiredCreditCard,
  mockPatientSessionWithoutCreditCard,
  mockMedicalStaffSession,
  mockStaffMemberSession,
  mockCompanionSessionEmpty,
} from "next-shared/src/mockData/mockAuth";
import { generatePatientSession } from "next-shared/src/mockData/generatePatientSession";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { PatientLoginModal } from "../../components/modals/PatientLoginModal";
import { PatientLogOutModal } from "../../components/modals/PatientLogOutModal";
import { AppContext } from "../../contexts/AppContext";
import { ConfigContext } from "../../contexts/ConfigContext";
import { useClient } from "../../hooks/useClient";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import { Button } from "../../components/generic/Button";
import { List, ListItem } from "../../components/structure/List";
import { Popover } from "../../components/generic/Popover";
import { ClientSession } from "next-shared/src/models/ClientSession";

export interface ISessionDebugProps {
  mockSessionMode?: TNextBarModeType;
}

/**
 * Debug used for setting / deleting sessions (login/logout).
 * Provides different behaviors depending on the App config settings
 * It requires a ConfigContext provider (supplied by AppHandler)
 */
export const SessionDebug: React.FC<ISessionDebugProps> = ({
  mockSessionMode,
}) => {
  const { config } = useRequiredContext(ConfigContext);
  return config.useRealClient ? (
    <RealSessionDebug />
  ) : (
    <MockSessionDebug mockSessionMode={mockSessionMode} />
  );
};

const RealSessionDebug = () => {
  const client = useClient();

  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [logOutModal, setLogOutModal] = useState<boolean>(false);

  const closeLogOutModal = () => setLogOutModal(false);
  const logOut = () => {
    client.auth.logout();
    closeLogOutModal();
  };

  const sessionIdInput = useRef<HTMLInputElement>();

  const setSessionId = () => {
    const sessionId = sessionIdInput.current.value;
    if (!sessionId) {
      return;
    }
    client.auth.setSessionFromSessionId(sessionId);
  };

  return (
    <>
      {/* <h4>Session</h4> */}
      <p>
        {client.auth.session ? (
          <>
            {client.auth.session.id} ({" "}
            <a onClick={() => setLogOutModal(true)}>logout</a> )
          </>
        ) : (
          <>
            No session - <a onClick={() => setLoginModal(true)}>login</a> OR{" "}
            <input
              ref={sessionIdInput}
              onChange={setSessionId}
              placeholder="Set session ID"
            ></input>
          </>
        )}
      </p>
      {/* <SessionPersistenceDebug /> */}
      <PatientLoginModal
        open={loginModal}
        onClose={() => setLoginModal(false)}
      />
      <PatientLogOutModal
        open={logOutModal}
        onLogOut={logOut}
        onDismiss={closeLogOutModal}
      />
    </>
  );
};

const LABEL_GENERATE_SESSION_FOR_PATIENT = "Generate patient session...";

export const MockSessionDebug: React.FC<ISessionDebugProps> = ({
  mockSessionMode,
}) => {
  const client = useClient();

  // session handling
  const login = () => {
    if (!mockSessionMode) {
      // HACK only works for mock
      client.auth.loginAsPatient("ignore", "ignore");
      return;
    }
    const session =
      mockSessionMode === "app"
        ? mockStaffSessionWithNextBarApp
        : mockStaffMemberSession;
    client.auth.setSession(session);
  };

  const logout = () => {
    client.auth.logout();
  };

  const sessionId = client.auth.session?.id;

  const options: { [key: string]: ClientSession } = {
    "Set staff session": mockStaffSession,
    "Set staff member session": mockStaffMemberSession,
    "Set medical staff member session": mockMedicalStaffSession,
    "Set companion session empty": mockCompanionSessionEmpty,
    "Set staff session with app": mockMedicalStaffSessionWithApp,
    "Set staff session with app and patient":
      mockMedicalStaffSessionWithAppAndPatient,
    "Set staff session with dashboard app and patient":
      mockStaffSessionWithDashboardAppAndPatient,
    "Set staff session with next bar app": mockStaffSessionWithNextBarApp,
    [LABEL_GENERATE_SESSION_FOR_PATIENT]: null,
    "Set patient session": mockPatientSession,
    "Set patient session with credit card": mockPatientSessionWithCreditCard,
    "Set patient session without credit card":
      mockPatientSessionWithoutCreditCard,
    "Set patient session with expired credit card":
      mockPatientSessionWithExpiredCreditCard,
  };

  const [showLoginOptions, setShowLoginOptions] = useState<boolean>(false);

  const setSession = async (key: string) => {
    let session = options[key];
    if (key === LABEL_GENERATE_SESSION_FOR_PATIENT) {
      session = await generatePatientSession();
    } else {
      session = options[key];
    }
    client.auth.setSession(session);
  };

  const SessionOptions = useCallback(() => {
    return (
      <List scale="compact">
        {Object.keys(options).map((label) => (
          <ListItem key={label} onClick={() => setSession(label)}>
            {label}
          </ListItem>
        ))}
      </List>
    );
  }, []);

  const SessionButton: React.ReactElement = useMemo(
    () => (
      <Button
        size={EStandardSizes.Small}
        variant={"secondary"}
        onClick={() => setShowLoginOptions(!showLoginOptions)}
      >
        Log in...
      </Button>
    ),
    [],
  );

  return (
    <>
      {sessionId && (
        <Button
          size={EStandardSizes.Small}
          variant={"secondary"}
          onClick={logout}
        >
          Log out
        </Button>
      )}
      {!sessionId && (
        <Popover
          open={showLoginOptions}
          target={SessionButton}
          closeHandler={() => setShowLoginOptions(false)}
        >
          <SessionOptions />
        </Popover>
      )}
      <p>
        Session:{" "}
        {client.auth.session ? client.auth.session.sessionId : "Logged out"}
      </p>
      {/* <SessionPersistenceDebug /> */}
    </>
  );
};

const SessionPersistenceDebug = () => {
  const client = useClient();
  const {
    sessionPersistenceComplete,
    sessionPersistenceError,
    sessionPersistenceLoading,
    sessionPersistenceRetry,
  } = useRequiredContext(AppContext);
  return (
    <>
      <h4>Session persistence</h4>
      <p>
        {sessionPersistenceComplete && "Complete"}
        {sessionPersistenceLoading && "Loading..."}
        {Boolean(sessionPersistenceError) && "Error"}
        {sessionPersistenceError && (
          <>
            {" ("}
            <a onClick={sessionPersistenceRetry}>retry</a>
            {" | "}
            <a onClick={() => client.auth.logout()}>logout</a>)
          </>
        )}
      </p>
    </>
  );
};
