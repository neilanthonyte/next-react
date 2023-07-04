import * as React from "react";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPersonUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPersonUtil";

import { Form } from "../../../forms/Form";
import { PatientCard } from "../../../resources/PatientCard";
import { VStack } from "../../../structure/VStack";
import { credentialsSchema } from "../../../../schemas/credentialsSchema";

interface ICompleteAccountProps {
  patient: fhir3.Patient;
  onSuccess: (formData: any) => void;
}

/**
 * Component rendering preview of temporary patient details and form to complete the signup
 */
export const CompleteAccount: React.FC<ICompleteAccountProps> = ({
  onSuccess,
  patient,
}) => {
  return (
    <VStack>
      <PatientCard hideExtendedSections={true} data={patient} />
      <Form
        schema={credentialsSchema}
        disableOnSuccess={false}
        data={{
          email: fhirUtil<FhirPersonUtil>(patient).getPrimaryEmail(),
        }}
        onSuccess={onSuccess}
      />
    </VStack>
  );
};
