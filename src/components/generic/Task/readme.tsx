import * as React from "react";

import { Task } from ".";
import { useState, useCallback } from "react";
import { mockNumericTasks, mockBooleanTasks } from "./sample/tasks";

const actions = [
  {
    icon: "book",
    onClick: () => {
      alert("Show help article");
    },
  },
  {
    icon: "issue",
    onClick: () => {
      alert("Create an issue");
    },
  },
];

export interface IDemoBooleanProps {}

export const DemoBoolean: React.FC<IDemoBooleanProps> = ({}) => {
  const [tasks, setTasks] = useState(mockBooleanTasks);

  const updateTask = useCallback(
    (index, value) => {
      const newTask = tasks[index].clone();
      newTask.setValue(value);

      const newTasks = [...tasks];
      newTasks[index] = newTask;

      setTasks(newTasks);
    },
    [tasks],
  );

  return (
    <div data-test="Task-scenario-boolean">
      {tasks.map((t, i) => (
        <div key={i} data-test={`task-${i + 1}`}>
          <Task
            task={t}
            onChange={(value) => updateTask(i, value)}
            actions={actions}
          />
        </div>
      ))}
      <div data-test="task-disabled">
        <Task
          task={tasks[0]}
          onChange={null}
          disabled={true}
          actions={actions}
        />
      </div>
    </div>
  );
};

export interface IDemoNumericProps {}

export const DemoNumeric: React.FC<IDemoNumericProps> = ({}) => {
  const [tasks, setTasks] = useState(mockNumericTasks);

  const updateTask = useCallback(
    (index, value) => {
      const newTask = tasks[index].clone();
      newTask.setValue(value);

      const newTasks = [...tasks];
      newTasks[index] = newTask;

      setTasks(newTasks);
    },
    [tasks],
  );

  return (
    <div data-test="Task-scenario-numeric">
      {tasks.map((t, i) => (
        <div key={i} data-test={`task-${i + 1}`}>
          <Task key={i} task={t} onChange={(value) => updateTask(i, value)} />
        </div>
      ))}
    </div>
  );
};
