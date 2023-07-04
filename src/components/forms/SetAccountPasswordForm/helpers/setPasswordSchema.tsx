import { IFormField } from "next-shared/src/types/formTypes";

export const setPasswordSchema: IFormField[] = [
  {
    type: "passwordConfirm",
    required: true,
    label: "Password & Confirm",
    map: "password",
    requiredMessage: "^Your passwords must match",
  },
];
