import { isValidMobileNumber } from "next-shared/src/helpers/phoneNumberHelpers";

export default (value: unknown, options: any) => {
  const errorMessage = options?.message ?? "Invalid phone number.";
  const isValid = typeof value === "string" && isValidMobileNumber(value);
  return isValid ? null : errorMessage;
};
