import {
  namePattern,
  mobileOrLandlinePattern,
} from "../../../../helpers/formPatterns";
import {
  EFormFieldLayoutType,
  IFormField,
} from "next-shared/src/types/formTypes";

export const patientBasicsTransformers = [
  {
    type: "arrayToField",
    path: "Patient.telecom",
    filter: "system=phone|use=mobile",
    src: "value",
    dest: "phone",
    allowMultiple: false,
  },
  {
    type: "arrayToField",
    path: "Patient.telecom",
    filter: "system=email",
    src: "value",
    dest: "email",
    allowMultiple: false,
  },
  {
    type: "arrayToSingle",
    path: "Patient.name.0.prefix",
  },
];

export const buildPatientBasicsSchema = (
  disableConsent: boolean,
  showCreateAccount: boolean,
): IFormField[] => {
  const schema: IFormField[] = [
    {
      type: "hidden",
      map: "Patient.resourceType",
      defaultValue: "Patient",
    },
    {
      type: "group",
      layout: EFormFieldLayoutType.INLINE,
      map: "Patient",
      fields: [
        {
          label: "Prefix",
          required: true,
          type: "options",
          options: ["Mr", "Mrs", "Ms", "Dr", "Master", "Miss"],
          variant: "dropdown",
          placeholder: "Prefix",
          map: "name.0.prefix",
        },
        {
          label: "Given Name",
          required: true,
          type: "text",
          placeholder: "First Name",
          map: "name.0.given",
          allowMultiple: true,
          maxInstances: 1,
          pattern: namePattern,
        },
        {
          label: "Family Name",
          required: true,
          type: "text",
          placeholder: "Family Name",
          map: "name.0.family",
          pattern: namePattern,
        },
      ],
    },
    {
      type: "group",
      layout: EFormFieldLayoutType.INLINE,
      fields: [
        {
          label: "Email",
          type: "email",
          required: true,
          placeholder: "email@example.com",
          map: "$email",
          hideKeypad: true,
        },
        {
          label: "Mobile",
          type: "phone",
          required: true,
          hideKeypad: true,
          map: "$phone",
          placeholder: "Mobile",
          pattern: mobileOrLandlinePattern,
        },
      ],
    },
    {
      type: "group",
      layout: EFormFieldLayoutType.INLINE,
      map: "Patient",
      fields: [
        {
          label: "Birth Date",
          type: "date",
          dateFormat: "YYYY-MM-DD",
          map: "birthDate",
          maxDate: "NOW()",
          minDate: "NOW().offset(-120,'years')",
          required: true,
        },
        {
          label: "Gender",
          required: true,
          type: "options",
          options: [
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
            {
              label: "Other",
              value: "other",
            },
          ],
          variant: "dropdown",
          placeholder: "Gender",
          map: "gender",
        },
      ],
    },
  ];

  // add account creation field if needed
  if (showCreateAccount) {
    // schema.push({
    //   label: "Create a Next Practice account",
    //   description:
    //     "Create an account to take advantage of all the Next Practice benefits, including the ability to access your medical records, manage your appointments, receive reminders and track your health goals.",
    //   map: "createAccount",
    //   type: "options",
    //   options: {
    //     "Create an account": true,
    //     "Proceed as a guest": false,
    //   },
    //   variant: "inline",
    //   required: true,
    // });

    // force sign up by default
    schema.push({
      map: "createAccount",
      type: "hidden",
      forceValue: true,
    });
  }

  // add T&Cs
  schema.push({
    label:
      "I agree to the Next Practice Collection Statement, Consent Form and Privacy Policy",
    map: "acceptedTerms",
    type: "acceptLegals",
    disabled: !!disableConsent,
    contentUrl:
      "https://nextpracticehealth.com/legals/terms-and-conditions.json",
    required: !disableConsent,
  });

  return schema;
};
