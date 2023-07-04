import * as React from "react";

import { AnimatedList, ITaskListItem } from ".";
import { Task } from "../../generic/Task";
import {
  mockNumericTasks,
  mockBooleanTasks,
} from "../../generic/Task/sample/tasks";
import { BaseTask } from "next-shared/src/models/BaseTask";
import { useState } from "react";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";

export const DemoStandard = () => {
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  const [tasks, setTasks] = useState<BaseTask[]>(
    [].concat(mockNumericTasks, mockBooleanTasks),
  );
  const genTask = () => {
    const newTask = cloneModelObject(mockBooleanTasks[0]);
    setTasks([].concat(tasks, [newTask]));
  };
  const removeTask = () => {
    const newTasks = [...tasks];
    newTasks.pop();
    setTasks(newTasks);
  };
  const toggleCompleted = () => setShowCompleted(!showCompleted);

  const updateTask = (task: BaseTask, value: any) => {
    const updatedTasks = tasks.map((t) => {
      if (t === task) {
        task.setValue(value);
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((t) =>
    showCompleted ? true : t.completed === null,
  );

  const preparedTasks: ITaskListItem[] = filteredTasks.map((t: BaseTask) => ({
    id: t.title,
    component: () => (
      <Task task={t} onChange={(value) => updateTask(t, value)} />
    ),
  }));

  return (
    <div data-test="TaskList-scenario-standard">
      <AnimatedList tasks={preparedTasks} />
      <div className="debug">
        <p>
          <a onClick={toggleCompleted}>Toggle completed</a>
          {" | "}
          <a onClick={genTask} data-test="add">
            Add
          </a>
          {" | "}
          <a onClick={removeTask} data-test="remove">
            Remove
          </a>
        </p>
      </div>
    </div>
  );
};
