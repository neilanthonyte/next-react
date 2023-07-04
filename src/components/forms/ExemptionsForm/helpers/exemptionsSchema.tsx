import { IFormSchema } from "next-shared/src/types/formTypes";

export interface IExemptionsFormData {
  concessionCard?: boolean;
  age?: boolean;
  specialCategory?: boolean;
}

export const exemptionsSchema: IFormSchema = [
  {
    type: "boolean",
    label: "Are you a Commonwealth Concession Card Holder?",
    map: "concessionCard",
    required: true,
  },
  {
    type: "boolean",
    label: "Are you aged under 16 or are you aged 70 or over?",
    map: "age",
    required: true,
  },
  {
    type: "boolean",
    label: "Do any of the below apply to you?",
    description:
      "<ul><li>Are you under treatment for a chronic health condition; or</li><li>Do you have an immune deficiency; or</li><li>Are you an expectant mother or a parent of children under 12 months; or</li><li>Do you identify as being of Aboriginal or Torres Strait Islander descent and is at least 50 years old</li><li>Are you required to self-isolate or self-quarantine in accordance with guidance issued by the Australian Health Protection Principal Committee in relation to COVID-19</li></ul>",
    map: "specialCategory",
    required: true,
  },
];
