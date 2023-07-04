```jsx harmony
import { ChecklistTaskIssueModal } from "./";

import { useState } from "react";

import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";

const defaultTask = {
  id: 125,
  cmsTaskId: "6903",
  cmsTask: {
    id: "6903",
    title: "Perform EOD Admin",
    weight: 1,
    type: "numeric",
    relatedArticle: {
      slug: "opening",
      title: "Opening",
      anchor: "display-setup",
    },
    locationFeatures: [],
    timeOfDay: {
      title: "Opening - Start of Shift",
      slug: "opening-start-of-shift",
      startTime: "OPENING + 0",
      endTime: "OPENING + 60",
    },
    frequency: "daily",
    category: "Equipment",
    minValue: 0,
    maxValue: 10,
  },
  title: "Perform EOD Admin",
  type: "numeric",
  completed: true,
  value: "7",
  comment: null,
  frequency: "daily",
  imageKey: null,
  locationId: "678",
  date: "11-10-2019",
  weight: 1,
  dueDate: 1570669200,
  startDate: 1570665600,
  wasLate: true,
  completedAt: 1570775085,
  updatedAt: 1570775085,
  createdAt: 1570775085,
};

const [task, setTask] = useState(null);
const [issue, setIssue] = useState(null);
const [action, setAction] = useState(null);

const onSuccess = (issue, action) => {
  setIssue(issue);
  setAction(action);
  setTask(null);
};

<div data-test="ChecklistTaskIssueModal-scenario-standard">
  <MockSpgApiClient>
    <OpsActionsHandler>
      <ChecklistTaskIssueModal
        task={task}
        onSuccess={onSuccess}
        onExit={() => setTask(null)}
        prefill={{
          completed: true,
          taskProblem: faker.lorem.words(5),
          furtherActionRequired: true,
          actionRequired: faker.lorem.words(5),
        }}
      />
    </OpsActionsHandler>
  </MockSpgApiClient>
  <p>
    <a data-test="open-modal" onClick={() => setTask(defaultTask)}>
      Show
    </a>
  </p>
  Issue: <pre data-test="issue">{JSON.stringify(issue, null, 2)}</pre>
  Action: <pre data-test="action">{JSON.stringify(action, null, 2)}</pre>
</div>;
```
