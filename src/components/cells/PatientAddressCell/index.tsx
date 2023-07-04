import * as React from "react";
import { useMemo } from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

import { InfoMessage } from "../../generic/Message";
import { Cell, CellType, CellDescription } from "../../structure/Cell";
import { IPatientDataCellProps } from "../PatientDataCell";

export interface IPatientAddressCellProps extends IPatientDataCellProps {}

/**
 * Cell rendering address information for the given fhir patient
 */
export const PatientAddressCell: React.FC<IPatientAddressCellProps> = ({
  fhirPatient,
  actions,
}) => {
  const addressesStringArray = useMemo(() => {
    if (!fhirPatient.address || fhirPatient.address.length === 0) return [];
    const patientUtil = fhirUtil<FhirPatientUtil>(fhirPatient);
    return fhirPatient.address
      .map((address) => patientUtil.getFormattedAddress(address))
      .filter((x) => !!x);
  }, [fhirPatient]);
  if (!addressesStringArray.length) {
    return (
      <Cell decorationIcon="address" actions={actions}>
        <CellType>Address</CellType>
        <InfoMessage>No address on record</InfoMessage>
      </Cell>
    );
  }

  return (
    <>
      {addressesStringArray.map((addressString, index) => {
        const addressType = [fhirPatient.address[index].use, "address"].join(
          " ",
        );
        return (
          <Cell
            key={`address-${index}`}
            decorationIcon="address"
            actions={actions}
          >
            <CellType>{addressType}</CellType>
            <CellDescription key={index}>{addressString}</CellDescription>
          </Cell>
        );
      })}
    </>
  );
};
