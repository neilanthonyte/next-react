import { IFormField } from "next-shared/src/types/formTypes";

export const termsAndConditionsField: IFormField = {
  label:
    "I agree to the Next Practice Collection Statement, Consent Form and Privacy Policy",
  map: "acceptedTerms",
  type: "acceptLegals",
  contentUrl: "https://nextpracticehealth.com/legals/terms-and-conditions.json",
  required: true,
};
