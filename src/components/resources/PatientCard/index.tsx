import * as React from "react";
import { useState } from "react";
import * as _ from "lodash";

import { Card, ICardProps, CardBody } from "../../structure/Card";
import { PatientFormModal } from "../../modals/PatientFormModal";
import {
  Resource,
  ResourceBody,
  ResourceContent,
} from "../../generic/Resource";
import { PatientIdentifiersCell } from "../../cells/PatientIdentifiersCell";
import { PatientContactCell } from "../../cells/PatientContactCell";
import { PatientAddressCell } from "../../cells/PatientAddressCell";
import { PatientEmergencyContactCell } from "../../cells/PatientEmergencyContactCell";
import { PatientMedicalCardsCell } from "../../cells/PatientMedicalCardsCell";
import { GenericFormModal } from "../../modals/GenericFormModal";

export interface IPatientCardSections {
  address?: boolean;
  emergencyContact?: boolean;
  medicare?: boolean;
  basics?: boolean;
}
export interface IPatientCardProps extends ICardProps {
  data: fhir3.Patient;
  /** If set to true the component will not update the patient remotely. */
  disableRemoteUpdate?: boolean;
  /**
   * Called when form submitted.
   * @param data the form data.
   */
  onSuccess?: (data: any) => void;
  hideExtendedSections?: boolean;
  hide?: IPatientCardSections;
}

/**
 * Component showing information about Patient.
 *
 * TODO: consider using useDemographicsSchema instead of fetching forms - would need
 * to alter how the internal forms work.
 */
export const PatientCard: React.FC<IPatientCardProps> = ({
  data,
  disableRemoteUpdate,
  onSuccess,
  hideExtendedSections = false,
  hide = {},
}) => {
  if (!(_.isObject(data) && data && data.resourceType === "Patient")) {
    console.warn("PatientCard requires a valid fhir Patient data prop");
    return null;
  }
  // form state
  const [activeFormSlug, setActiveFormSlug] = useState<string>();

  // allows for cleaner toggling in the future
  const showAddress = !hideExtendedSections && !hide.address;
  const showEmergencyContact = !hideExtendedSections && !hide.emergencyContact;
  const showHealthCover = !hideExtendedSections && !hide.medicare;

  return (
    <>
      <Resource>
        <ResourceBody>
          <ResourceContent>
            <Card>
              <CardBody>
                {!hide.basics && <PatientIdentifiersCell fhirPatient={data} />}
                <PatientContactCell fhirPatient={data} />
                {showAddress && (
                  <PatientAddressCell
                    fhirPatient={data}
                    actions={[
                      {
                        label: "Edit",
                        onClick: () => setActiveFormSlug("patient-address"),
                      },
                    ]}
                  />
                )}
                {showEmergencyContact && (
                  <PatientEmergencyContactCell
                    fhirPatient={data}
                    actions={[
                      {
                        label: "Edit",
                        onClick: () =>
                          setActiveFormSlug("patient-secondary-contact"),
                      },
                    ]}
                  />
                )}
                {showHealthCover && (
                  <PatientMedicalCardsCell
                    fhirPatient={data}
                    actions={[
                      {
                        label: "Edit",
                        onClick: () =>
                          setActiveFormSlug("patient-health-cover"),
                      },
                    ]}
                  />
                )}
              </CardBody>
            </Card>
          </ResourceContent>
        </ResourceBody>
      </Resource>
      {disableRemoteUpdate ? (
        // use a generic form
        <GenericFormModal
          prefillData={{ Patient: data }}
          formSlug={activeFormSlug}
          onSuccess={async (data) => {
            await onSuccess(data);
            setActiveFormSlug(undefined);
          }}
          onClose={() => setActiveFormSlug(undefined)}
          heading="Edit details your details"
        />
      ) : (
        // uses the smarty-pants self-submitting session-using patient forms otherwise.
        <PatientFormModal
          prefillData={{ Patient: data }}
          formSlug={activeFormSlug}
          onClose={() => setActiveFormSlug(undefined)}
          onFormSubmitSuccess={(data) => {
            if (onSuccess) {
              onSuccess(data);
            }
            setActiveFormSlug(undefined);
          }}
        />
      )}
    </>
  );
};
