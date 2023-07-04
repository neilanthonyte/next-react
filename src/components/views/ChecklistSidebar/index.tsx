import * as React from "react";
import { useContext, useMemo } from "react";

import {
  SideBar,
  SideBarBody,
  SideBarHeader,
  SideBarTitle,
} from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle,
} from "../../structure/SideBarSection";
import {
  TableOfContents,
  TableOfContentsItem,
} from "../../structure/TableOfContents";
import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { checklistPaths } from "../../views/opsTasksRoutes";
import { useTaskViewTypeFilter } from "../../../hooks/useTaskViewTypeFilter";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { TTaskViewTypes } from "next-shared/src/types/TTaskViewTypes";

export interface IChecklistSidebarProps {}

export const ChecklistSidebar: React.FC<IChecklistSidebarProps> = ({}) => {
  const { checklistTasks } = useContext(ChecklistContext);

  const dueTodayFilter = useTaskViewTypeFilter(TTaskViewTypes.DueToday);
  const upcomingFilter = useTaskViewTypeFilter(TTaskViewTypes.Upcoming);

  const dueTodayRemaining = (checklistTasks || []).filter(
    (task: ChecklistTask) => dueTodayFilter(task) && task.completedAt === null,
  );

  const upcomingRemaining = (checklistTasks || []).filter(
    (task: ChecklistTask) => upcomingFilter(task) && task.completedAt === null,
  );

  return (
    <div data-test="checklistsidebar">
      <SideBar>
        <SideBarHeader>
          <SideBarTitle>Compliance</SideBarTitle>
        </SideBarHeader>
        <SideBarBody>
          <SideBarSection>
            <SideBarSectionHeader>
              <SideBarSectionTitle>Tasks</SideBarSectionTitle>
            </SideBarSectionHeader>
            <SideBarSectionBody>
              <TableOfContents>
                <TableOfContentsItem
                  href={`${checklistPaths.root}${checklistPaths.checklistDueToday}`}
                  badge={dueTodayRemaining.length.toString()}
                >
                  Due Today
                </TableOfContentsItem>
                <TableOfContentsItem
                  href={`${checklistPaths.root}${checklistPaths.checklistUpcoming}`}
                  badge={upcomingRemaining.length.toString()}
                >
                  Upcoming
                </TableOfContentsItem>
              </TableOfContents>
            </SideBarSectionBody>
          </SideBarSection>
          <SideBarSection>
            <SideBarSectionHeader>
              <SideBarSectionTitle>Reporting</SideBarSectionTitle>
            </SideBarSectionHeader>
            <SideBarSectionBody>
              <TableOfContents>
                <TableOfContentsItem
                  href={`${checklistPaths.root}${checklistPaths.checklistSummary}`}
                >
                  Historic
                </TableOfContentsItem>
                <TableOfContentsItem
                  href={`${checklistPaths.root}${checklistPaths.checklistReport}`}
                >
                  Run a report
                </TableOfContentsItem>
              </TableOfContents>
            </SideBarSectionBody>
          </SideBarSection>
        </SideBarBody>
      </SideBar>
    </div>
  );
};
