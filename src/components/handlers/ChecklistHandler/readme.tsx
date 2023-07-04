import * as React from "react";

import { ChecklistHandler } from "./index";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { Button } from "../../generic/Button";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

const ChecklistTasks = () => {
  const { checklistTasks } = useRequiredContext(ChecklistContext);
  return (
    <div>
      <h1>Checklist Tasks</h1>
      {Array.isArray(checklistTasks) ? (
        checklistTasks.map((checklistTask, i) => {
          return (
            <pre key={i}>{JSON.stringify(checklistTask, undefined, 2)}</pre>
          );
        })
      ) : (
        <pre>loading...</pre>
      )}
    </div>
  );
};

const ChecklistTasksWithActions = () => {
  const { checklistTasks, updateTask } = useRequiredContext(ChecklistContext);
  return (
    <div>
      <h1>Checklist Tasks</h1>
      <br />
      {Array.isArray(checklistTasks) ? (
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Title</td>
              <td>Type</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {checklistTasks.map((checklistTask, i) => {
              return (
                <tr key={i}>
                  <td>{checklistTask.id}</td>
                  <td>{checklistTask.title}</td>
                  <td>{checklistTask.type}</td>
                  <td>
                    <Button
                      onClick={() => {
                        updateTask(checklistTask);
                      }}
                    >
                      update
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <pre>loading...</pre>
      )}
    </div>
  );
};

const ChecklistDayPreview = () => {
  const { checklistDayPreview } = useRequiredContext(ChecklistContext);
  return (
    <div>
      <h1>Checklist Day Preview</h1>
      <pre>
        {checklistDayPreview
          ? JSON.stringify(checklistDayPreview, undefined, 2)
          : "loading..."}
      </pre>
    </div>
  );
};

const IsOpenToday = () => {
  const { isOpenToday } = useRequiredContext(ChecklistContext);
  return (
    <div>
      <h1>Is open today</h1>
      <pre>
        {isOpenToday === null ? "loading..." : JSON.stringify(isOpenToday)}
      </pre>
    </div>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <ChecklistHandler>
        <IsOpenToday />
        <ChecklistDayPreview />
        <ChecklistTasks />
      </ChecklistHandler>
    </NextAppHandlerWeb>
  );
};
