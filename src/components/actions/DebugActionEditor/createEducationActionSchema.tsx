import {
  EFormFieldLayoutType,
  IFormSchema,
} from "next-shared/src/types/formTypes";
import { EWeekday, CMonths } from "next-shared/src/types/IReoccurringTime";

export const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
export const dayOptions = EWeekday;
export const monthOptions = CMonths;

export type TDueType =
  | "single-now"
  | "single-dayOffset"
  | "single-date"
  | "weekly"
  | "monthly"
  | "yearly"
  | "interval";

export interface IActionFormData {
  type: string;
  medicationType: string;
  medicationId: string;
  medicationLabel: string;
  medicationDescription: string;
  formId: string;
  todo: string;
  // article
  medicalArticleId: string;
  // observation
  observationType: string;
  // appointment
  appointmentTypeId: string;
  appointmentHcpId: string;
  // instruction
  instruction: string;
  // due time
  dueType: TDueType;
  // one time - relative
  dayOffset: string;
  // one time - absolute
  date: string;
  // due time - interval
  intervalQuantity: string;
  intervalSize: string;
  intervalStartDate: string;
  // due time - reoccurring
  weeklyDays: string;
  yearlyMonths: number[];
  daysOfTheMonth: number[];
  times: string[];
  authorId: string;
}

export const trackableObservations = [
  {
    label: "Weight",
    icon: "obs-weight",
    value: "obs-weight",
  },
  {
    label: "Blood pressure",
    icon: "obs-blood-pressure",
    value: "obs-blood-pressure",
  },
  {
    label: "Steps",
    icon: "obs-steps",
    value: "obs-steps",
  },
  {
    label: "Height",
    icon: "obs-height",
    value: "obs-height",
  },
  {
    label: "Waist",
    icon: "obs-waist",
    value: "obs-waist",
  },
];

export const createEducationActionSchema: IFormSchema = [
  {
    type: "heading",
    label: "Type",
    description: "Please select the type of action you wish to create.",
  },
  {
    map: "type",
    type: "options",
    variant: "icons",
    defaultValue: "instruction",
    required: true,
    options: [
      {
        label: "Medication",
        value: "medication",
        icon: "medications",
      },
      {
        label: "Article",
        value: "article",
        icon: "education",
      },
      {
        label: "Document",
        value: "document",
        icon: "file",
      },
      {
        label: "Appointment",
        value: "appointment",
        icon: "calendar",
      },
      {
        label: "Instruction",
        value: "instruction",
        icon: "write",
      },
      {
        label: "Task",
        value: "todo",
        icon: "task-boolean",
      },
      {
        label: "Metric",
        value: "observation",
        icon: "obs-weight",
      },
      {
        label: "Form",
        value: "form",
        icon: "conditions",
      },
    ],
  },
  {
    type: "divider",
  },
  // MEDICATIONS
  {
    map: "medicationType",
    label: "Type",
    type: "options",
    options: ["Existing", "New"],
    variant: "inline",
    required: true,
    conditional: [
      {
        condition: "match",
        path: "../type",
        match: "medication",
      },
    ],
  },
  {
    map: "medicationId",
    label: "Medication",
    type: "options",
    options: [],
    required: true,
    conditional: [
      {
        condition: "match",
        path: "../medicationType",
        match: "Existing",
      },
    ],
  },
  {
    type: "group",
    layout: EFormFieldLayoutType.INLINE,
    conditional: [
      {
        condition: "match",
        path: "../medicationType",
        match: "New",
      },
    ],
    fields: [
      {
        map: "medicationLabel",
        label: "Name",
        type: "text",
        required: true,
      },
      {
        map: "medicationDescription",
        label: "Instruction",
        type: "text",
        placeholder: "Take twice daily",
        required: true,
      },
    ],
  },
  // FORM
  {
    map: "formId",
    label: "Form",
    description: "Select a form for the patient to fill in at home",
    type: "options",
    options: [],
    required: true,
    placeholder: "Please select a form",
    conditional: [
      {
        condition: "match",
        path: "../type",
        match: "form",
      },
    ],
  },
  // TASK
  {
    map: "todo",
    label: "Task",
    maxLength: 140,
    type: "text",
    placeholder: "Pick up some Vitamin-D from your chemist",
    conditional: [
      {
        condition: "match",
        path: "../type",
        match: "todo",
      },
    ],
  },
  // ARTICLES
  {
    map: "medicalArticleId",
    label: "Medical article",
    type: "options",
    options: [],
    required: true,
    placeholder: "Please select an article",
    conditional: [
      {
        condition: "match",
        path: "../type",
        match: "article",
      },
    ],
  },
  // OBSERVATION
  {
    map: "observationType",
    label: "Metric type",
    type: "options",
    variant: "icons",
    options: trackableObservations,
    required: true,
    conditional: [
      {
        condition: "match",
        path: "../type",
        match: "observation",
      },
    ],
  },
  // APPOINTMENTS
  {
    map: "appointmentTypeId",
    label: "Type",
    type: "options",
    options: [],
    conditional: [
      {
        condition: "match",
        path: "../type",
        match: "appointment",
      },
    ],
  },
  {
    map: "appointmentHcpId",
    label: "Provider",
    type: "options",
    options: [],
    conditional: [
      {
        condition: "match",
        path: "../type",
        match: "appointment",
      },
    ],
  },
  // INSTRUCTION
  {
    map: "instruction",
    label: "Instruction",
    type: "richContent",
    required: true,
    conditional: [
      {
        condition: "match",
        path: "../type",
        match: "instruction",
      },
    ],
  },
  {
    type: "heading",
    label: "Due time",
  },
  {
    map: "dueType",
    label: "Due type",
    type: "options",
    variant: "inline",
    defaultValue: "single-now",
    options: [
      {
        label: "Now",
        value: "single-now",
      },
      {
        label: "In X days",
        value: "single-dayOffset",
      },
      {
        label: "On date",
        value: "single-date",
      },
      {
        label: "Interval",
        value: "interval",
      },
      {
        label: "Weekly",
        value: "weekly",
      },
      {
        label: "Monthly",
        value: "monthly",
      },
      {
        label: "Yearly",
        value: "yearly",
      },
    ],
  },
  {
    map: "dayOffset",
    label: "Days due in",
    minValue: 1,
    type: "number",
    defaultValue: 1,
    conditional: [
      {
        condition: "match",
        path: "../dueType",
        match: "single-dayOffset",
      },
    ],
  },
  {
    map: "date",
    label: "Due on day",
    type: "date",
    dateFormat: "YYYY-MM-DD",
    minDate: "NOW()",
    conditional: [
      {
        condition: "match",
        path: "../dueType",
        match: "single-date",
      },
    ],
  },
  {
    type: "group",
    layout: EFormFieldLayoutType.INLINE,
    conditional: [
      {
        condition: "match",
        path: "../dueType",
        match: "interval",
      },
    ],
    fields: [
      {
        map: "intervalQuantity",
        label: "Quantity",
        type: "number",
        incrementValue: 1,
        defaultValue: 1,
      },
      {
        map: "intervalSize",
        label: "Interval",
        type: "options",
        variant: "inline",
        options: ["Days", "Weeks", "Months"],
      },
    ],
  },
  {
    map: "intervalStartDate",
    label: "Starting date",
    type: "date",
    dateFormat: "YYYY-MM-DD",
    conditional: [
      {
        condition: "match",
        path: "../dueType",
        match: "interval",
      },
    ],
  },
  {
    map: "weeklyDays",
    label: "Days of the week",
    type: "options",
    variant: "inline",
    allowMultiple: true,
    options: dayOptions,
    conditional: [
      {
        condition: "match",
        path: "../dueType",
        match: "weekly",
      },
    ],
  },
  {
    map: "yearlyMonths",
    label: "Months",
    type: "options",
    variant: "grid",
    allowMultiple: true,
    options: monthOptions,
    conditional: [
      {
        condition: "match",
        path: "../dueType",
        match: "yearly",
      },
    ],
  },
  {
    map: "daysOfTheMonth",
    label: "Day of the month",
    type: "options",
    variant: "dots",
    allowMultiple: true,
    options: daysOfMonth,
    conditional: [
      {
        condition: "matchAny",
        path: "../dueType",
        matchAny: ["monthly", "yearly"],
      },
    ],
  },
  {
    map: "times",
    label: "Times",
    type: "time",
    allowMultiple: true,
    conditional: [
      {
        condition: "matchAny",
        path: "../dueType",
        matchAny: ["weekly", "yearly"],
      },
    ],
  },
  {
    type: "heading",
    label: "Metadata",
  },
  {
    map: "authorId",
    label: "Author",
    type: "options",
    options: [], // to be replaced
  },
];
