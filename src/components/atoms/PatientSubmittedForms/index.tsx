import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import * as _ from "lodash";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import {
  MedicalResourceType,
  IGroupedPatientMedicalResources,
  PatientMedicalResource,
  IFormResources,
} from "next-shared/src/types/types";

import { PatientFormModal } from "../../modals/PatientFormModal";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { PatientObservations } from "../PatientObservations";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useBlankMedicalHistoryObservations } from "./helpers/blankResources";
import { useSyncedPatientMedicalResources } from "../../../hooks/patient/useSyncedPatientMedicalResources";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";
import { filterByLastSubmittedObservation } from "next-shared/src/helpers/filterByLastSubmittedObservation";

export interface IPatientSubmittedInformationProps {
  resourceTypes?: MedicalResourceType[];
  filterItems?: (
    items: IGroupedPatientMedicalResources,
  ) => IGroupedPatientMedicalResources;
}

/**
 * Component rendering editable patient submitted forms
 */
export const PatientSubmittedInformation: React.FC<
  IPatientSubmittedInformationProps
> = ({ resourceTypes, filterItems }) => {
  const { nextPatient } = useSyncedSessionData();
  const { activeLocation: currentLocation } = useActiveLocation();

  const {
    patientObservations: patientSubmittedInformation,
    isLoading,
    error,
    refetch,
  } = useSyncedPatientMedicalResources(nextPatient?.patientId);

  // filter down
  const resources = useMemo(() => {
    if (!patientSubmittedInformation) {
      return patientSubmittedInformation;
    }
    if (resourceTypes) {
      return _.pickBy(
        patientSubmittedInformation,
        function (value, key: MedicalResourceType) {
          return resourceTypes.includes(key);
        },
      );
    }
    return patientSubmittedInformation;
  }, [patientSubmittedInformation, resourceTypes]);

  const [activeResource, setActiveResource] = useState<fhir3.Resource>();

  const { formSlug, prefillData } = useMemo(() => {
    if (!activeResource) {
      return {
        formSlug: null,
        prefillData: null,
      };
    }

    const fhirResource = fhirUtil<FhirObservationUtil>(activeResource);
    const resourceType = fhirResource.getMedicalResourceType();
    // HACK specific location forms like patient history stored in the cms don't have any
    // reference to form slug or location origin, so as temporary solution for this specific type
    // check the current location (if any) and get the form slug from there
    const locationPatientHistoryFormSlug =
      resourceType === MedicalResourceType.OnboardingForm
        ? currentLocation?.formSlugs?.patientHistory
        : null;

    const extensionFormSlug = fhirResource.getObservationFormSlug();

    return {
      formSlug:
        locationPatientHistoryFormSlug || extensionFormSlug || resourceType,
      prefillData: { [resourceType]: activeResource } as IFormResources,
    };
  }, [activeResource, currentLocation]);

  // remove empty array to allow merging with blanks
  const filteredObservations = useMemo(() => {
    if (!resources) {
      return resources;
    }
    return filterItems ? filterItems(resources) : resources;
  }, [resources]);

  const handleObservationSubmit = async () => {
    // reset active resource to close the modal
    setActiveResource(undefined);
  };

  if (error) {
    return (
      <ErrorPlaceholder
        title="Error retrieving submitted forms."
        retry={refetch}
      />
    );
  }

  return (
    <LoadingBlock isLoading={isLoading || resources === null}>
      <PatientObservations
        onEdit={setActiveResource}
        observationsByType={filteredObservations}
        onlyShowLatest={false}
      />
      <PatientFormModal
        formSlug={formSlug}
        onClose={() => setActiveResource(undefined)}
        onFormSubmitSuccess={handleObservationSubmit}
        prefillData={prefillData}
      />
    </LoadingBlock>
  );
};

export const PatientSectionForms: React.FC = () => {
  return (
    <PatientSubmittedInformation
      resourceTypes={[MedicalResourceType.PatientForm]}
    />
  );
};

const medicalHistoryResourceTypes: MedicalResourceType[] = [
  MedicalResourceType.Alcohol,
  MedicalResourceType.Smoking,
  MedicalResourceType.OnboardingForm,
];

export const PatientSectionLifestyle: React.FC = () => {
  const blankMedicalHistoryObservations = useBlankMedicalHistoryObservations();

  // show placeholder values where missing
  const filterItems = useCallback(
    (resources: IGroupedPatientMedicalResources) => {
      const filtered: {
        [key: string]: any;
      } = {};

      medicalHistoryResourceTypes.forEach((obsType) => {
        const noObservation = (resources[obsType] || []).length === 0;
        filtered[obsType] = noObservation
          ? blankMedicalHistoryObservations[obsType]
          : filterByLastSubmittedObservation(
              resources[obsType] as fhir3.Observation[],
            );
      });
      return filtered;
    },
    [blankMedicalHistoryObservations],
  );

  return (
    <PatientSubmittedInformation
      resourceTypes={medicalHistoryResourceTypes}
      filterItems={filterItems}
    />
  );
};
