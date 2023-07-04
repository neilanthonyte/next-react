```jsx
import { ImageView } from "./";
const { Provider } = require("react-redux");
const { createStore, combineReducers, applyMiddleware } = require("redux");

const MemoryRouter = require("react-router-dom").MemoryRouter;
import { Route } from "react-router";

import medicalResourcesReducer from "../../../../reducers/medicalResources";

const store = createStore(
  combineReducers({ medicalResources: medicalResourcesReducer })
);

store.dispatch({
  type: "SET_MEDICAL_RESOURCES",
  medicalResources: [
    {
      resourceType: "Observation",
      id: "MD13400",
      meta: {
        versionId: "MD73402",
        lastUpdated: "2019-10-17T00:26:34.488+00:00"
      },
      extension: [
        {
          url: "http://nextpracticehealth.com/extension/device-type",
          valueString: "otoscope"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/observation/medical-resource-type",
          valueString: "observation:Image"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/observation/display-name",
          valueString: "Image"
        }
      ],
      identifier: [
        {
          system: "http://medicaldirector.com/hub/identifier/tenant-id",
          value: "nextpracticedev.com.au"
        },
        {
          system: "http://medicaldirector.com/hub/identifier/app-id",
          value: "5ba26872-7df7-45af-a7c1-a63cf55169ea"
        }
      ],
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/ValueSet/observation-category",
              code: "imaging"
            }
          ],
          text: "Imaging"
        }
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org/",
            code: "72170-4"
          }
        ],
        text: "Photo"
      },
      subject: {
        reference:
          "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD30057"
      },
      effectiveDateTime: "2019-10-17T11:26:33+11:00",
      issued: "2019-10-17T11:26:33+11:00",
      performer: [
        {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14348",
          display: "Dr Kory Porter"
        }
      ],
      component: [
        {
          extension: [
            {
              url:
                "http://nextpracticehealth.com/extension/observation/component-raw-code",
              valueString: "72170-4"
            },
            {
              url:
                "http://nextpracticehealth.com/extension/observation/component-display-name",
              valueString: "Photographic image"
            }
          ],
          code: {
            coding: [
              {
                system: "http://loinc.org/",
                code: "72170-4"
              }
            ]
          },
          valueAttachment: {
            url:
              "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/59ddef68-5fb6-4f56-b0bd-8ecee10fd5c4"
          }
        }
      ]
    },
    {
      resourceType: "Observation",
      id: "MD13401",
      meta: {
        versionId: "MD73403",
        lastUpdated: "2019-10-17T04:26:48.641+00:00"
      },
      extension: [
        {
          url: "http://nextpracticehealth.com/extension/device-type",
          valueString: "dermotoscope"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/observation/medical-resource-type",
          valueString: "observation:Image"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/observation/display-name",
          valueString: "Image"
        }
      ],
      identifier: [
        {
          system: "http://medicaldirector.com/hub/identifier/tenant-id",
          value: "nextpracticedev.com.au"
        },
        {
          system: "http://medicaldirector.com/hub/identifier/app-id",
          value: "5ba26872-7df7-45af-a7c1-a63cf55169ea"
        }
      ],
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/ValueSet/observation-category",
              code: "imaging"
            }
          ],
          text: "Imaging"
        }
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org/",
            code: "72170-4"
          }
        ],
        text: "Photo"
      },
      subject: {
        reference:
          "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD30057"
      },
      effectiveDateTime: "2019-10-17T15:26:48+11:00",
      issued: "2019-10-17T15:26:48+11:00",
      performer: [
        {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14348",
          display: "Dr Kory Porter"
        }
      ],
      component: [
        {
          extension: [
            {
              url:
                "http://nextpracticehealth.com/extension/observation/component-raw-code",
              valueString: "72170-4"
            },
            {
              url:
                "http://nextpracticehealth.com/extension/observation/component-display-name",
              valueString: "Photographic image"
            }
          ],
          code: {
            coding: [
              {
                system: "http://loinc.org/",
                code: "72170-4"
              }
            ]
          },
          valueAttachment: {
            url:
              "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/bd912b66-3375-4d88-b1de-856406d3fdc0"
          }
        }
      ]
    },
    {
      resourceType: "Observation",
      id: "MD13402",
      meta: {
        versionId: "MD73404",
        lastUpdated: "2019-10-17T04:26:53.958+00:00"
      },
      extension: [
        {
          url: "http://nextpracticehealth.com/extension/device-type",
          valueString: "dermotoscope"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/observation/medical-resource-type",
          valueString: "observation:Image"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/observation/display-name",
          valueString: "Image"
        }
      ],
      identifier: [
        {
          system: "http://medicaldirector.com/hub/identifier/tenant-id",
          value: "nextpracticedev.com.au"
        },
        {
          system: "http://medicaldirector.com/hub/identifier/app-id",
          value: "5ba26872-7df7-45af-a7c1-a63cf55169ea"
        }
      ],
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/ValueSet/observation-category",
              code: "imaging"
            }
          ],
          text: "Imaging"
        }
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org/",
            code: "72170-4"
          }
        ],
        text: "Photo"
      },
      subject: {
        reference:
          "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD30057"
      },
      effectiveDateTime: "2019-10-17T15:26:53+11:00",
      issued: "2019-10-17T15:26:53+11:00",
      performer: [
        {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14348",
          display: "Dr Kory Porter"
        }
      ],
      component: [
        {
          extension: [
            {
              url:
                "http://nextpracticehealth.com/extension/observation/component-raw-code",
              valueString: "72170-4"
            },
            {
              url:
                "http://nextpracticehealth.com/extension/observation/component-display-name",
              valueString: "Photographic image"
            }
          ],
          code: {
            coding: [
              {
                system: "http://loinc.org/",
                code: "72170-4"
              }
            ]
          },
          valueAttachment: {
            url:
              "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/4fcdb0de-6bb2-4ebd-bf6f-de1d716ce3cb"
          }
        }
      ]
    },
    {
      resourceType: "Observation",
      id: "MD13403",
      meta: {
        versionId: "MD73405",
        lastUpdated: "2019-10-17T04:27:10.352+00:00"
      },
      extension: [
        {
          url: "http://nextpracticehealth.com/extension/device-type",
          valueString: "otoscope"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/observation/medical-resource-type",
          valueString: "observation:Image"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/observation/display-name",
          valueString: "Image"
        }
      ],
      identifier: [
        {
          system: "http://medicaldirector.com/hub/identifier/tenant-id",
          value: "nextpracticedev.com.au"
        },
        {
          system: "http://medicaldirector.com/hub/identifier/app-id",
          value: "5ba26872-7df7-45af-a7c1-a63cf55169ea"
        }
      ],
      status: "final",
      category: [
        {
          coding: [
            {
              system: "http://hl7.org/fhir/ValueSet/observation-category",
              code: "imaging"
            }
          ],
          text: "Imaging"
        }
      ],
      code: {
        coding: [
          {
            system: "http://loinc.org/",
            code: "72170-4"
          }
        ],
        text: "Photo"
      },
      subject: {
        reference:
          "https://integration-api.hub.medicaldirector.com/fhir/Patient/MD30057"
      },
      effectiveDateTime: "2019-10-17T15:27:10+11:00",
      issued: "2019-10-17T15:27:10+11:00",
      performer: [
        {
          reference:
            "https://api.hub.medicaldirector.com/fhir/Practitioner/MD14348",
          display: "Dr Kory Porter"
        }
      ],
      component: [
        {
          extension: [
            {
              url:
                "http://nextpracticehealth.com/extension/observation/component-raw-code",
              valueString: "72170-4"
            },
            {
              url:
                "http://nextpracticehealth.com/extension/observation/component-display-name",
              valueString: "Photographic image"
            }
          ],
          code: {
            coding: [
              {
                system: "http://loinc.org/",
                code: "72170-4"
              }
            ]
          },
          valueAttachment: {
            url:
              "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/4026741d-ba96-4aca-8a35-a17c814c2bf3"
          }
        }
      ]
    }
  ]
});

store.dispatch({
  type: "ADD_SIGNED_IMAGE_URLS",
  signedImageUrls: {
    "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/59ddef68-5fb6-4f56-b0bd-8ecee10fd5c4":
      "https://picsum.photos/200",
    "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/bd912b66-3375-4d88-b1de-856406d3fdc0":
      "https://picsum.photos/210",
    "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/4026741d-ba96-4aca-8a35-a17c814c2bf3":
      "https://picsum.photos/220",
    "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/4fcdb0de-6bb2-4ebd-bf6f-de1d716ce3cb":
      "https://picsum.photos/230",
    "https://sydintegrationstorage.blob.core.windows.net/7130c795-760f-4d63-900a-2b4562d136b0/ea510c5e-fdba-439c-8fb7-7b4971aa278f":
      "https://picsum.photos/240"
  }
});

<div style={{ height: "500px" }}>
  <MemoryRouter
    initialIndex={0}
    initialEntries={[{ pathname: "/dermotoscope/MD13402" }]}
  >
    <Route
      path="/:device/:id"
      render={() => (
        <Provider store={store}>
          <ImageView />
        </Provider>
      )}
    />
  </MemoryRouter>
</div>;
```
