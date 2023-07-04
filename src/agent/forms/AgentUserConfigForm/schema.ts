import { IFormSchema } from "next-shared/src/types/formTypes";

export const agentUserConfigFormSchema: IFormSchema = [
  {
    type: "options",
    label: "Software",
    options: ["Best Practice Premier", "PracSoft"],
    required: true,
    map: "software",
  },
  {
    type: "text",
    label: "SQL Connection string",
    map: "sqlConnectionString",
    required: true,
    hideKeypad: true,
  },
  {
    type: "text",
    label: "IRIS URL",
    map: "irisUrl",
    required: true,
    hideKeypad: true,
  },
];
