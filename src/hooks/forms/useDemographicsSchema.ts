import { useMemo } from "react";

import { IFormField, IFormTransformer } from "next-shared/src/types/formTypes";
import { IPersonalDetails } from "../../types/IPersonalDetails";
import { TOptionalEhrDemographicsRequiredByNext } from "../../components/forms/PatientOnboardForm";

import { medicareSchema } from "../../schemas/medicareSchema";
import { emergencyContactSchema } from "../../schemas/emergencyContactSchema";
import { addressSchema } from "../../schemas/addressSchema";
import { concessionSchema } from "../../schemas/concessionSchema";
import { dvaSchema } from "../../schemas/dvaSchema";
import { basicsSchema } from "../../schemas/basicsSchema";
import { atsiSchema } from "../../schemas/atsiSchema";
import { paymentSchema } from "../../schemas/paymentSchema";
import { profileImageSchema } from "../../schemas/profileImageSchema";
import { termsAndConditionsField } from "../../schemas/termsAndConditionsField";

/**
 * Builds a patient demographic form schema.
 *
 * @param include
 * @param disabledFields
 * @returns
 */
export const useDemographicsSchema = (
  include: IPersonalDetails,
  disabledFields?: TOptionalEhrDemographicsRequiredByNext,
) => {
  return useMemo(() => {
    let transformers: IFormTransformer[] = [];
    let fields: IFormField[] = [];

    if (include.basics) {
      const { fields: basicsFields, transformers: basicsTransformers } =
        basicsSchema(disabledFields);
      fields = [...fields, ...basicsFields];
      transformers = [...transformers, ...basicsTransformers];
    }
    if (include.atsi) {
      const { fields: atsiFields, transformers: atsiTransformers } = atsiSchema(
        include.atsi,
      );
      fields = [...fields, ...atsiFields];
      transformers = [...transformers, ...atsiTransformers];
    }
    if (include.termsAndConditions) {
      fields.push(termsAndConditionsField);
    }
    if (include.profileImage) {
      const {
        fields: profileImageFields,
        transformers: profileImageTransformers,
      } = profileImageSchema(include.profileImage);
      fields = [...fields, ...profileImageFields];
      transformers = [...transformers, ...profileImageTransformers];
    }
    if (include.payment) {
      const { fields: paymentFields, transformers: paymentTransformers } =
        paymentSchema(include.payment);
      fields = [...fields, ...paymentFields];
      transformers = [...transformers, ...paymentTransformers];
    }
    if (include.address) {
      const { fields: addressFields, transformers: addressTransformers } =
        addressSchema(include.address);
      fields = [...fields, ...addressFields];
      transformers = [...transformers, ...addressTransformers];
    }
    if (include.emergencyContact) {
      const { fields: contactFields, transformers: contactTransformers } =
        emergencyContactSchema(include.emergencyContact);
      fields = [...fields, ...contactFields];
      transformers = [...transformers, ...contactTransformers];
    }
    if (include.medicare || include.concession || include.dva) {
      fields.push({
        type: "heading",
        label: "Health Cover",
      });
    }
    if (include.medicare) {
      const { fields: medicareFields, transformers: medicareTransformers } =
        medicareSchema(include.medicare);
      fields = [...fields, ...medicareFields];
      transformers = [...transformers, ...medicareTransformers];
    }
    if (include.concession) {
      const { fields: concessionFields, transformers: concessionTransformers } =
        concessionSchema(include.concession);
      fields = [...fields, ...concessionFields];
      transformers = [...transformers, ...concessionTransformers];
    }
    if (include.dva) {
      const { fields: dvaFields, transformers: dvaTransformers } = dvaSchema(
        include.dva,
      );
      fields = [...fields, ...dvaFields];
      transformers = [...transformers, ...dvaTransformers];
    }
    return {
      fields,
      transformers,
    };
  }, [include]);
};
