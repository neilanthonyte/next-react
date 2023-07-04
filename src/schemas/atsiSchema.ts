import { EFormType, IFormDetailsSingle } from "next-shared/src/types/formTypes";
import { EInclude } from "../types/IPersonalDetails";

export const atsiSchema = (include: EInclude): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "ATSI Status",
  description: null,
  data: "Patient",
  transformers: [
    {
      type: "arrayToField",
      path: "Patient.extension",
      filter:
        "url=http://hl7.org.au/fhir/StructureDefinition/indigenous-status",
      src: "valueCoding.code",
      dest: "atsi",
    },
  ],
  fields: [
    {
      type: "options",
      label: "Indigenous status",
      map: "$atsi",
      description:
        "Please indicate whether you are Aboriginal or a Torres Strait Islander.",
      // https://meteor.aihw.gov.au/content/index.phtml/itemId/602543#Codes
      // 1	Aboriginal but not Torres Strait Islander origin
      // 2	Torres Strait Islander but not Aboriginal origin
      // 3	Both Aboriginal and Torres Strait Islander origin
      // 4	Neither Aboriginal nor Torres Strait Islander origin
      // 9	Not stated/inadequately described
      options: [
        {
          label: "Neither",
          value: "4",
        },
        {
          label: "Aboriginal",
          value: "1",
        },
        {
          label: "Torres Strait Islander",
          value: "2",
        },
        {
          label: "Both Aboriginal & Torres Strait Islander",
          value: "3",
        },
        {
          label: "Unspecified",
          value: "9",
        },
      ],
      required: true,
      variant: "inline",
    },
  ],
});
