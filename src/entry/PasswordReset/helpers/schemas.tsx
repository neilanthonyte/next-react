import { IFormSchema } from "next-shared/src/types/formTypes";

export const newPasswordSchema: IFormSchema = [
  {
    type: "passwordConfirm",
    required: true,
    label: "Password & Confirm",
    map: "password",
    requiredMessage: "^Your passwords must match",
    // HACK reinstate when there is a patient specific route
    // remoteCheck: "{servicesUrl}auth/check-password-strength",
    // remoteMessage:
    //   "^Your password is not strong enough. Please add characters or use numbers/special characters",
  },
];

export const twoFactorSchema: IFormSchema = [
  {
    label: "Authentication Code",
    type: "pin",
    length: 7,
    required: true,
    map: "twoFactorCode",
  },
];
