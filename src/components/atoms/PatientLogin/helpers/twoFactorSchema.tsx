import { IFormSchema } from "next-shared/src/types/formTypes";

export const twoFactorSchema: IFormSchema = [
  { type: "pin", length: 7, map: "twoFactor", required: true },
];
