import { EFormType, IFormDetailsSingle } from "next-shared/src/types/formTypes";
import { EInclude } from "../types/IPersonalDetails";

export const medicareSchema = (include: EInclude): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "Medicare",
  description: null,
  data: "Patient",
  transformers: [
    {
      type: "arrayToField",
      path: "Patient.identifier",
      filter: "system=http://ns.electronichealth.net.au/id/medicare-number",
      dest: "medicare",
    },
  ],
  fields: [
    {
      type: "group",
      map: "$medicare",
      // label: "Medicare Card",
      fields: [
        {
          label: "Medicare Card number",
          description:
            "Please add your Medicare number followed by your Individual Reference Number (IRN)",
          descriptionImageUrl:
            "https://d1qr34qzhiwpdo.cloudfront.net/medicare-guide.jpg",
          type: "medicareNumber",
          map: "value",
          hideKeypad: true,
          required: include === EInclude.Required,
        },
        {
          label: "Expiry",
          type: "date",
          dateFormat: "YYYY-MM",
          maxDate: "NOW().offset(8,'years')",
          map: "period.end",
          required: include === EInclude.Required,
          conditional: {
            path: "../../value",
            isPresent: true,
            type: "visible",
          },
        },
      ],
    },
  ],
});
