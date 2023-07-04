import * as React from "react";

import { ChecklistTable } from ".";
import { mockChecklistDayPreviews } from "next-shared/src/mockData/mockChecklistSummaries";

export const DemoStandard = () => {
  return <ChecklistTable dayPreviews={mockChecklistDayPreviews} />;
};
