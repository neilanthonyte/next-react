### Standard usage

```jsx
import { MedicationRequestCard } from "./";
const medication = {
  resourceType: "MedicationRequest",
  identifier: [
    {
      system:
        "http://medicaldirector.com/hub/identifier/external/resource/object-id",
      value: "15"
    }
  ],
  meta: {
    lastUpdated: "2018-08-14T12:00:00+10:00"
  },
  medicationCodeableConcept: {
    coding: [
      {
        system: "https://helix.medicaldirector.com/Medication/ProductId",
        code: "1337"
      },
      {
        system:
          "https://helix.medicaldirector.com/Medication/ProductNameDoseFormStrengthId",
        code: "3189"
      }
    ],
    text: "CODEINE PHOSPHATE [FAWNS & MCALLAN]"
  },
  intent: "proposal",
  status: "active",
  subject: {
    identifier: {
      system: "https://helix.medicaldirector.com/Patient/PatientId",
      value: "59"
    },
    display: ""
  },
  dosageInstruction: [
    {
      text: "1 tablet twice a day",
      route: {
        text: "oral"
      },
      additionalInstruction: [
        {
          text: "tablet 30mg"
        }
      ]
    }
  ],
  authoredOn: "2018-08-14T12:00:00+10:00"
};
<div style={{ width: "400px" }}>
  <MedicationRequestCard medication={medication} />
</div>;
```

### Empty

```jsx
import { MedicationRequestCard } from "./";
<div style={{ width: "400px" }}>
  <MedicationRequestCard medication={{}} />
</div>;
```
