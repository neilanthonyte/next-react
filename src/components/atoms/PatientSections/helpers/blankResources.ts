import alcoholDefinition from "next-shared/src/fhirUtil/fhirObservations/metricDefinitions/alcohol";
import smokingDefinition from "next-shared/src/fhirUtil/fhirObservations/metricDefinitions/smoking";
import {
  observationDisplayNameExtensionUrl,
  observationTypeExtensionUrl,
} from "next-shared/src/helpers/constants";

export const blankResources = {
  "observation:Smoking": [
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
    },
  ],
  "observation:Alcohol": [
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
    },
  ],
};
