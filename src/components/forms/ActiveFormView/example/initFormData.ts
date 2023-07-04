export const initFormData = {
  Patient: {
    extension: [
      {
        url: "http://medicaldirector.com/Patient/extension/Status",
        valueString: "2",
      },
      {
        valueCoding: {
          code: "4",
        },
        url: "http://hl7.org.au/fhir/StructureDefinition/indigenous-status",
      },
    ],
    name: [
      {
        prefix: ["Mr"],
        given: ["John"],
        family: "Smith",
      },
    ],
    gender: "male",
    birthDate: "2000-01-01",
    address: [
      {
        line: ["123 Fake Street"],
        city: "Cityland",
        postalCode: "0100",
        state: "ACT",
        country: "Australia",
      },
    ],
    telecom: [
      {
        value: "+61400000000",
        system: "phone",
        use: "mobile",
      },
      {
        value: "john.smith@example.com",
        system: "email",
      },
    ],
    contact: [
      {
        name: {
          text: "Doe",
        },
        relationship: [
          {
            text: "Mate",
          },
        ],
        telecom: [
          {
            value: "+61400000000",
            system: "phone",
          },
        ],
      },
    ],
  },
};
