import * as React from "react";
import { useState } from "react";

import { Patient } from "next-shared/src/models/Patient";
import { IFormSchema } from "next-shared/src/types/formTypes";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { Form } from "../../forms/Form";
import { useClient } from "../../../hooks/useClient";
import {
  SuccessMessage,
  MessageTitle,
  ErrorMessage,
  MessageBody,
} from "../../generic/Message";
import { Currency } from "../../generic/Currency";
import { VStack } from "../../structure/VStack";

const payNowSchema: IFormSchema = [
  {
    label: "Provider",
    description:
      "For billing purposes, please indicate the provider the patient visited.",
    map: "provider",
    type: "options",
    variant: "dropdown",
    options: [],
    suggestion: {
      name: "PaymentCategory",
      prop: "data",
    },
    required: true,
  },
  {
    label: "Amount",
    map: "amount",
    type: "number",
    placeholder: "XX.XX",
    required: true,
    hideKeypad: true,
  },
];

interface IFormData {
  amount: number;
  provider: string;
}

export interface IOneTimePaymentFormProps {
  patient?: Patient;
  appointmentWithDetails?: IAppointmentWithDetails;
  onCancel?: () => void;
}

export const OneTimePaymentForm: React.FC<IOneTimePaymentFormProps> = ({
  patient,
  appointmentWithDetails,
  onCancel,
}) => {
  const client = useClient();
  const [successAmount, setSuccessAmount] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = async (data: IFormData) => {
    setSuccessAmount(0);
    setErrorMessage(null);

    if (patient) {
      return client.payments
        .takePayment(patient.patientId, data.amount, data.provider)
        .then(() => {
          setSuccessAmount(data.amount);
        })
        .catch(() => {
          setErrorMessage(
            "Unfortunately we are unable to charge the patient at this time.",
          );
        });
    }
    const { appointment } = appointmentWithDetails;
    return client.payments
      .takeAppointmentPayment(appointment.id, data.amount, data.provider)
      .then(() => {
        setSuccessAmount(data.amount);
      })
      .catch(() => {
        setErrorMessage(
          "Unfortunately we are unable to charge the patient at this time.",
        );
      });
  };

  if (patient && !patient.paydockCustomerId) {
    console.warn("Patient cannot be charged without a paydock customer id");
    return null;
  }

  return (
    <VStack>
      <Form
        schema={payNowSchema}
        submitLabel="Charge patient"
        onSuccess={onSubmit}
        onCancel={onCancel}
        cancelLabel="Close"
        disableOnSuccess={false}
      />
      {successAmount && (
        <SuccessMessage>
          <MessageTitle>Payment successful</MessageTitle>
          <MessageBody>
            The patient has been charged <Currency>{successAmount}</Currency>.
          </MessageBody>
        </SuccessMessage>
      )}
      {errorMessage && (
        <ErrorMessage>
          <MessageTitle>Charge failed</MessageTitle>
          <MessageBody>{errorMessage}</MessageBody>
        </ErrorMessage>
      )}
    </VStack>
  );
};
