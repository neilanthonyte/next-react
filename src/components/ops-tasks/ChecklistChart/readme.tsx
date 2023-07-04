import * as React from "react";

import { ChecklistChart } from ".";
import { mockChecklistDayPreviews } from "next-shared/src/mockData/mockChecklistSummaries";

export const DemoStandard = () => {
  return (
    <ChecklistChart
      dayPreviewClicked={() => {}}
      dayPreviews={mockChecklistDayPreviews}
    />
  );
};
