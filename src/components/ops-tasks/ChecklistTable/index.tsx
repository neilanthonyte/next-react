import * as React from "react";
import * as _ from "lodash";

import { ChecklistDayPreview } from "next-shared/src/models/ChecklistDayPreview";
import { checklistGradeToColor } from "next-shared/src/helpers/checklistGradeToColor";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { Button } from "../../generic/Button";
import { ISODateToLocale } from "../../../helpers/ISODateToLocale";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../../structure/Table";
import { Badge } from "../../generic/Badge";
import { generateChecklistDaySummary } from "../../views/opsTasksRoutes";

export interface IChecklistDayPreviewProps {
  dayPreviews: ChecklistDayPreview[];
}

export const ChecklistTable: React.FC<IChecklistDayPreviewProps> = ({
  dayPreviews,
}) => {
  return (
    <Table sizing="compact" preset="standard">
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Date</TableHeaderCell>
          <TableHeaderCell>Completed</TableHeaderCell>
          <TableHeaderCell>Score</TableHeaderCell>
          <TableHeaderCell>Grade</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dayPreviews.map((dayPreview: ChecklistDayPreview) => {
          return (
            <TableRow key={dayPreview.id}>
              <TableCell>{ISODateToLocale(dayPreview.date)}</TableCell>
              <TableCell>
                {dayPreview.completedTasks}/{dayPreview.totalTasks}
              </TableCell>
              <TableCell>{Math.round(dayPreview.getScore * 100)}%</TableCell>
              <TableCell>
                <Badge variant={checklistGradeToColor(dayPreview.getGrade)}>
                  {dayPreview.getGrade}
                </Badge>
              </TableCell>
              <TableCell position={THorizontalPositions.Right}>
                <Button
                  size={EStandardSizes.ExtraSmall}
                  to={generateChecklistDaySummary(dayPreview.date)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
