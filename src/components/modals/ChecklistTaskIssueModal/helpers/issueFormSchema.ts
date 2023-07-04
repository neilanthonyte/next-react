import { IFormSchema } from "next-shared/src/types/formTypes";

export const issueFormSchema: IFormSchema = [
  {
    type: "boolean",
    label: "Did you complete the task?",
    map: "completed",
    required: true,
  },
  {
    type: "text",
    label: "What was the issue?",
    placeholder: "Ran out of cleaning supplies",
    allowNewlines: true,
    map: "taskProblem",
    required: true,
  },
  {
    type: "boolean",
    label: "Does this require further action?",
    map: "furtherActionRequired",
    required: true,
  },
  {
    type: "text",
    label: "What further action is required?",
    placeholder: "Purchase floor cleaner",
    allowNewlines: true,
    map: "actionRequired",
    conditional: {
      path: "../furtherActionRequired",
      match: true,
      type: "enable",
    },
  },
];

export interface IReportProblemForm {
  completed: boolean;
  taskProblem: string;
  furtherActionRequired: boolean;
  takePhoto: boolean;
  actionRequired?: string;
}
