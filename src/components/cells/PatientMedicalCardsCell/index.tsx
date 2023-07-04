import React from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

import { InfoMessage } from "../../generic/Message";
import { Cell, CellType, CellDescription } from "../../structure/Cell";
import { IPatientDataCellProps } from "../PatientDataCell";

export interface IPatientMedicalCardsCellProps extends IPatientDataCellProps {}

/**
 * Cell rendering medical cards information for the given fhir patient
 */
export const PatientMedicalCardsCell: React.FC<
  IPatientMedicalCardsCellProps
> = ({ fhirPatient: patient, actions }) => {
  const patientUtil = fhirUtil<FhirPatientUtil>(patient);
  const medicareNumber = patientUtil.getMedicareNumber()?.value;
  const dvaNumber = patientUtil.getDvaNumber()?.value;
  const crnNumber = patientUtil.getCRN()?.value;

  return (
    <Cell decorationIcon="medical-cards" actions={actions}>
      <CellType>Health cover</CellType>
      {!(medicareNumber || dvaNumber || crnNumber) && (
        <InfoMessage>No health cover on record</InfoMessage>
      )}
      {!!medicareNumber && (
        <CellDescription>Medicare: {medicareNumber}</CellDescription>
      )}
      {!!dvaNumber && <CellDescription>DVA: {dvaNumber}</CellDescription>}
      {!!crnNumber && <CellDescription>CRN: {crnNumber}</CellDescription>}
    </Cell>
  );
};

export const PatientMedicareCell: React.FC<IPatientMedicalCardsCellProps> = ({
  fhirPatient: patient,
  actions,
}) => {
  const patientUtil = fhirUtil<FhirPatientUtil>(patient);
  const medicareNumber = patientUtil.getMedicareNumber()?.value;

  return (
    <Cell decorationIcon="medical-cards" actions={actions}>
      <CellType>Medicare</CellType>
      {!!medicareNumber ? (
        <CellDescription>{medicareNumber}</CellDescription>
      ) : (
        <InfoMessage>No medicare on record</InfoMessage>
      )}
    </Cell>
  );
};

export const PatientDvaCell: React.FC<IPatientMedicalCardsCellProps> = ({
  fhirPatient: patient,
  actions,
}) => {
  const patientUtil = fhirUtil<FhirPatientUtil>(patient);
  const dvaNumber = patientUtil.getDvaNumber()?.value;

  return (
    <Cell decorationIcon="medical-cards" actions={actions}>
      <CellType>DVA</CellType>
      {!!dvaNumber ? (
        <CellDescription>{dvaNumber}</CellDescription>
      ) : (
        <InfoMessage>No DVA on record</InfoMessage>
      )}
    </Cell>
  );
};

export const PatientCRNCell: React.FC<IPatientMedicalCardsCellProps> = ({
  fhirPatient: patient,
  actions,
}) => {
  const patientUtil = fhirUtil<FhirPatientUtil>(patient);
  const crnNumber = patientUtil.getCRN()?.value;

  return (
    <Cell decorationIcon="medical-cards" actions={actions}>
      <CellType>Centrelink</CellType>
      {!!crnNumber ? (
        <CellDescription>{crnNumber}</CellDescription>
      ) : (
        <InfoMessage>No CRN on record</InfoMessage>
      )}
    </Cell>
  );
};
