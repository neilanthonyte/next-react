import * as React from "react";
import { useMemo } from "react";

import { EhrPatient } from "next-shared/src/models/EhrPatient";
import { Patient } from "next-shared/src/models/Patient";
import { Scope } from "next-shared/src/models/Scope";
import { ISimplePatientEhrAssociation } from "next-shared/src/types/IPatientEhrAssociation";

import { useSyncedEhrPatient } from "../../patient/useSyncedEhrPatient";
import { useSyncedPatient } from "../../patient/useSyncedPatient";
import { useClient } from "../../useClient";
import { useSyncedScope } from "../useSyncedScope";
import { useRequiredContext } from "../../useRequiredContext";
import { AppContext } from "../../../contexts/AppContext";

export interface ISessionData {
  nextPatient?: Patient;
  ehrPatient?: EhrPatient;
  scope?: Scope;
}

/**
 * Provides syncronised data related to the session.
 */
export const useSyncedSessionData = (): ISessionData => {
  const client = useClient();

  // this global context variable avoid issues value not shared amongst different instances of hook
  const { globalSimplePatientEhrAssociation } = useRequiredContext(AppContext);

  // use patient, as it supports both user and app sessions (where the patient is located in different places)
  const session = client.auth.session;

  const { scope } = useSyncedScope(session?.app?.scopeId);

  const association: ISimplePatientEhrAssociation =
    scope?.ehrPatient?.association || globalSimplePatientEhrAssociation;

  const { ehrPatient } = useSyncedEhrPatient(
    association?.ehrId,
    association?.ehrPatientId,
  );

  // session.patientId is available when it is a patient session
  // scope.patientId is available when it is an app session with a patient in scope
  // ehrPatient?.association?.patientId is available when setting the local ehr patient from a staff member session (e.g. next bar logged in as advocate)
  const patientId =
    session?.patientId ||
    scope?.patientId ||
    ehrPatient?.association?.patientId;

  const { patient } = useSyncedPatient(patientId);

  return useMemo<ISessionData>(() => {
    return {
      nextPatient: patient,
      ehrPatient,
      scope,
    };
  }, [ehrPatient, patient, scope]);
};

export const DebugUseSyncedSessionData: React.FC = () => {
  const { nextPatient, ehrPatient } = useSyncedSessionData();

  return (
    <>
      EHR Patient: <pre>{JSON.stringify(ehrPatient, null, 2)}</pre>
      <br />
      Next Patient: <pre>{JSON.stringify(nextPatient, null, 2)}</pre>
    </>
  );
};
