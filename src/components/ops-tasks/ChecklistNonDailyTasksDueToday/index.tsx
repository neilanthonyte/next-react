import * as React from "react";
import moment from "moment";
import { useContext } from "react";
import { useMemo } from "react";

import { Block, BlockBody, BlockHeader } from "../../structure/Block";
import { CardBody, Card } from "../../structure/Card";

import { ChecklistContext } from "../../../contexts/ChecklistContext";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";

type TTasksByFrequencies = { [freq: string]: ChecklistTask[] };

export interface IChecklistNonDailyTasksDueTodayProps {}

export const ChecklistNonDailyTasksDueToday: React.FC<
  IChecklistNonDailyTasksDueTodayProps
> = () => {
  const { checklistTasks } = useContext(ChecklistContext);

  const tasksByFrequencies = useMemo(() => {
    if (checklistTasks === null) {
      return {};
    }

    const endOfDay = moment().endOf("day").unix();

    return checklistTasks
      .filter((checklistTask) => !checklistTask.doesMatchFrequency("daily"))
      .filter((checklistTask) => checklistTask.dueDate <= endOfDay)
      .reduce((tasksByFrequenciesAccum: TTasksByFrequencies, checklistTask) => {
        const freq =
          checklistTask.cmsTask.frequency.slug.charAt(0).toUpperCase() +
          checklistTask.cmsTask.frequency.slug.slice(1);

        if (tasksByFrequenciesAccum[freq] === undefined) {
          tasksByFrequenciesAccum[freq] = [];
        }

        tasksByFrequenciesAccum[freq].push(checklistTask);

        return tasksByFrequenciesAccum;
      }, {});
  }, [checklistTasks]);

  return (
    <>
      {Object.keys(tasksByFrequencies).map((freq) => {
        return (
          <Block key={freq} open={true}>
            <BlockHeader>
              <strong>{freq} due Today</strong>
            </BlockHeader>

            <BlockBody>
              <Card>
                <CardBody>
                  TODO
                  {/* <ChecklistList tasks={tasksByFrequencies[freq]} /> */}
                </CardBody>
              </Card>
            </BlockBody>
          </Block>
        );
      })}
    </>
  );
};
