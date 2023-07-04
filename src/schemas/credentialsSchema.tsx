import { IFormSchema } from "next-shared/src/types/formTypes";
import { termsAndConditionsField } from "./termsAndConditionsField";

export const credentialsSchema: IFormSchema = [
  {
    type: "email",
    label: "Please enter your email",
    map: "email",
    required: true,
  },
  {
    type: "passwordConfirm",
    label: "Please enter a secure password",
    map: "password",
    required: true,
  },
];

credentialsSchema.push(termsAndConditionsField);
