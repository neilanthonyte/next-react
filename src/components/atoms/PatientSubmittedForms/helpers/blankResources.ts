import alcoholDefinition from "next-shared/src/fhirUtil/fhirObservations/metricDefinitions/alcohol";
import smokingDefinition from "next-shared/src/fhirUtil/fhirObservations/metricDefinitions/smoking";
import onboardingFormDefinition from "next-shared/src/fhirUtil/fhirObservations/metricDefinitions/onboardingForm";
import {
  observationDisplayNameExtensionUrl,
  observationFormSlugExtensionUrl,
  observationTypeExtensionUrl,
} from "next-shared/src/helpers/constants";
import {
  IGroupedPatientMedicalResources,
  MedicalResourceType,
} from "next-shared/src/types/types";

import { useActiveLocation } from "../../../../hooks/core/useActiveLocation";
import { useMemo } from "react";

export const useBlankMedicalHistoryObservations =
  (): IGroupedPatientMedicalResources => {
    const { activeLocation: currentLocation } = useActiveLocation();
    const patientHistoryFormSlug = currentLocation?.formSlugs?.patientHistory;
    const blankMedicalHistoryObservations =
      useMemo<IGroupedPatientMedicalResources>(() => {
        const observations: IGroupedPatientMedicalResources = {
          [MedicalResourceType.Smoking]: [
            {
              resourceType: "Observation",
              extension: [
                {
                  url: observationTypeExtensionUrl,
                  valueString: smokingDefinition.type,
                },
                {
                  url: observationDisplayNameExtensionUrl,
                  valueString: smokingDefinition.displayName,
                },
              ],
              status: undefined,
              code: undefined,
            },
          ],
          [MedicalResourceType.Alcohol]: [
            {
              resourceType: "Observation",
              extension: [
                {
                  url: observationTypeExtensionUrl,
                  valueString: alcoholDefinition.type,
                },
                {
                  url: observationDisplayNameExtensionUrl,
                  valueString: alcoholDefinition.displayName,
                },
              ],
              status: undefined,
              code: undefined,
            },
          ],
        };
        if (patientHistoryFormSlug) {
          observations[MedicalResourceType.OnboardingForm] = [
            {
              resourceType: "Observation",
              extension: [
                {
                  url: observationTypeExtensionUrl,
                  valueString: onboardingFormDefinition.type,
                },
                {
                  url: observationDisplayNameExtensionUrl,
                  valueString: onboardingFormDefinition.displayName,
                },
                {
                  url: observationFormSlugExtensionUrl,
                  valueString: patientHistoryFormSlug,
                },
              ],
              status: undefined,
              code: undefined,
            },
          ];
        }
        return observations;
      }, [patientHistoryFormSlug]);

    return useMemo(
      () => blankMedicalHistoryObservations,
      [blankMedicalHistoryObservations],
    );
  };
