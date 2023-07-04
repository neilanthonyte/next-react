import { IFormSchema } from "next-shared/src/types/formTypes";

export const resetPasswordSchema: IFormSchema = [
  { type: "email", map: "email", required: true, hideKeypad: true },
];
