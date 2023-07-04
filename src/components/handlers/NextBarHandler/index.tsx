import * as React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { IEhrPatientSummary } from "next-shared/src/types/IEhrPatientSummary";
import { IEhrUser } from "next-shared/src/types/helixTypes";
import { TNextBarModeType } from "next-shared/src/types/types";

import { useClient } from "../../../hooks/useClient";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { AppContext } from "../../../contexts/AppContext";
import { StaffMember } from "next-shared/src/models/StaffMember";
import { Scope } from "next-shared/src/models/Scope";
import { EhrContext } from "../../../contexts/EhrContext/EhrContext";

const getBarMode = (localUser: IEhrUser) => {
  return localUser?.role === "GP" ? "app" : "staffMember";
};

/**
 * Support the functionality previously provided by the toast widget.
 */
export interface INextBarNotification {
  title: string;
  description?: string;
  icon?: string;
}

export interface INextBarContextValue {
  loadingPatientDetails: null | {
    name?: string;
    DOB?: string;
  };
  mode: TNextBarModeType;
  isOutOfDate: boolean;
  pushToScope: () => unknown;
}

/**
 * Context exposing details of patient being loaded in the NextBar
 */
export const NextBarContext = React.createContext<INextBarContextValue>({
  loadingPatientDetails: undefined,
  mode: undefined,
  isOutOfDate: undefined,
  pushToScope: undefined,
});

interface ILocalData {
  staffMember?: StaffMember;
  localPatient?: IEhrPatientSummary;
  ehrId?: string;
  scope?: Scope;
}

/**
 * Handler exposing NextBarContext with details of patient being loaded
 */
export const NextBarHandler: React.FC = ({ children }) => {
  const client = useClient();

  const {
    currentPatient: localPatient,
    currentUser: localUser,
    appointmentsRevision,
  } = useRequiredContext(EhrContext);

  const session = client.auth.session;

  const { setGlobalSimplePatientEhrAssociation } =
    useRequiredContext(AppContext);

  // the EHR patient in the scope/session
  const { scope } = useSyncedSessionData();
  // indicates that this bar is not consistent with the remote scope
  const [isOutOfDate, setIsOutOfDate] = useState<boolean>(false);

  const [loadingPatientDetails, setLoadingPatientDetails] =
    useState<IEhrPatientSummary>(null);

  const barMode = getBarMode(localUser);

  const [staffMember, setStaffMember] = useState<StaffMember>();

  // convert Helix user to
  useEffect(() => {
    if (!localUser?.id) return;
    (async () => {
      // its loaded in regardless of the session
      if (!session?.id) return;
      const staffMember = await client.staffMembers.retrieveStaffMemberByEhrId(
        localUser.id,
      );
      setStaffMember(staffMember);
    })();
  }, [localUser?.id, session?.id]);

  // this effect will only run for advocate bar (staff member session)
  useEffect(() => {
    if (session?.staffMember) setStaffMember(staffMember);
  }, [session?.staffMember]);

  const localData = useRef<ILocalData>({});

  // access to data without requiring a condition in a use effect
  localData.current = {
    staffMember,
    localPatient,
    scope,
  };

  // push our state to the remote scope
  const pushToScope = useCallback(async () => {
    // ensure we are using the latest data without needing to trigger extra updates
    const { staffMember, localPatient, scope } = localData.current;

    setLoadingPatientDetails(localPatient);

    await client.scopes.setScopeUsers(scope.scopeId, {
      staffMemberId: staffMember?.staffMemberId || null,
      ehrPatientId: localPatient?.id.toString() || null,
    });
  }, []);

  useEffect(() => {
    // assume a scope change indicates the remote has our state
    setLoadingPatientDetails(null);
  }, [scope]);

  // patient opened/closed - given this shows explicit intent, we assume it's safe to push the
  // state to the scope
  useEffect(() => {
    if (scope) {
      pushToScope();
    } else {
      setGlobalSimplePatientEhrAssociation(
        localPatient
          ? {
              ehrPatientId: localPatient.id.toString(),
              // get ehrId from either scope or staff member (fetched from helix watcher or session staff member)
              ehrId: scope?.ehrId || client.auth.session?.staffMember?.ehrId,
            }
          : null,
      );
    }
  }, [localPatient?.id]); // IMPORTANT: do not add anything else to this

  // scope remotely changed - it should not try to update the scope, but
  // rather prompt the user to do so
  useEffect(() => {
    if (!scope) {
      return;
    }

    // ensure we are using the latest data
    const { localPatient } = localData.current;
    if (
      scope.staffMemberId != staffMember?.staffMemberId ||
      scope.ehrPatientId != localPatient?.id.toString()
    ) {
      // prompt the user as to whether they want to force their own state back on the scope
      setIsOutOfDate(true);
    } else {
      setIsOutOfDate(false);
    }
  }, [scope, staffMember, localData.current.localPatient?.id]);

  useEffect(
    () => {
      const ehrPatientId = localPatient?.id.toString();
      if (ehrPatientId) {
        void client.appointments.notifyAppointmentChangeSubscribers(
          ehrPatientId,
        );
      }
    },
    // only run this effect if there's a change to patient appointments
    [appointmentsRevision],
  );

  const value = useMemo<INextBarContextValue>(
    () => ({
      loadingPatientDetails,
      mode: barMode,
      isOutOfDate: !loadingPatientDetails && isOutOfDate,
      pushToScope,
    }),
    [loadingPatientDetails, barMode, isOutOfDate, pushToScope],
  );

  return (
    <NextBarContext.Provider value={value}>{children}</NextBarContext.Provider>
  );
};
