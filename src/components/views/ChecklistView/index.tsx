import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import * as _ from "lodash";

import { Page, PageBody, PageHeader } from "../../structure/Page";
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";
import { useTaskViewTypeFilter } from "../../../hooks/useTaskViewTypeFilter";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TTaskViewTypes } from "next-shared/src/types/TTaskViewTypes";
import { AnimatedList } from "../../atoms/AnimatedList";
import { Dropdown } from "../../generic/Dropdown";
import { ChecklistDailyProgress } from "../../ops-tasks/ChecklistDailyProgress";
import { OpsTask } from "../../ops-tasks/OpsTask";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { PlaceholderView } from "../PlaceholderView";
import { STATE_SELECTION_ALL } from "../../atoms/NextLocationPicker/constants";
import { useChecklistContext } from "../../handlers/ChecklistHandler";

const CATEGORY_ANY = "Any";

const FILTER_INCOMPLETE = "Incomplete";
const FILTER_COMPLETE = "Complete";
const FILTER_DAILY = "Daily";
const filters: string[] = ["All", FILTER_INCOMPLETE, FILTER_COMPLETE];

export interface IChecklistViewProps {
  type: TTaskViewTypes;
}

/**
 * Main view for Tasks, pass's sorted tasks down to the Tasks List along with the period selected
 */
export const ChecklistView: React.FC<IChecklistViewProps> = ({ type }) => {
  const { checklistTasks, filteredTasks, groupedTasks, setFilter } =
    useChecklistContext();
  const [statusFilter, setStatusFilter] = useState(FILTER_INCOMPLETE);
  const [categoryFilter, setCategoryFilter] = useState<string>(CATEGORY_ANY);

  const taskTypeFilter = useTaskViewTypeFilter(type);

  const viewFilter = useMemo(() => {
    const cloneFilters = [...filters];
    if (type === TTaskViewTypes.DueToday && !filters.includes(FILTER_DAILY)) {
      cloneFilters.splice(1, 0, FILTER_DAILY);
    }

    return cloneFilters;
  }, [type]);

  const categories: string[] = useMemo(() => {
    return [CATEGORY_ANY].concat(
      _.uniq(
        (checklistTasks || [])
          // base on all tasks on the current screen
          .filter(taskTypeFilter)
          .map((t) => (t.cmsTask.category ? t.cmsTask.category.title : null))
          .filter((n) => !!n),
      ),
    );
  }, [filteredTasks]);

  useEffect(() => {
    const filter = (task: ChecklistTask) => {
      if (task.completedAt && statusFilter === FILTER_INCOMPLETE) {
        return false;
      }
      if (!task.completedAt && statusFilter === FILTER_COMPLETE) {
        return false;
      }
      if (!task.isDailyTask() && statusFilter === FILTER_DAILY) {
        return false;
      }
      if (
        categoryFilter !== CATEGORY_ANY &&
        (!task.cmsTask.category ||
          task.cmsTask.category.title !== categoryFilter)
      ) {
        return false;
      }
      return taskTypeFilter(task);
    };
    // @ts-ignore
    setFilter(() => filter);
  }, [statusFilter, categoryFilter]);

  const isReady = Array.isArray(filteredTasks);

  return (
    <div data-test="checklistview" key={type}>
      <Page>
        <PageHeader>
          {!!categories && (
            <Dropdown
              options={categories}
              selectedOption={categoryFilter}
              staticLabel={`Category: ${categoryFilter}`}
              onOptionChange={setCategoryFilter}
              stdSize={EStandardSizes.Small}
              widthInChars={20}
              active={categoryFilter !== CATEGORY_ANY}
            />
          )}
          <div style={{ flexGrow: 1, padding: "0 20px" }}>
            {type === TTaskViewTypes.DueToday && <ChecklistDailyProgress />}
          </div>
          <Dropdown
            options={viewFilter}
            selectedOption={statusFilter}
            staticLabel={`Show: ${statusFilter}`}
            onOptionChange={setStatusFilter}
            stdSize={EStandardSizes.Small}
            widthInChars={20}
            active={statusFilter !== STATE_SELECTION_ALL}
          />
        </PageHeader>
        <PageBody>
          <LoadingBlock isLoading={!isReady}>
            {isReady && (
              <>
                {filteredTasks.length === 0 && (
                  <PlaceholderView
                    instruction={"No task are currently available"}
                  />
                )}
                {groupedTasks.map((grp) => {
                  const tasks = grp.tasks.map((t) => ({
                    id: `${t.id}-${t.title.replace(" ", "-")}`,
                    component: () => <OpsTask key={t.id} task={t} />,
                  }));

                  return (
                    <PageSection key={grp.label}>
                      <PageSectionHeader>
                        <PageSectionTitle>{grp.label}</PageSectionTitle>
                      </PageSectionHeader>
                      <PageSectionBody>
                        <AnimatedList tasks={tasks} />
                      </PageSectionBody>
                    </PageSection>
                  );
                })}
              </>
            )}
          </LoadingBlock>
        </PageBody>
      </Page>
    </div>
  );
};

/**
 * Displays a checklist of tasks that are due today.
 */
export const ChecklistViewDueToday = () => (
  <ChecklistView type={TTaskViewTypes.DueToday} />
);

/**
 * Displays a checklist of tasks that are upcoming.
 */
export const ChecklistViewUpcoming = () => (
  <ChecklistView type={TTaskViewTypes.Upcoming} />
);
