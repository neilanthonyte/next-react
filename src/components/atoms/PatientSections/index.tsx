import * as React from "react";

import { ObservationsSection } from "./components/ObservationsSection";
import { NoteToPatientEditor } from "./components/NoteToPatientEditor";

import { MedicalResourceType } from "next-shared/src/types/types";
import { ELayoutVariant } from "next-shared/src/types/layouts";
import { blankResources } from "./helpers/blankResources";

export interface IPatientLifestyleProps {
  onEdit?: ((resource: fhir3.Resource) => void) | null;
}

export const PatientLifestyle: React.FC<IPatientLifestyleProps> = ({
  onEdit = null,
}) => (
  <ObservationsSection
    filter={[MedicalResourceType.Smoking, MedicalResourceType.Alcohol]}
    placeholders={blankResources}
    onEdit={onEdit}
    isReviewable={true}
  />
);

export interface IPatientFormsProps {
  onEdit?: ((resource: fhir3.Resource) => void) | null;
}

export const PatientForms: React.FC<IPatientFormsProps> = ({
  onEdit = null,
}) => (
  <ObservationsSection
    filter={[
      MedicalResourceType.OnboardingForm,
      MedicalResourceType.ReasonForVisit,
      MedicalResourceType.PatientForm,
    ]}
    onEdit={onEdit}
    variant={ELayoutVariant.Compact}
    onlyShowLatest={false}
  />
);

export interface IPatientNotesProps {
  onEdit?: (() => void) | null;
}

export const PatientNotes: React.FC<IPatientNotesProps> = ({
  onEdit = null,
}) => (
  <div>
    <ObservationsSection
      filter={[MedicalResourceType.NoteToPatient]}
      onEdit={onEdit}
      onlyShowLatest={false}
    />
    <NoteToPatientEditor />
  </div>
);
