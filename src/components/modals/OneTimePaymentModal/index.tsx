import * as React from "react";

import { Patient } from "next-shared/src/models/Patient";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { Modal, ModalBody, ModalHeader } from "../../structure/Modal";
import { OneTimePaymentForm } from "../../subscriptions/OneTimePaymentForm";
import { AppointmentCell } from "../../cells/AppointmentCell";
import { VStack } from "../../structure/VStack";

export interface ICreatePatientSubscriptionModalProps {
  patient?: Patient;
  appointmentWithDetails?: IAppointmentWithDetails;
  close: () => void;
}

export const OneTimePaymentModal: React.FC<
  ICreatePatientSubscriptionModalProps
> = ({ patient, appointmentWithDetails, close }) => {
  if (!!patient && !!appointmentWithDetails) {
    console.error(
      "OneTimePaymentModal expected to receive either a patient or an appointment",
    );
    return null;
  }
  return (
    <Modal open={true} onClose={close} size={TDialogSizes.Medium}>
      <ModalHeader>One time payment</ModalHeader>
      <ModalBody>
        {patient && <h4>Charging credit card on patient record</h4>}
        {appointmentWithDetails && (
          <VStack>
            <h4>Charging credit card provided for appointment</h4>
            <AppointmentCell appointment={appointmentWithDetails.appointment} />
          </VStack>
        )}
        <OneTimePaymentForm
          patient={patient}
          appointmentWithDetails={appointmentWithDetails}
          onCancel={close}
        />
      </ModalBody>
    </Modal>
  );
};
