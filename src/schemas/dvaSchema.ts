import {
  EFormFieldLayoutType,
  EFormType,
  IFormDetailsSingle,
} from "next-shared/src/types/formTypes";
import { EInclude } from "../types/IPersonalDetails";

export const dvaSchema = (include: EInclude): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "DVA",
  description: null,
  data: "Patient",
  transformers: [
    {
      type: "arrayToField",
      path: "Patient.identifier",
      filter: "system=http://ns.electronichealth.net.au/id/dva",
      dest: "dva",
    },
  ],
  fields: [
    {
      type: "group",
      // label: "DVA",
      map: "$dva",
      fields: [
        {
          type: "hidden",
          map: "type.coding.0.system",
          defaultValue: "http://hl7.org.au/fhir/v2/0203",
        },
        {
          label: "Department of Veterans Affairs (DVA) card",
          type: "dvaNumber",
          map: "value",
          maxLength: 9,
          required: include === EInclude.Required,
          formatters: [
            {
              toUpperCase: true,
            },
          ],
        },
        {
          type: "group",
          layout: EFormFieldLayoutType.INLINE,
          fields: [
            {
              type: "options",
              label: "DVA Card type",
              options: {
                "White card": "DVW",
                "Gold card": "DVG",
                "Orange card": "DVO",
              },
              map: "type.coding.0.code",
              conditional: {
                path: "../../../../value",
                isPresent: true,
                type: "visible",
              },
            },
            {
              type: "date",
              label: "Expiry",
              dateFormat: "YYYY-MM",
              minDate: "NOW()",
              maxDate: "NOW().offset(15,'years')",
              map: "period.end",
              conditional: {
                path: "../../value",
                isPresent: true,
                type: "visible",
              },
            },
          ],
        },
      ],
    },
  ],
});
