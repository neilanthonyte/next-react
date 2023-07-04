import * as React from "react";
import { Form } from "../../forms/Form";
import { IFormField } from "next-shared/src/types/formTypes";
const appointmentMethodSchema: IFormField[] = [
  {
    type: "options",
    options: ["Physically", "Video consult", "Phone call"],
    label: "How would you like to receive this consult?",
    map: "method",
    required: true,
    variant: "inline",
  },
];

export interface IAppointmentServiceMethodFormData {
  method: string;
}

export interface IAppointmentServiceMethodFormProps {
  onSuccess: (data: IAppointmentServiceMethodFormData) => any;
}

/**
 * Ask the patient how they would like an appointment that can either be digital or physical
 * how they would prefer to receive the appointment.
 */
export const AppointmentServiceMethodForm: React.FC<
  IAppointmentServiceMethodFormProps
> = ({ onSuccess }) => {
  return <Form schema={appointmentMethodSchema} onSuccess={onSuccess} />;
};
