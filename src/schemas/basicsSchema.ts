import {
  EFormFieldLayoutType,
  EFormType,
  IFormDetailsSingle,
} from "next-shared/src/types/formTypes";
import { TOptionalEhrDemographicsRequiredByNext } from "../components/forms/PatientOnboardForm";
import { namePattern, mobileOrLandlinePattern } from "../helpers/formPatterns";

export const basicsSchema = (
  disabledFields?: TOptionalEhrDemographicsRequiredByNext,
): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "DVA",
  description: null,
  data: "Patient",
  transformers: [
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
  ],
  fields: [
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
          readOnly: !!disabledFields?.prefix,
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
          readOnly: true,
        },
        {
          label: "Family Name",
          required: true,
          type: "text",
          placeholder: "Family Name",
          map: "name.0.family",
          pattern: namePattern,
          readOnly: true,
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
          readOnly: !!disabledFields?.email,
        },
        {
          label: "Mobile",
          type: "phone",
          required: true,
          hideKeypad: true,
          map: "$phone",
          placeholder: "Mobile",
          pattern: mobileOrLandlinePattern,
          readOnly: !!disabledFields?.mobile,
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
          readOnly: true,
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
          readOnly: true,
        },
      ],
    },
  ],
});
