import * as React from "react";

import { IMainViewRoute } from "../structure/MainView";
import { ChecklistDayView } from "./ChecklistDayView";
import { ChecklistReportView } from "./ChecklistReportView";
import { ChecklistSidebar } from "./ChecklistSidebar";
import { ChecklistSummaryView } from "./ChecklistSummaryView";
import { ChecklistViewDueToday, ChecklistViewUpcoming } from "./ChecklistView";

export const checklistPaths: { [key: string]: string } = {
  root: "/tasks",
  checklistDueToday: "/due-today",
  checklistUpcoming: "/upcoming",
  checklistSummary: "/summary",
  checklistDaySummary: "/:date",
  checklistReport: "/run-report",
};

export const generateChecklistDaySummary = (date: string): string =>
  `/tasks/summary/${date}`;

export const checklistRoutes: IMainViewRoute[] = [
  {
    icon: "nav-opsTasks",
    label: "Tasks",
    path: checklistPaths.root,
    menu: ChecklistSidebar,
    routes: [
      {
        path: checklistPaths.checklistDueToday,
        component: ChecklistViewDueToday,
      },
      {
        path: checklistPaths.checklistUpcoming,
        component: ChecklistViewUpcoming,
      },
      {
        path: checklistPaths.checklistSummary,
        component: () => <ChecklistSummaryView />,
        routes: [
          {
            path: checklistPaths.checklistDaySummary,
            component: () => <ChecklistDayView />,
          },
        ],
      },
      {
        path: checklistPaths.checklistReport,
        component: ChecklistReportView,
      },
    ],
  },
];
