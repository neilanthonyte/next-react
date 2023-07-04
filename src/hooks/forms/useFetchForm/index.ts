import { useQuery } from "react-query";
import { useMemo, useCallback } from "react";

import { IFormDetailsMixed } from "next-shared/src/types/formTypes";
import { IFormResources, FormResourceType } from "next-shared/src/types/types";
import { useClient } from "../../useClient";
import { useForm } from "../useForm";

export interface IFetchForms {
  error: Error | null;
  isLoading: boolean;
  formData: IFormResources;
  formSchema: IFormDetailsMixed;
  refetch: () => any;
}

export const useFetchForms = (
  formSlug: string,
  patientId?: string,
  options = {
    /** disable queries, used when we already have a schema and we don't want to fetch */
    enabled: true,
    /** disable form data fetching in case prefill data is manually passed */
    bypassFormDataFetch: false,
  },
): IFetchForms => {
  const client = useClient();

  const {
    formSchema,
    errorFormSchema,
    isLoadingFormSchema,
    refetchFormSchema,
  } = useForm(options.enabled ? formSlug : null);

  const {
    data: formData,
    error: formDataError,
    isLoading: isLoadingFormData,
    refetch: refetchFormData,
  } = useQuery<IFormResources, Error>(
    ["retrieveFormData", JSON.stringify(formSchema), patientId],
    () => {
      return client.patients.retrieveFormData(
        patientId,
        formSchema.data.split(/,/) as FormResourceType[],
      );
    },
    // run query only when we have a formschema with a data property and a patientId
    {
      enabled:
        Boolean(formSchema && formSchema.data) &&
        Boolean(patientId) &&
        options.bypassFormDataFetch === false,
    },
  );

  const handleRefetch = useCallback(async () => {
    await Promise.all([
      errorFormSchema ? refetchFormSchema() : null,
      formDataError ? refetchFormData() : null,
    ]);
  }, [refetchFormSchema, refetchFormData, errorFormSchema, formDataError]);

  return useMemo<IFetchForms>(
    () => ({
      formData,
      formSchema,
      error: formDataError || errorFormSchema,
      isLoading: isLoadingFormData || isLoadingFormSchema,
      refetch: handleRefetch,
    }),
    [
      formData,
      formSchema,
      formDataError,
      errorFormSchema,
      isLoadingFormData,
      isLoadingFormSchema,
      handleRefetch,
    ],
  );
};
