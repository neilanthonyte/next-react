import * as React from "react";
import { useCallback } from "react";

import { VStack } from "../../structure/VStack";
import { Form } from "../../forms/Form";
import { IPersonalDetails } from "../../../types/IPersonalDetails";
import { useDemographicsSchema } from "../../../hooks/forms/useDemographicsSchema";

export interface IRequiredDetailsFormProps {
  include: IPersonalDetails;
  onSubmit: (data: fhir3.Patient) => void;
}

/**
 * A dumb form for medicare, emergency contact and/or address all in one. Submission logic is left to the parent.
 * @param include booleans indicating which patient details will be included in the form
 * @param onSubmit a callback to be run as soon as the form is submitted.
 */
export const SupplementaryDetailsForm: React.FC<IRequiredDetailsFormProps> = ({
  include,
  onSubmit,
}) => {
  const handleSubmit = useCallback(
    (data) => {
      return onSubmit(data.Patient);
    },
    [onSubmit],
  );

  const { fields, transformers } = useDemographicsSchema(include);

  return (
    <VStack>
      {include.medicare && (
        <p>
          This type of appointment requires a valid medicare card. If you do not
          have one, please visit{" "}
          <a href="https://www.health.gov.au/initiatives-and-programs/covid-19-vaccines/getting-vaccinated-for-covid-19/getting-a-covid-19-vaccine-if-you-are-not-eligible-for-medicare">
            health.gov.au
          </a>
        </p>
      )}
      <Form
        schema={fields}
        dataTransformers={transformers}
        onSuccess={handleSubmit}
      />
    </VStack>
  );
};
