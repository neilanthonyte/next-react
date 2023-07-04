import * as React from "react";
import { useCallback, useMemo } from "react";

import { EOptionalEhrDemographicsRequiredByNext } from "next-shared/src/types/ICheckForMatchingPatientResult";

import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useClient } from "../../../hooks/useClient";
import {
  IEhrPatientBasicsFormData,
  PatientOnboardForm,
} from "../../forms/PatientOnboardForm";
import { EInclude, IPersonalDetails } from "../../../types/IPersonalDetails";

interface IEhrPatientFormProps {
  // callback on successful patient record update in case of missing details submitted via demographic form
  onRecordUpdate?: () => any;
  // optional specific detail
  missingDetails?: string[];
  include: IPersonalDetails;
}

/**
 * Collects the EHR Patient details and saves it directly against the EHR. Some usages
 * include:
 *
 * - forcefully collecting essential EHR data, e.g. email
 * - collecting the general patient information to aid in guest-only workflows
 */
export const EhrPatientForm: React.FC<IEhrPatientFormProps> = ({
  missingDetails = [],
  include,
  onRecordUpdate,
}) => {
  const { ehrPatient } = useSyncedSessionData();
  const client = useClient();

  const { disabledFields } = useMemo(() => {
    return {
      showDemographicForm: true,
      disabledFields: {
        prefix: !missingDetails.includes(
          EOptionalEhrDemographicsRequiredByNext.prefix,
        ),
        email: !missingDetails.includes(
          EOptionalEhrDemographicsRequiredByNext.email,
        ),
        mobile: !missingDetails.includes(
          EOptionalEhrDemographicsRequiredByNext.mobile,
        ),
      },
    };
  }, [missingDetails]);

  const handleOnSuccess = useCallback(
    (data: IEhrPatientBasicsFormData) => {
      const updatedFhirPatient: fhir3.Patient = {
        ...ehrPatient.fhir,
        ...data.Patient,
      };
      if (data.Patient.telecom) {
        // need to merge original ehrPatient fhir with updated details
        // also need to filter out and rebuild telecom to make sure we dont lose any non mobile numbers
        const ehrLandlines = ehrPatient.fhir.telecom.filter(
          (t) => t.system === "phone" && t.use !== "mobile",
        );
        const newTelecom = data.Patient.telecom.concat(ehrLandlines);

        updatedFhirPatient.telecom = newTelecom;
      }
      return client.patients
        .updateEhrPatient(ehrPatient?.ehrPatientId, updatedFhirPatient)
        .then(() => onRecordUpdate?.());
    },
    [ehrPatient],
  );

  return (
    <PatientOnboardForm
      onSuccess={handleOnSuccess}
      prefillData={{
        Patient: ehrPatient?.fhir,
      }}
      disabledFields={disabledFields}
      include={include}
    />
  );
};

export interface IProvisionalEhrPatientFormProps
  extends Omit<IEhrPatientFormProps, "include"> {}

/**
 * EHR Patient form used during the companion onboard flow.
 */
export const ProvisionalEhrPatientForm: React.FC<
  IProvisionalEhrPatientFormProps
> = (props) => {
  return (
    <EhrPatientForm
      {...props}
      include={{
        // basics: EInclude.Required,
        // termsAndConditions: EInclude.Required,
        address: EInclude.Optional,
        emergencyContact: EInclude.Optional,
        medicare: EInclude.Optional,
        concession: EInclude.Optional,
        dva: EInclude.Optional,
      }}
    />
  );
};
