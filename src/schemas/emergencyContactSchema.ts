import {
  EFormFieldLayoutType,
  EFormType,
  IFormDetailsSingle,
} from "next-shared/src/types/formTypes";
import { EInclude } from "../types/IPersonalDetails";
import { mobileOrLandlinePattern } from "../helpers/formPatterns";

export const emergencyContactSchema = (
  include: EInclude,
): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "Secondary contacts",
  description: null,
  data: "Patient",
  transformers: [],
  fields: [
    {
      type: "group",
      label: "Emergency contact",
      map: "Patient.contact.0",
      fields: [
        {
          type: "group",
          layout: EFormFieldLayoutType.INLINE,
          fields: [
            {
              type: "text",
              label: "Name",
              map: "name.text",
              required: include === EInclude.Required,
              pattern: "^[a-zA-Z-' ]*$",
            },
            {
              type: "text",
              label: "Relationship",
              map: "relationship.0.text",
              required: include === EInclude.Required,
            },
          ],
        },
        {
          type: "phone",
          label: "Contact number",
          map: "telecom.0.value",
          required: include === EInclude.Required,
          hideKeypad: true,
          pattern: mobileOrLandlinePattern,
        },
        {
          type: "hidden",
          defaultValue: "phone",
          map: "telecom.0.system",
        },
      ],
    },
  ],
});
