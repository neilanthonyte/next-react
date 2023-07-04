import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { IChecklistCmsTaskCategory } from "next-shared/src/types/IChecklistCmsTaskCategory";

export const getChartData = (
  allDailyTasks: ChecklistTask[], // Needed to add data to chart %
): any => {
  // Unique Array of possible categories pulled from each task, used set to make unique
  const chartCategoriesArray = [
    ...new Set(allDailyTasks.map((task) => task.cmsTask.category)),
  ];

  // Creates a chart data object for each possible category
  const chartData = chartCategoriesArray.reduce(
    (accum: any, category: IChecklistCmsTaskCategory) => {
      accum[category.title] = {
        label: category.title,
        size: 0,
        completed: 0,
      };
      return accum;
    },
    {},
  );

  // for each task of that category either add to the size of the data group, or add size and completed
  const currentTime = currentUnixTimestamp();
  allDailyTasks.forEach((task) => {
    if (task.completed) {
      chartData[task.cmsTask.category.title].completed++;
      chartData[task.cmsTask.category.title].size++;
    } else if (!task.completed && currentTime > task.startDate) {
      chartData[task.cmsTask.category.title].size++;
    }
  });

  const formattedChartData = Object.values(chartData).map((data: any) => {
    return String(Math.floor((data.completed / data.size) * 100));
  });

  return {
    labels: chartCategoriesArray,
    data: formattedChartData,
  };
};
