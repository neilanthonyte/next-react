import {
  EFormFieldLayoutType,
  EFormType,
  IFormDetailsSingle,
} from "next-shared/src/types/formTypes";
import { EInclude } from "../types/IPersonalDetails";

export const addressSchema = (include: EInclude): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "Address",
  description: null,
  data: "Patient",
  transformers: [],
  fields: [
    {
      type: "group",
      label: "Address",
      fields: [
        {
          type: "text",
          label: "Street address",
          map: "Patient.address.0.line",
          allowMultiple: true,
          maxInstances: 2,
          required: include === EInclude.Required,
          defaultValue: [""],
        },
        {
          type: "group",
          layout: EFormFieldLayoutType.INLINE,
          fields: [
            {
              type: "text",
              label: "Suburb",
              map: "Patient.address.0.city",
              required: include === EInclude.Required,
            },
            {
              type: "postcode",
              label: "Post code",
              map: "Patient.address.0.postalCode",
              required: include === EInclude.Required,
              hideKeypad: true,
            },
          ],
        },
        {
          type: "options",
          label: "State",
          options: ["ACT", "NSW", "QLD", "VIC", "SA", "WA", "NT", "TAS"],
          variant: "inline",
          map: "Patient.address.0.state",
          required: include === EInclude.Required,
        },
        {
          type: "options",
          label: "Country",
          map: "Patient.address.0.country",
          variant: "inline",
          options: ["Australia", "New Zealand"],
          required: include === EInclude.Required,
        },
      ],
    },
  ],
});
