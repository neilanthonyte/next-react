import * as React from "react";
import moment from "moment";

import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../structure/Table";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { ImgBlock } from "../../generic/ImgBlock";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { CircularIcon } from "../../generic/CircularIcon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { Subtle } from "../../generic/Subtle";
import { Badge } from "../../generic/Badge";
import { CircularMetric } from "../../generic/CircularMetric";

export interface IChecklistTaskTableProps {
  checklistTasks: ChecklistTask[];
}

export const ChecklistTaskTable: React.FC<IChecklistTaskTableProps> = ({
  checklistTasks,
}) => {
  const showTaskTypeValue = (task: ChecklistTask) => {
    switch (task.type) {
      case "boolean":
        return checkbox(task);
      case "numeric":
      case "temperature":
        return task.value ? metric(task) : checkbox(task);
      case "image":
        return task.imageTmpUrl ? (
          <ImgBlock
            src={task.imageTmpUrl}
            size="xs"
            squareRatio
            data-test="thumbnail"
            zoomable={true}
            alt={task.title}
          />
        ) : (
          checkbox(task)
        );
    }
  };

  const metric = (task: ChecklistTask) => {
    const { value, validValue } = task;
    return (
      <CircularMetric
        size={EStandardSizes.Small}
        variant={validValue ? TColorVariants.Success : TColorVariants.Danger}
      >
        {value as number}
      </CircularMetric>
    );
  };

  const checkbox = (task: ChecklistTask) => {
    return (
      <CircularIcon
        size={EStandardSizes.Small}
        name={task.completed ? "tick" : "cancel"}
        variant={
          task.completed ? TColorVariants.Success : TColorVariants.Danger
        }
      />
    );
  };

  return (
    <LoadingBlock isLoading={checklistTasks === null}>
      <Table sizing="compact">
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell position={THorizontalPositions.Center}>
              Complete
            </TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(checklistTasks || []).map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                {task.title}
                <br />
                <Subtle>
                  Due{" "}
                  {moment
                    .unix(task.dueDate)
                    .format(task.isDailyTask() ? "LT" : "MMM Do")}{" "}
                  /{" "}
                  {task.completedAt
                    ? `Completed ${moment
                        .unix(task.completedAt)
                        .format(task.isDailyTask() ? "LT" : "MMM Do")}`
                    : "Incomplete"}
                </Subtle>
                {task.wasLate && (
                  <>
                    {" "}
                    <Badge size={"xs"} variant={TColorVariants.Danger}>
                      Late
                    </Badge>
                  </>
                )}
              </TableCell>
              <TableCell position={THorizontalPositions.Center}>
                {showTaskTypeValue(task)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </LoadingBlock>
  );
};
