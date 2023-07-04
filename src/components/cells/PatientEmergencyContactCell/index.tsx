import * as React from "react";
import { useMemo } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

import { InfoMessage } from "../../generic/Message";
import { Cell, CellType, CellDescription } from "../../structure/Cell";
import { IPatientDataCellProps } from "../PatientDataCell";

export interface IPatientEmergencyContactCellProps
  extends IPatientDataCellProps {}

/**
 * Cell rendering emergency contact information for the given fhir patient
 */
export const PatientEmergencyContactCell: React.FC<
  IPatientEmergencyContactCellProps
> = ({ fhirPatient, actions }) => {
  const emergencyStringArray = useMemo(() => {
    if (!fhirPatient.contact || fhirPatient.contact.length === 0) return;
    const patientUtil = fhirUtil<FhirPatientUtil>(fhirPatient);
    return fhirPatient.contact.map((contact) =>
      patientUtil.getFormattedEmergencyContact(contact),
    );
  }, [fhirPatient]);

  if (!emergencyStringArray) {
    return (
      <Cell decorationIcon="emergency-contact" actions={actions}>
        <CellType>Emergency contact</CellType>
        <InfoMessage>No contact on record</InfoMessage>
      </Cell>
    );
  }
  return (
    <>
      {emergencyStringArray.map((emergencyString, index) => {
        return (
          <Cell
            key={`emergency-${index}`}
            decorationIcon="emergency-contact"
            actions={actions}
          >
            <CellType>Emergency contact</CellType>
            <CellDescription>{emergencyString}</CellDescription>
          </Cell>
        );
      })}
    </>
  );
};
