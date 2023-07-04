import * as React from "react";
import { useState, useEffect, useContext } from "react";

import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { generateFhirPatient } from "next-shared/src/mockData/generateFhirPatient";

import { Form } from "../../forms/Form";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ConfigContext } from "../../../contexts/ConfigContext";
import {
  buildPatientBasicsSchema,
  patientBasicsTransformers,
} from "./helpers/patientBasicsSchema";

export interface IPatientBasicsFormData {
  Patient: fhir3.Patient;
  acceptedTerm: boolean;
  createAccount: boolean;
}

export interface IPatientBasicsFormProps {
  onSuccess: (data: IPatientBasicsFormData) => any;
  prefillData?: IPatientBasicsFormData;
  disableConsent?: boolean;
  showCreateAccount?: boolean;
}

export const PatientBasicsForm: React.FC<IPatientBasicsFormProps> = ({
  prefillData = {},
  disableConsent = false,
  showCreateAccount = false,
  onSuccess,
}) => {
  // based on the standard patient onboard form
  const onCallback = async (data: IPatientBasicsFormData) => {
    return await onSuccess(data);
  };

  const { config } = useContext(ConfigContext);
  const debugMockPatient = config?.debugMockPatient;
  const [ready, setReady] = useState<boolean>(!debugMockPatient);
  const [mockPrefill, setMockPrefill] = useState<IPatientBasicsFormData>(null);

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
      setMockPrefill((s) => ({ ...s, Patient: patient }));
      setReady(true);
    })();
  }, []);

  return (
    <LoadingBlock isLoading={!ready}>
      {ready && (
        <Form
          schema={buildPatientBasicsSchema(disableConsent, showCreateAccount)}
          dataTransformers={patientBasicsTransformers}
          onSuccess={onCallback}
          data={mockPrefill || prefillData}
          disableOnSuccess={false}
        />
      )}
    </LoadingBlock>
  );
};
