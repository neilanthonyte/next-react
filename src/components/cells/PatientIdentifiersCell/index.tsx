import * as React from "react";
import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";

import { IPatientDataCellProps } from "../PatientDataCell";
import { Cell, CellDescription, CellHeader } from "../../structure/Cell";
import { useGetPhotoUrl } from "../../../hooks/useGetPhotoUrl";
import { getAvatarIconForPatient } from "../../../helpers/getAvatarIconForPatient";

export interface IPatientIdentifiersCellProps extends IPatientDataCellProps {}

/**
 * Cell rendering identifiers information for the given fhir patient
 */
export const PatientIdentifiersCell: React.FC<IPatientDataCellProps> = ({
  fhirPatient: patient,
  actions,
}) => {
  const { url: photoUrl } = useGetPhotoUrl(patient);
  const hasPhoto = !!photoUrl;
  const patientUtil = fhirUtil<FhirPatientUtil>(patient);
  const dob = patient.birthDate;
  const dobStr = dob ? moment(dob, "YYYY-MM-DD").format("MMM Do YYYY") : "";
  return (
    <Cell
      decorationImage={hasPhoto === true && photoUrl}
      decorationIcon={hasPhoto === false && getAvatarIconForPatient(patient)}
      actions={actions}
    >
      <CellHeader>{patientUtil.getDisplayName()}</CellHeader>
      {!!dob && <CellDescription>{dobStr}</CellDescription>}
    </Cell>
  );
};
