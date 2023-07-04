import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { ChecklistDayPreview } from "next-shared/src/models/ChecklistDayPreview";
import {
  LineChart,
  ILineOption,
  ILineChartPoint,
} from "../../charts/LineChart";
import { checklistScoreToGrade } from "next-shared/src/helpers/checklistScoreToGrade";
import { checklistGradeToColor } from "next-shared/src/helpers/checklistGradeToColor";

export interface IChecklistChartProps {
  dayPreviews: ChecklistDayPreview[];
  dayPreviewClicked?: (checklistDayPreview: ChecklistDayPreview) => void;
}

export const ChecklistChart: React.FC<IChecklistChartProps> = ({
  dayPreviews,
  dayPreviewClicked,
}) => {
  if (!dayPreviews || dayPreviews.length === 0) {
    return null;
  }

  const chartOptions: ILineOption[] = [
    {
      label: "Daily completion",
      lineStyle: "hard",
      dotText: (score) => checklistScoreToGrade(score),
    },
  ];

  const chartData: ILineChartPoint[] = useMemo(() => {
    if (!Array.isArray(dayPreviews)) {
      return [];
    }
    return dayPreviews.map((preview: ChecklistDayPreview) => {
      const date = new Date(preview.createdAt * 1000);
      return [date, preview.getScore, checklistGradeToColor(preview.getGrade)];
    });
  }, [dayPreviews]);

  return (
    <LineChart line={chartData} lineOptions={chartOptions} legend={null} />
  );
};
