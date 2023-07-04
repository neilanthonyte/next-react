import { IFormSchema } from "next-shared/src/types/formTypes";

export const createStaffMemberSchema: IFormSchema = [
  {
    map: "email",
    label: "Email",
    type: "email",
    required: true,
  },
  {
    map: "password",
    label: "Password",
    type: "password",
    required: true,
  },
  {
    map: "hasHelixUser",
    label:
      "Does this person have an associated Helix account and needs to use the Next system?",
    type: "boolean",
    required: true,
  },
  {
    map: "requiresClinicalAccess",
    label:
      "Does this person need to view the patients clinical details? This should be reserved to medical professionals only",
    type: "boolean",
    required: true,
  },
  {
    label: "Location",
    map: "location",
    type: "options",
    variant: "dropdown",
    options: [],
    suggestion: {
      name: "LocationInstances",
      prop: "data",
    },
    required: true,
  },
  {
    label: "EHR User",
    map: "ehrUser",
    type: "options",
    variant: "dropdown",
    options: [],
    suggestion: {
      name: "EhrPractitioners",
      prop: "data",
    },
    conditional: {
      path: "../hasHelixUser",
      match: true,
      type: "visible",
    },
  },
];
