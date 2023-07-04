import { IFormSchema } from "next-shared/src/types/formTypes";

export const twoFactorAuthenticationSchema: IFormSchema = [
  {
    type: "pin",
    map: "twoFACode",
    required: true,
    length: 7,
    // HACK, pin validation not checking length, allowing for short code to be submitted
    minLength: 7,
  },
];
