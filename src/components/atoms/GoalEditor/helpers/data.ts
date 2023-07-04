import {
  bloodPressureUOM,
  diastolicDisplayName,
  diastolicLOINC,
  diastolicRawCode,
  systolicDisplayName,
  systolicLOINC,
  systolicRawCode,
} from "next-shared/src/fhirUtil/fhirObservations/metricDefinitions/bloodPressure";

import {
  weightLOINC,
  weightUOM,
} from "next-shared/src/fhirUtil/fhirObservations/metricDefinitions/weight";

// TODO: constants for the Next Practice URIs in these mock goal resources
export const weight = {
  resourceType: "Observation",
  id: "MD9386-observation:Weight",
  meta: {
    versionId: "MD41793",
    lastUpdated: "2018-12-03T22:34:11.335+00:00",
  },
  identifier: [
    {
      system: "http://medicaldirector.com/hub/identifier/app-id",
      value: "77699511-0600-4ecc-8097-bf4d93998349",
    },
    {
      system: "http://medicaldirector.com/hub/identifier/tenant-id",
      value: "next-demo.helix.medicaldirector.com",
    },
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "DIAG.MeasurementRows-95",
    },
  ],
  status: "final",
  category: [
    {
      coding: [
        {
          system: "http://hl7.org/fhir/ValueSet/observation-category",
          code: "vital-signs",
        },
      ],
    },
  ],
  subject: {
    reference: "https://api.hub.medicaldirector.com/fhir/Patient/MD11344",
    display: "",
  },
  issued: "2018-08-10T14:24:37.589+10:00",
  performer: [
    {
      reference: "https://api.hub.medicaldirector.com/fhir/Practitioner/MD3115",
      display: "",
    },
  ],
  component: [
    {
      code: {
        coding: [
          {
            code: weightLOINC,
            system: "http://loinc.org/",
          },
        ],
      },
      valueQuantity: {
        code: weightUOM,
        system: "http://unitsofmeasure.org/",
        unit: weightUOM,
        value: 95.5,
      },
      extension: [
        {
          url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
          valueString: weightLOINC,
        },
        {
          url: "http://nextpracticehealth.com/extension/observation/component-display-name",
          valueString: "Weight",
        },
      ],
    },
  ],
  context: {
    reference: "https://api.hub.medicaldirector.com/fhir/Encounter/MD24987",
    display: "",
  },
  extension: [
    {
      url: "http://nextpracticehealth.com/extension/observation/medical-resource-type",
      valueString: "observation:Weight",
    },
    {
      url: "http://nextpracticehealth.com/extension/observation/display-name",
      valueString: "Weight",
    },
  ],
};

export const weightGoal = {
  resourceType: "goal",
  id: "222",
  identifier: [
    {
      value: "123",
    },
  ],
  status: "in-progress",
  subject: {
    reference: "Patient/example",
    display: "Peter James Chalmers",
  },
  startDate: "2015-04-05",
  target: {
    measure: {
      coding: [
        {
          system: "http://loinc.org",
          code: "3141-9",
          display: "Weight Measured",
        },
      ],
    },
    detailQuantity: {
      value: 76,
      unit: "kg",
      system: "http://unitsofmeasure.org",
      code: "kg",
    },
    dueDate: "2016-04-05",
  },
  extension: [
    {
      url: "http://nextpracticehealth.com/extension/goal/obs-resource-type",
      valueString: "observation:Weight",
    },
    {
      url: "http://nextpracticehealth.com/extension/goal/obs-display-name",
      valueString: "Weight",
    },
    {
      url: "http://nextpracticehealth.com/extension/goal/min-value",
      valueInteger: 60,
    },
    {
      url: "http://nextpracticehealth.com/extension/goal/max-value",
      valueInteger: 80,
    },
  ],
};

export const bp = {
  resourceType: "Observation",
  id: "MD6810-observation:BloodPressure",
  meta: {
    versionId: "MD13777",
    lastUpdated: "2018-08-10T04:25:37.493+00:00",
  },
  identifier: [
    {
      system: "http://medicaldirector.com/hub/identifier/app-id",
      value: "77699511-0600-4ecc-8097-bf4d93998349",
    },
    {
      system: "http://medicaldirector.com/hub/identifier/tenant-id",
      value: "next-demo.helix.medicaldirector.com",
    },
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "DIAG.MeasurementRows-95",
    },
  ],
  status: "final",
  category: [
    {
      coding: [
        {
          system: "http://hl7.org/fhir/ValueSet/observation-category",
          code: "vital-signs",
        },
      ],
    },
  ],
  subject: {
    reference: "https://api.hub.medicaldirector.com/fhir/Patient/MD11344",
    display: "",
  },
  issued: "2018-08-10T14:24:37.589+10:00",
  performer: [
    {
      reference: "https://api.hub.medicaldirector.com/fhir/Practitioner/MD3115",
      display: "",
    },
  ],
  component: [
    {
      code: {
        coding: [
          {
            system: "http://loinc.org/",
            code: systolicLOINC,
          },
        ],
      },
      valueQuantity: {
        value: 140,
        unit: bloodPressureUOM,
        system: "http://unitsofmeasure.org/",
        code: bloodPressureUOM,
      },
      extension: [
        {
          url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
          valueString: systolicRawCode,
        },
        {
          url: "http://nextpracticehealth.com/extension/observation/component-display-name",
          valueString: systolicDisplayName,
        },
      ],
    },
    {
      code: {
        coding: [
          {
            system: "http://loinc.org/",
            code: diastolicLOINC,
          },
        ],
      },
      valueQuantity: {
        value: 84,
        unit: bloodPressureUOM,
        system: "http://unitsofmeasure.org/",
        code: bloodPressureUOM,
      },
      extension: [
        {
          url: "http://nextpracticehealth.com/extension/observation/component-raw-code",
          valueString: diastolicRawCode,
        },
        {
          url: "http://nextpracticehealth.com/extension/observation/component-display-name",
          valueString: diastolicDisplayName,
        },
      ],
    },
  ],
  context: {
    reference: "https://api.hub.medicaldirector.com/fhir/Encounter/MD24987",
    display: "",
  },
  extension: [
    {
      url: "http://nextpracticehealth.com/extension/observation/medical-resource-type",
      valueString: "observation:BloodPressure",
    },
    {
      url: "http://nextpracticehealth.com/extension/observation/display-name",
      valueString: "Blood pressure",
    },
  ],
};

export const bpGoal: fhir3.Goal = {
  resourceType: "Goal",
  description: {
    text: "Blood pressure",
  },
  id: "111",
  identifier: [
    {
      value: "123",
    },
  ],
  status: "in-progress",
  subject: {
    reference: "Patient/example",
    display: "Peter James Chalmers",
  },
  startDate: "2015-04-05",
  target: {
    measure: {
      coding: [
        {
          system: "http://loinc.org/",
          code: systolicLOINC,
        },
      ],
    },
    detailCodeableConcept: {
      coding: [
        {
          system: "http://nextpracticehealth.com/BloodPressure/Systolic",
          code: "112",
          extension: [
            {
              url: "http://nextpracticehealth.com/extension/goal/min-value",
              valueInteger: 105,
            },
            {
              url: "http://nextpracticehealth.com/extension/goal/max-value",
              valueInteger: 120,
            },
          ],
        },
        {
          system: "http://nextpracticehealth.com/BloodPressure/Diastolic",
          code: "79",
          extension: [
            {
              url: "http://nextpracticehealth.com/extension/goal/min-value",
              valueInteger: 105,
            },
            {
              url: "http://nextpracticehealth.com/extension/goal/max-value",
              valueInteger: 120,
            },
          ],
        },
      ],
      text: "112/79",
    },
    dueDate: "2016-04-05",
  },
  extension: [
    {
      url: "http://nextpracticehealth.com/extension/goal/obs-resource-type",
      valueString: "observation:BloodPressure",
    },
    {
      url: "http://nextpracticehealth.com/extension/goal/obs-display-name",
      valueString: "Blood pressure",
    },
  ],
};
