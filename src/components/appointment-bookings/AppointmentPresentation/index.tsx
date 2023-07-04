import * as React from "react";
import { useMemo, useEffect } from "react";
import { useQuery } from "react-query";

import { IFormDetailsMixed } from "next-shared/src/types/formTypes";
import { getReasonForVisitFormSlug } from "next-shared/src/helpers/getReasonForVisitFormSlug";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useClient } from "../../../hooks/useClient";
import { ActiveFormView } from "../../forms/ActiveFormView";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";

export interface IAppointmentPresentationProps {
  /** on form submit success callback */
  onSuccess: (data: any) => void;
  /** on dismiss callback */
  onDismiss?: () => void;
}

/**
 * Component showing a location presentation form tied to the active appointment type
 *
 * We save the reason for visit against the appointment, so that we can capture it
 * regardless of the patient being logged in / out / booking for self or for others
 */
export const AppointmentPresentation: React.FC<
  IAppointmentPresentationProps
> = ({ onSuccess, onDismiss }) => {
  const {
    patient,
    appointmentType,
    presentationFormResponse,
    setPresentationFormResponse,
    location,
  } = useRequiredContext(BookingContext);

  const client = useClient();

  const formName = getReasonForVisitFormSlug({ appointmentType, location });

  const {
    data: formSchema,
    error: formSchemaError,
    isLoading: isLoadingFormSchema,
    refetch: refetchFormSchema,
  } = useQuery<IFormDetailsMixed, Error>(
    ["retrieveFormSchema", formName],
    async () => client.forms.retrieveFormBySlug(formName),
    {
      enabled: !!formName,
    },
  );

  const prefillData = useMemo(() => {
    // if we have a prefilled form data response, use that as prefill
    // otherwise, if first time loading the form, pass the fhir patient
    // to drive the form conditional rendering (based on the Patient data)
    return presentationFormResponse || { Patient: patient };
  }, [patient, presentationFormResponse]);

  // when formName changes, we load a different schema reset the data.
  // IMPORTANT This will keep the data (and prefill) if the form schema is still the same
  // no matter what else changes (e.g. location, hcp, appoinmtent type, session)
  useEffect(() => {
    setPresentationFormResponse(null);
  }, [formName]);

  if (formSchemaError) {
    return (
      <ErrorPlaceholder
        title="An error occurred while loading the form."
        retry={refetchFormSchema}
      />
    );
  }

  if (isLoadingFormSchema === false && !formSchema) {
    console.warn("Form schema not available.");
  }

  const check = isLoadingFormSchema === false && !!formSchema;

  return (
    <>
      <p>
        To minimise waiting time and to aid us in delivering the very best
        healthcare please ensure all information is completed.
      </p>
      <p>
        If you do not have time, you can{" "}
        <a onClick={onDismiss}>skip this step &gt;</a>
      </p>
      <LoadingBlock isLoading={!check}>
        <ActiveFormView
          schema={formSchema}
          data={prefillData}
          onSuccess={onSuccess}
          onCancel={onDismiss}
          cancelLabel="Skip"
        />
      </LoadingBlock>
    </>
  );
};
