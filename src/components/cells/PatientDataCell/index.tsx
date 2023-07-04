import * as React from "react";

import { EPatientDataSectionNames } from "next-shared/src/types/IPatientDataSection";

import { ICellAction } from "../../structure/Cell";
import { PatientAddressCell } from "../PatientAddressCell";
import { PatientContactCell } from "../PatientContactCell";
import { PatientEmergencyContactCell } from "../PatientEmergencyContactCell";
import { PatientIdentifiersCell } from "../PatientIdentifiersCell";
import {
  PatientCRNCell,
  PatientDvaCell,
  PatientMedicalCardsCell,
  PatientMedicareCell,
} from "../PatientMedicalCardsCell";

export interface IPatientDataCellProps {
  fhirPatient: fhir3.Patient;
  actions?: ICellAction[];
}

export interface IPatientDataCellRendererProps extends IPatientDataCellProps {
  cellName: EPatientDataSectionNames;
}

/**
 * Helper wrapper component used to render patient related data based on name
 */
export const PatientDataCell: React.FC<IPatientDataCellRendererProps> = (
  props,
) => {
  switch (props.cellName) {
    case EPatientDataSectionNames.Identifiers:
      return <PatientIdentifiersCell {...props} />;

    case EPatientDataSectionNames.Address:
      return <PatientAddressCell {...props} />;

    case EPatientDataSectionNames.Contact:
      return <PatientContactCell {...props} />;

    case EPatientDataSectionNames.EmergencyContact:
      return <PatientEmergencyContactCell {...props} />;

    case EPatientDataSectionNames.MedicalCards:
      return <PatientMedicalCardsCell {...props} />;

    case EPatientDataSectionNames.Medicare:
      return <PatientMedicareCell {...props} />;

    case EPatientDataSectionNames.Dva:
      return <PatientDvaCell {...props} />;

    case EPatientDataSectionNames.Crn:
      return <PatientCRNCell {...props} />;

    default: {
      console.error("Patient data not supported");
      return null;
    }
  }
};
