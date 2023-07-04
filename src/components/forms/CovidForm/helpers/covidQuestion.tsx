import { IFormSchema } from "next-shared/src/types/formTypes";

export interface ICovidFormData {
  atRisk: boolean;
}

export const covidQuestion: IFormSchema = [
  {
    label: "Do any of the following apply to you?",
    description:
      "<p>Have you been diagnosed with Coronavirus (COVID-19)?</p><p>OR</p><p>In the last 14 days:</p><ul><li>Have you developed symptoms such as a fever, cough, sore throat, fatigue, runny nose or shortness of breath; or</li><li>Have you travelled overseas; or</li><li>Have you travelled interstate (arriving into Queensland, Western Australia, South Australia, Tasmania, or Northern Territory); or</li><li>Do you believe that you have been in close contact with a confirmed case of Coronavirus (COVID- 19)</li></ul><p>OR</p><p>Have you been recommended to self-isolate or quarantine based on advice from:</p><ul><li>Public Health Authorities</li><li>A registered medical or nursing practitioner</li><li>COVID-19 trained health clinic triage staff?</li></ul><p>OR</p><p>Is your consult to discuss any of these symptoms?</p>",
    type: "boolean",
    map: "atRisk",
    required: true,
  },
];
