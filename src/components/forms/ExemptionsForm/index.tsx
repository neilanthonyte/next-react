import * as React from "react";
import { Form } from "../../forms/Form";
import {
  IExemptionsFormData,
  exemptionsSchema,
} from "./helpers/exemptionsSchema";

export interface IExceptionCriteria {
  exempt: boolean;
  questions: IExemptionsFormData;
}

export interface IExemptionsFormProps {
  onSuccess: (data: IExceptionCriteria) => any;
  prefillData?: IExemptionsFormData;
}

export const ExemptionsForm: React.FC<IExemptionsFormProps> = ({
  prefillData = false,
  onSuccess,
}) => {
  const onCallback = (data: IExemptionsFormData) => {
    const risk: IExceptionCriteria = {
      // exempt if any answers are true
      exempt: Object.values(data).filter((v) => v).length > 0,
      questions: data,
    };
    onSuccess(risk);
  };
  return (
    <Form schema={exemptionsSchema} onSuccess={onCallback} data={prefillData} />
  );
};
