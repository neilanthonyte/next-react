import * as React from "react";
import { Form } from "../../forms/Form";
import { ICovidFormData, covidQuestion } from "./helpers/covidQuestion";

export interface ICovidRisk {
  atRisk: boolean;
  questions: ICovidFormData;
}

export interface ICovidFormProps {
  onSuccess: (data: ICovidRisk) => any;
}

export const CovidForm: React.FC<ICovidFormProps> = ({ onSuccess }) => {
  const onCallback = (data: ICovidFormData) => {
    const risk: ICovidRisk = {
      // at risk if any answer is true
      atRisk: Object.values(data).filter((v) => v).length > 0,
      questions: data,
    };
    onSuccess(risk);
  };
  return <Form schema={covidQuestion} onSuccess={onCallback} />;
};
