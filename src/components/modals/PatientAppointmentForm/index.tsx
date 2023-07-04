import * as React from "react";
import { useQuery } from "react-query";

import { IFormDetailsMixed } from "next-shared/src/types/formTypes";
import { IFormResources } from "next-shared/src/types/types";

import { useClient } from "../../../hooks/useClient";
import { ActiveFormView } from "../../forms/ActiveFormView";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useForm } from "../../../hooks/forms/useForm";

export interface IPatientAppointmentFormProps {
  formSlug: string;
  appointmentId: string;
  ehrId: string;
  prefillData?: IFormResources;
  onSuccess?: (data: IFormResources) => unknown;
  onCancel?: () => unknown;
}

/**
 * Modal used to fill in or edit reason for visit forms associated to an appointment
 */
export const PatientAppointmentForm: React.FC<IPatientAppointmentFormProps> = ({
  appointmentId,
  ehrId,
  formSlug,
  prefillData,
  onSuccess,
  onCancel,
}) => {
  const client = useClient();

  const {
    formSchema,
    errorFormSchema,
    isLoadingFormSchema,
    refetchFormSchema,
  } = useForm(formSlug);

  const submitFormData = React.useCallback(
    (data: any) => {
      return client.appointments
        .storeAppointmentFormData(ehrId, appointmentId, data, formSlug)
        .then(async () => {
          // callback
          onSuccess && onSuccess(data);
        });
    },
    [appointmentId, ehrId, onSuccess, formSlug],
  );

  return (
    <LoadingBlock
      error={errorFormSchema}
      isLoading={isLoadingFormSchema}
      refetch={refetchFormSchema}
    >
      {!isLoadingFormSchema && (
        <ActiveFormView
          schema={formSchema}
          onSuccess={submitFormData}
          onCancel={onCancel}
          data={prefillData}
        />
      )}
    </LoadingBlock>
  );
};
