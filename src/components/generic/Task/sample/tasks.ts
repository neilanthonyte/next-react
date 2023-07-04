import moment from "moment";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { ISerializedBaseTask, BaseTask } from "next-shared/src/models/BaseTask";

export const mockBooleanTasksSerialized: ISerializedBaseTask[] = [
  {
    id: 125,
    title:
      "Boolean Task: Quis occaecat sint consectetur ipsum sit aliqua incididunt aute quis in ea ullamco ullamco. Aute consectetur ullamco magna nostrud consequat voluptate ea nisi veniam nisi ex nostrud exercitation duis. Nostrud enim nulla anim elit irure.",
    type: "boolean",
    completed: null,
    imageKey: null,
    dueDate: moment().add(1, "day").unix(),
    completedAt: null,
    value: null,
    wasLate: false,
  },
  {
    id: 125,
    title: "Boolean task - overdue",
    type: "boolean",
    completed: null,
    imageKey: null,
    dueDate: moment().subtract(1, "day").unix(),
    completedAt: null,
    value: null,
    wasLate: false,
  },
  {
    id: 125,
    title: "Boolean Task - successful",
    type: "boolean",
    completed: true,
    imageKey: null,
    dueDate: moment().add(1, "day").unix(),
    completedAt: currentUnixTimestamp(),
    value: null,
    wasLate: false,
  },
  {
    id: 125,
    title: "Boolean Task - successful, but late",
    type: "boolean",
    completed: true,
    imageKey: null,
    dueDate: moment().subtract(1, "day").unix(),
    completedAt: currentUnixTimestamp(),
    value: null,
    wasLate: false,
  },
  {
    id: 125,
    title: "Boolean Task - unsuccessful",
    type: "boolean",
    completed: false,
    imageKey: null,
    dueDate: moment().add(1, "day").unix(),
    completedAt: currentUnixTimestamp(),
    value: null,
    wasLate: false,
  },
  {
    id: 125,
    title: "Boolean Task - unsuccessful and late",
    type: "boolean",
    completed: false,
    imageKey: null,
    dueDate: moment().subtract(1, "day").unix(),
    completedAt: currentUnixTimestamp(),
    value: null,
    wasLate: false,
  },
];

export const mockBooleanTasks: BaseTask[] = mockBooleanTasksSerialized.map(
  (t, i) => {
    t.id = i;
    return BaseTask.unserialize(t);
  },
);

export const mockNumericTasksSerialized: ISerializedBaseTask[] = [
  {
    id: 125,
    title: "Numeric task",
    type: "numeric",
    completed: null,
    imageKey: null,
    dueDate: moment().add(1, "day").unix(),
    completedAt: null,
    value: null,
    wasLate: false,
  },
  {
    id: 125,
    title: "Numeric task - existing",
    type: "numeric",
    value: "100.23",
    completed: true,
    imageKey: null,
    dueDate: moment().add(1, "day").unix(),
    completedAt: currentUnixTimestamp(),
    wasLate: false,
  },
];

export const mockNumericTasks: BaseTask[] = mockNumericTasksSerialized.map(
  (t) => BaseTask.unserialize(t),
);
