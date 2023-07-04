import * as React from "react";
import { useCallback, useMemo } from "react";
import { queryCache } from "react-query";

import {
  IFormResources,
  MedicalResourceType,
} from "next-shared/src/types/types";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirObservationUtil } from "next-shared/src/fhirUtil/utilClasses/FhirObservationUtil";
import { EFormType, IFormDetailsMixed } from "next-shared/src/types/formTypes";

import { useClient } from "../../../hooks/useClient";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { RequireConsent } from "../../handlers/RequireConsent";
import { ActiveFormView } from "../../forms/ActiveFormView";
import { EMultiFormDisplayStyle } from "../../forms/MultiForm";
import { useFetchForms } from "../../../hooks/forms/useFetchForm";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";
import {
  IPayDockContextValue,
  PayDockContext,
} from "../../../contexts/PayDockContext";

interface IPatientFormProps {
  formSlug: string;
  isMultiForm?: boolean;
  onSuccess: (data: any) => any;
  displayStyle?: EMultiFormDisplayStyle;
  onCancel?: () => any;
  cancelLabel?: string;
  /** prefill data overriding form data fetch */
  prefillData?: IFormResources;
  /** exclude reason for visit in the prefill */
  disableReasonForVisitPrefill?: boolean;
  /** in some scenarios, we want to fetch the latest schema from the cms even if a form schema extension is present in the prefill data */
  forceFetchLatestSchema?: boolean;
}

/**
 * Renders a form from a given slug for the patient in session
 */
export const PatientForm: React.FC<IPatientFormProps> = ({
  formSlug,
  onSuccess,
  onCancel,
  cancelLabel,
  displayStyle,
  prefillData,
  disableReasonForVisitPrefill = false,
  forceFetchLatestSchema = false,
}) => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();
  const { activeLocation } = useActiveLocation();

  const patientId = useMemo(() => {
    return nextPatient?.patientId;
  }, [nextPatient?.patientId]);

  const bypassFormDataFetch = !!prefillData;

  // check if we have a prefill and if there was a form schema extension on the observation
  const formSchemaExtension = useMemo(() => {
    if (!prefillData || forceFetchLatestSchema) return;
    const prefillDataValues = Object.values(prefillData);
    // we only handle single resource forms for now
    // e.g. { observation:OnboardingForm: [{fhir3.Observation}]}
    if (prefillDataValues.length > 1) return;
    const observation = prefillDataValues[0] as fhir3.Observation;
    if (observation?.resourceType !== "Observation") return;
    return fhirUtil<FhirObservationUtil>(
      observation,
    ).getObservationFormSchema();
  }, [prefillData, forceFetchLatestSchema]);

  const {
    formSchema: cmsFormSchema,
    formData,
    error,
    isLoading,
    refetch,
  } = useFetchForms(formSlug, patientId, {
    enabled: true,
    bypassFormDataFetch,
  });

  const formSchema = useMemo<IFormDetailsMixed>(() => {
    // preferentially return the updated schema from the CMS, and only use the schema stored in the FHIR extension as a fallback
    if (cmsFormSchema) return cmsFormSchema;
    if (!formSchemaExtension) return;
    let parsedSchema;
    try {
      parsedSchema = JSON.parse(formSchemaExtension);
    } catch (error) {
      console.error(
        "Error parsing form schema stored as observation extension",
      );
    }
    return parsedSchema;
  }, [formSchemaExtension, cmsFormSchema]);

  const submitFormData = useCallback(
    async (data: any) => {
      if (!patientId) {
        console.warn("trying to submit without patient");
        return null;
      }
      // HACK don't pass form slug to endpoint if multi forms as not supported
      // the enpoint will add form extensions (slug and schema) if passed
      const singleFormSlug =
        formSchema.type === EFormType.Multi ? undefined : formSlug;
      // for now, we don't manage this with react query as forms have their own error handling
      // ideally the form itself should implement react query internally to manage the validation onSuccess callback (submit in this case)
      return client.patients
        .storeFormData(patientId, data, singleFormSlug)
        .then(async () => {
          // call onSuccess callback
          onSuccess(data);
          // early return if we don't have a form schema (we had an override from the prefill data extension)
          if (!cmsFormSchema) return;
          // try and clear data query cache so if the form reloads it refetches the form data
          queryCache.invalidateQueries([
            "retrieveFormData",
            JSON.stringify(cmsFormSchema),
            patientId,
          ]);
        });
    },
    [patientId, cmsFormSchema, formSchema, formSlug],
  );

  const data = useMemo(() => {
    const prefill = prefillData || formData;
    if (prefill && disableReasonForVisitPrefill) {
      delete prefill[MedicalResourceType.ReasonForVisit];
    }
    return prefill;
  }, [prefillData, formData, disableReasonForVisitPrefill]);

  const paydockContextValue: IPayDockContextValue = useMemo(
    () => ({
      gatewayId: activeLocation?.paydockServiceId,
      prefillData: {
        email: nextPatient?.getFhirEmail(),
        nameOnCard: nextPatient?.getDisplayName(),
      },
    }),
    [activeLocation, nextPatient],
  );

  const isLoadingContent = isLoading || !formSchema;

  return (
    <LoadingBlock isLoading={isLoadingContent} error={error} refetch={refetch}>
      {!isLoadingContent && (
        <RequireConsent>
          <PayDockContext.Provider value={paydockContextValue}>
            <ActiveFormView
              schema={formSchema}
              onSuccess={submitFormData}
              onCancel={onCancel}
              cancelLabel={cancelLabel}
              data={data}
              displayStyle={displayStyle}
            />
          </PayDockContext.Provider>
        </RequireConsent>
      )}
    </LoadingBlock>
  );
};
