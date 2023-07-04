### Boolean Task

The state needs to be managed externally.

```jsx harmony
import { DemoBoolean } from "./readme";
<DemoBoolean />;
```

### Numeric task with BaseTask

```jsx harmony
import { DemoNumeric } from "./readme";
<DemoNumeric />;
```

<!-- ### Numeric task with ChecklistTask

Max and mins are enforced.

```jsx harmony
import { Task } from "./";

import { useState, useCallback } from "react";

import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";

const defaultTasks = [
  {
    id: 125,
    cmsTaskId: "6903",
    cmsTask: {
      id: "6903",
      title: "Numeric task (allowed: 0 - 10)",
      weight: 1,
      type: "numeric",
      relatedArticle: {
        slug: "e-closing",
        title: "E. Closing",
      },
      locationFeatures: [],
      timeOfDay: {
        dynamicFormatRegex: {},
        staticFormatRegex: {},
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
    title: "Numeric task (allowed: 0 - 10)",
    type: "numeric",
    completed: null,
    comment: null,
    frequency: "daily",
    imageKey: null,
    locationId: "678",
    date: "11-10-2019",
    weight: 1,
    dueDate: moment()
      .add(1, "day")
      .unix(),
    startDate: 1570665600,
    completedAt: null,
  },
  {
    id: 125,
    cmsTaskId: "6903",
    cmsTask: {
      id: "6903",
      title: "Numeric task - existing (allowed: 0 - 10)",
      weight: 1,
      type: "numeric",
      relatedArticle: {
        slug: "e-closing",
        title: "E. Closing",
      },
      locationFeatures: [],
      timeOfDay: {
        dynamicFormatRegex: {},
        staticFormatRegex: {},
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
    title: "Numeric task - existing (allowed: 0 - 10)",
    type: "numeric",
    value: "100.23",
    completed: false,
    comment: null,
    frequency: "daily",
    imageKey: null,
    locationId: "678",
    date: "11-10-2019",
    weight: 1,
    dueDate: moment()
      .add(1, "day")
      .unix(),
    startDate: 1570665600,
    completedAt: currentUnixTimestamp(),
  },
].map((t) => ChecklistTask.unserialize(t));

const [tasks, setTasks] = useState(defaultTasks);

const updateTask = useCallback(
  (index, value) => {
    const newTask = tasks[index].clone();
    newTask.setValue(value);

    const newTasks = [...tasks];
    newTasks[index] = newTask;

    setTasks(newTasks);
  },
  [tasks]
);

<div data-test="Task-scenario-numeric">
  {tasks.map((t, i) => (
    <div key={i} data-test={`task-${i + 1}`}>
      <Task key={i} task={t} onChange={(value) => updateTask(i, value)} />
    </div>
  ))}
</div>;
```

### Temperature Task

```jsx harmony
import { Task } from "./";

import { useState, useCallback } from "react";

import { BaseTask } from "next-shared/src/models/BaseTask";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";

import { MockZamApiClient } from "../../handlers/MockZamApiClient";
import { ZamLocation } from "next-shared/src/models/ZamLocation";

const location = ZamLocation.unserialize({
  region: "United States",
});

const defaultTasks = [
  {
    id: 1,
    cmsTaskId: "1",
    cmsTask: {
      id: "1",
      title: "Temperature task",
      weight: 1,
      type: "temperature",
      relatedArticle: {
        slug: "e-closing",
        title: "E. Closing",
      },
      locationFeatures: [],
      timeOfDay: {
        dynamicFormatRegex: {},
        staticFormatRegex: {},
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
    title: "Temperature task",
    type: "temperature",
    completed: null,
    comment: null,
    frequency: "daily",
    imageKey: null,
    locationId: "678",
    date: "11-10-2019",
    weight: 1,
    dueDate: moment()
      .add(1, "day")
      .unix(),
    startDate: 1570665600,
    completedAt: null,
  },
  {
    id: 2,
    cmsTaskId: "2",
    cmsTask: {
      id: "2",
      title: "Temperature task - existing",
      weight: 1,
      type: "temperature",
      relatedArticle: {
        slug: "e-closing",
        title: "E. Closing",
      },
      locationFeatures: [],
      timeOfDay: {
        dynamicFormatRegex: {},
        staticFormatRegex: {},
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
    title: "Temperature task - existing",
    type: "temperature",
    value: "100.23",
    completed: true,
    comment: null,
    frequency: "daily",
    imageKey: null,
    locationId: "678",
    date: "11-10-2019",
    weight: 1,
    dueDate: moment()
      .add(1, "day")
      .unix(),
    startDate: 1570665600,
    completedAt: currentUnixTimestamp(),
  },
].map((t) => BaseTask.unserialize(t));

const [tasks, setTasks] = useState(defaultTasks);

const updateTask = useCallback(
  (index, value) => {
    const newTask = tasks[index].clone();
    newTask.setValue(value);
    const newTasks = [...tasks];
    newTasks[index] = newTask;
    setTasks(newTasks);
  },
  [tasks]
);

<div data-test="Task-scenario-temperature">
  <MockZamApiClient location={location}>
    {tasks.map((t, i) => (
      <div key={i} data-test={`task-${i + 1}`}>
        <Task key={i} task={t} onChange={(value) => updateTask(i, value)} />
      </div>
    ))}
  </MockZamApiClient>
</div>;
```

### Photo Task

```jsx harmony
import { Task } from "./";

import { useState, useCallback } from "react";

import { BaseTask } from "next-shared/src/models/BaseTask";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";

const defaultTasks = [
  {
    id: 125,
    cmsTaskId: "6903",
    cmsTask: {
      id: "6903",
      title: "Photo task",
      weight: 1,
      type: "image",
      relatedArticle: {
        slug: "e-closing",
        title: "E. Closing",
      },
      locationFeatures: [],
      timeOfDay: {
        dynamicFormatRegex: {},
        staticFormatRegex: {},
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
    title: "Photo task",
    type: "image",
    value: null,
    imageTmpUrl: "http://lorempixel.com/640/480/cats",
    completed: null,
    comment: null,
    frequency: "daily",
    imageKey: null,
    locationId: "678",
    date: "11-10-2019",
    weight: 1,
    dueDate: moment()
      .add(1, "day")
      .unix(),
    startDate: 1570665600,
    completedAt: null,
  },
  {
    id: 125,
    cmsTaskId: "6903",
    cmsTask: {
      id: "6903",
      title: "Photo task - existing",
      weight: 1,
      type: "image",
      relatedArticle: {
        slug: "e-closing",
        title: "E. Closing",
      },
      locationFeatures: [],
      timeOfDay: {
        dynamicFormatRegex: {},
        staticFormatRegex: {},
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
    title: "Photo task - existing",
    type: "image",
    value: null,
    imageTmpUrl: "http://lorempixel.com/640/480/cats",
    completed: true,
    comment: null,
    frequency: "daily",
    imageKey: null,
    locationId: "678",
    date: "11-10-2019",
    weight: 1,
    dueDate: moment()
      .add(1, "day")
      .unix(),
    startDate: 1570665600,
    completedAt: currentUnixTimestamp(),
  },
].map((t) => BaseTask.unserialize(t));

const [tasks, setTasks] = useState(defaultTasks);

const updateTask = useCallback(
  (index, value) => {
    const newTask = tasks[index].clone();
    newTask.setValue(value);
    const newTasks = [...tasks];
    newTasks[index] = newTask;

    setTasks(newTasks);
  },
  [tasks]
);

<div data-test="Task-scenario-image">
  <MockCameraUploadHandler>
    {tasks.map((t, i) => (
      <div key={i} data-test={`task-${i + 1}`}>
        <Task task={t} onChange={(value) => updateTask(i, value)} />
      </div>
    ))}
  </MockCameraUploadHandler>
</div>;
```

### Child task types, e.g. EquipmentTask

```jsx harmony
import { useState } from "react";

import { EquipmentTask } from "next-shared/src/models/EquipmentTask";

import { MockZamApiClient } from "../../handlers/MockZamApiClient";
import { ZamLocation } from "next-shared/src/models/ZamLocation";

const location = ZamLocation.unserialize({
  region: "United States",
});

const defaultTask = EquipmentTask.unserialize({
  minValue: 80,
  maxValue: 100,
  title: "Equipment Task",
  completed: null,
  value: null,
  inventoryItemId: "FFBCCK00",
});

const [task, setTask] = useState(defaultTask);

const onChange = (value) => {
  const newTask = task.clone();
  newTask.setValue(value);
  setTask(newTask);
};

<div>
  <MockZamApiClient location={location}>
    <Task
      task={task}
      onChange={onChange}
      reportProblem={null}
      uploadImage={null}
      showInfo={null}
    />
  </MockZamApiClient>
</div>;
``` -->
