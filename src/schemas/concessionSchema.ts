import {
  EFormFieldLayoutType,
  EFormType,
  IFormDetailsSingle,
} from "next-shared/src/types/formTypes";
import { EInclude } from "../types/IPersonalDetails";

export const concessionSchema = (include: EInclude): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "Concession",
  description: null,
  data: "Patient",
  transformers: [
    {
      type: "arrayToField",
      path: "Patient.identifier",
      filter:
        "system=http://ns.electronichealth.net.au/id/centrelink-customer-reference-number",
      dest: "concessionCard",
    },
  ],
  fields: [
    {
      type: "group",
      // label: "Concession card",
      map: "$concessionCard",
      fields: [
        {
          type: "hidden",
          map: "type.coding.0.system",
          defaultValue: "http://hl7.org.au/fhir/v2/0203",
        },
        {
          label: "Concession Card number",
          type: "concessionCardNumber",
          map: "value",
          maxLength: 12,
          required: include === EInclude.Required,
          formatters: [
            {
              formatPattern: "^(\\d{3}) ?(\\d{3}) ?(\\d{0,4})",
              formatBlueprint: "$1$2$3",
              formatFilter: " +$",
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
              label: "Concession Card type",
              options: {
                "Commonwealth seniors health card": "SEN",
                "Health care concession card": "HC",
                "Pension concession card": "PEN",
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
              dateFormat: "YYYY-MM-DD",
              minDate: "NOW()",
              maxDate: "NOW().offset(10,'years')",
              conditional: {
                path: "../../value",
                isPresent: true,
                type: "visible",
              },
              map: "period.end",
            },
          ],
        },
      ],
    },
  ],
});
