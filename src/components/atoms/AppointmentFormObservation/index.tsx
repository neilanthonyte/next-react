import * as React from "react";
import { useCallback, useState } from "react";
import { ELayoutVariant } from "next-shared/src/types/layouts";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import {
  IFormResources,
  MedicalResourceType,
} from "next-shared/src/types/types";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import ObservationCard from "../../resources/ObservationCard";
import { PatientAppointmentForm } from "../../modals/PatientAppointmentForm";
import { Modal, ModalHeader, ModalBody } from "../../structure/Modal";
import { FhirAppointmentUtil } from "next-shared/src/fhirUtil/utilClasses/FhirAppointmentUtil";

export interface IAppointmentFormObservationProps {
  appointmentWithDetails: IAppointmentWithDetails;
  form: fhir3.Observation;
  onFormSaveSuccess?: () => unknown;
}

/**
 * Display an appointment form with the ability to edit the form via a modal.
 *
 * TODO: consider if the props can be slimmed down
 */
export const AppointmentFormObservation: React.FC<
  IAppointmentFormObservationProps
> = ({ form, appointmentWithDetails, onFormSaveSuccess }) => {
  // the details of the form to edit
  const [activeFormDetails, setActiveFormDetails] = useState<{
    formSlug: string;
    prefillData: IFormResources;
    appointmentId: string;
    ehrId: string;
  }>(null);

  const handleOnFormEdit = useCallback((form: fhir3.Observation) => {
    const formUtil = fhirUtil<FhirObservationUtil>(form);
    const formSlug = formUtil.getObservationFormSlug();

    // get ehrId from appointment identifier (e.g. our next table ehrId)
    // location.ehrId (from NextLocation model) is a different id (namely the ehr instance id)
    const ehrId = fhirUtil<FhirAppointmentUtil>(
      appointmentWithDetails.appointment,
    ).getOriginEhrId();

    // triggers the form modal to appear
    setActiveFormDetails({
      formSlug,
      prefillData: { [MedicalResourceType.ReasonForVisit]: form },
      appointmentId: appointmentWithDetails.appointment.id,
      ehrId,
    });
  }, []);

  const closeModal = () => setActiveFormDetails(null);

  const handleOnFormSaveSuccess = useCallback(async () => {
    // refetch list of appointments if manual refetch passed
    onFormSaveSuccess && (await onFormSaveSuccess());
    // close modal
    setActiveFormDetails(null);
  }, [onFormSaveSuccess]);

  return (
    <>
      <ObservationCard
        data={form}
        variant={ELayoutVariant.Compact}
        onEdit={handleOnFormEdit}
      />
      <Modal open={!!activeFormDetails} onClose={closeModal}>
        <ModalHeader>Edit details</ModalHeader>
        <ModalBody>
          {!!activeFormDetails && (
            <PatientAppointmentForm
              formSlug={activeFormDetails.formSlug}
              prefillData={activeFormDetails.prefillData}
              appointmentId={activeFormDetails.appointmentId}
              ehrId={activeFormDetails.ehrId}
              onSuccess={handleOnFormSaveSuccess}
              onCancel={closeModal}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
