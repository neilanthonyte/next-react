import {
  EFormFieldLayoutType,
  EFormType,
  IFormDetailsSingle,
} from "next-shared/src/types/formTypes";
import { EInclude } from "../types/IPersonalDetails";

export const paymentSchema = (include: EInclude): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "Payment Methods",
  description: null,
  data: "CreditCard",
  transformers: [],
  fields: [
    {
      label: "Credit card",
      description:
        "To allow for automatic payments please provide your credit card details.",
      disclaimer:
        "Your payment will be managed securely through, PayDock. Card details are collected at the time of booking and the total amount will be charged on completion of the appointment.  Medicare Card holders may be eligible for a rebate. This will be refunded to your account in approximately 3 business days by Medicare.",
      type: "creditCard",
      map: "CreditCard",
      required: false,
    },
  ],
});
