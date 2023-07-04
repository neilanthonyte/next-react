import * as React from "react";
import { useMemo } from "react";

import { MedicalStaffMember } from "next-shared/src/models/MedicalStaffMember";
import { fhirUtil } from "next-shared/src/fhirUtil";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useHcps } from "../../../hooks/content/useHcps";
import { ImgBlock } from "../../generic/ImgBlock";
import { PatientActionsList } from "../../actions/PatientActionsList";
import { AccessCode } from "../../atoms/AccessCode";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { StaffMember } from "next-shared/src/models/StaffMember";
const css = cssComposer(styles, "PatientCurtainView");

export interface IPatientCurtainViewProps {}

/**
 * Component rendering a holding screen. It shows:
 * - Next patient name, if available, or ehr patient name and app access code (both from session)
 * - Staff member name in session if available
 *
 * Primarely used in Consult screen app to handle no next patient in session and welcome screen
 */
export const PatientCurtainView: React.FC<IPatientCurtainViewProps> = () => {
  const { hcps } = useHcps();
  const { ehrPatient, nextPatient, scope } = useSyncedSessionData();

  // give precedence to next if available
  const { patientName, appAccessCode } = useMemo(() => {
    if (!nextPatient && !ehrPatient?.fhir)
      return {
        patientName: null,
        appAccessCode: null,
      };
    // we have a next paitent, no access code
    if (nextPatient) {
      return {
        patientName: nextPatient.getDisplayName(),
        appAccessCode: null,
      };
    }
    // we have an ehr paitent only, show access code
    const patientUtil = fhirUtil(ehrPatient.fhir);
    return {
      patientName: patientUtil.getDisplayName(),
      appAccessCode: ehrPatient.appAccessCode,
    };
  }, [ehrPatient, nextPatient]);

  const staffMember: StaffMember = scope?.staffMember;

  const cmsPractitioner = useMemo(() => {
    if (!hcps || !staffMember) return;
    return hcps.find((hcp) => hcp.npServicesId === staffMember.staffMemberId);
  }, [hcps, staffMember]);

  return (
    <div className={css("")}>
      {!!patientName && (
        <div className={css("patient")}>
          <h2 className={css("subtitle")}>Welcome</h2>
          <h1 className={css("name")}>{patientName}</h1>
        </div>
      )}
      {!!appAccessCode && (
        <div className={css("accessCode")}>
          <AccessCode
            code={appAccessCode}
            size="sm"
            showAppStoreLinks={false}
          />
        </div>
      )}
      {staffMember instanceof MedicalStaffMember && (
        <div className={css("hcp")}>
          <h3 className={css("subtitle")}>Care of</h3>
          <h2>{staffMember.getDisplayName()}</h2>
          <ImgBlock
            className={css("hcp_avatar")}
            src={cmsPractitioner && cmsPractitioner.profileImage.squareSmall}
          />
        </div>
      )}
      {nextPatient && (
        <div className={css("actions")}>
          <h3 className={css("subtitle")}>Outcomes</h3>
          <PatientActionsList
            patientId={nextPatient.patientId}
            filterToday={true}
            filterByStaffMemberInScope={true}
          />
        </div>
      )}
    </div>
  );
};
