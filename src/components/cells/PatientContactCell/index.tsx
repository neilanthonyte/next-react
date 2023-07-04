import * as React from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

import { Cell, CellType, CellDescription } from "../../structure/Cell";
import { IPatientDataCellProps } from "../PatientDataCell";
import { InfoMessage } from "../../generic/Message";

export interface IPatientContactCellProps extends IPatientDataCellProps {}

/**
 * Cell rendering contact information for the given fhir patient
 */
export const PatientContactCell: React.FC<IPatientContactCellProps> = ({
  fhirPatient,
  actions,
}) => {
  const patientUtil = fhirUtil<FhirPatientUtil>(fhirPatient);
  const primaryEmail = patientUtil.getPrimaryEmail();
  const primaryMobileNumber = patientUtil.getPrimaryMobileNumber();
  const isEmpty = !primaryEmail && !primaryMobileNumber;
  return (
    <Cell decorationIcon="contact-info" actions={actions}>
      <CellType>Contact</CellType>
      {isEmpty ? (
        <InfoMessage>No contact on record</InfoMessage>
      ) : (
        <>
          {!!primaryEmail && (
            <CellDescription>Email: {primaryEmail}</CellDescription>
          )}
          {!!primaryMobileNumber && (
            <CellDescription>Mobile: {primaryMobileNumber}</CellDescription>
          )}
        </>
      )}
    </Cell>
  );
};
