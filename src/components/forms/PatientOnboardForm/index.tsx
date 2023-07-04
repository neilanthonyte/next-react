import * as React from "react";
import { useState, useEffect, useContext, useMemo } from "react";

import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { generateFhirPatient } from "next-shared/src/mockData/generateFhirPatient";

import { Form } from "../Form";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { EOptionalEhrDemographicsRequiredByNext } from "next-shared/src/types/ICheckForMatchingPatientResult";
import { useConfig } from "../../../hooks/core/useConfig";
import { IPersonalDetails } from "../../../types/IPersonalDetails";

import { useDemographicsSchema } from "../../../hooks/forms/useDemographicsSchema";

export type TOptionalEhrDemographicsRequiredByNext = Record<
  EOptionalEhrDemographicsRequiredByNext,
  boolean
>;

export interface IEhrPatientBasicsFormData {
  // use uppercase, as it is the name of the resource
  Patient: Partial<fhir3.Patient>;
}

export interface IEhrPatientBasicsFormProps {
  onSuccess: (data: IEhrPatientBasicsFormData) => any;
  prefillData?: IEhrPatientBasicsFormData;
  include: IPersonalDetails;
  disabledFields?: TOptionalEhrDemographicsRequiredByNext;
}

/**
 * Component to display a patient demographics form.
 */
export const PatientOnboardForm: React.FC<IEhrPatientBasicsFormProps> = ({
  prefillData = {},
  onSuccess,
  include,
  disabledFields,
}) => {
  const onCallback = async (data: IEhrPatientBasicsFormData) => {
    return await onSuccess(data);
  };

  const config = useConfig();
  const debugMockPatient = config?.debugMockPatient;
  const [ready, setReady] = useState<boolean>(!debugMockPatient);
  const [mockPrefill, setMockPrefill] =
    useState<IEhrPatientBasicsFormData>(null);

  useEffect(() => {
    (async () => {
      if (!debugMockPatient) return;

      const patient =
        debugMockPatient === "new"
          ? await generateFhirPatient(
              config?.debugFillEmail,
              config?.debugFillPhone,
            )
          : mockPatients[0].fhir;
      setMockPrefill((s) => ({ ...s, patient }));
      setReady(true);
    })();
  }, []);

  const { fields: allFields, transformers: allTransformers } =
    useDemographicsSchema(include, disabledFields);

  return (
    <LoadingBlock isLoading={!ready}>
      {ready && (
        <Form
          schema={allFields}
          dataTransformers={allTransformers}
          onSuccess={onCallback}
          data={mockPrefill || prefillData}
          disableOnSuccess={false}
        />
      )}
    </LoadingBlock>
  );
};
