import { useEffect } from "react";
import { useQuery } from "react-query";

import { useClient } from "../hooks/useClient";
import { ISODate } from "next-shared/src/types/dateTypes";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";

export interface ITasksBetweenDatesForFrequency {
  refetch: () => Promise<ChecklistTask[]>;
  isLoading: boolean;
  error: Error | null;
  data: ChecklistTask[];
}

export const useTasksBetweenDatesForFrequency = (
  frequency: string,
  startDate: ISODate,
  endDate: ISODate,
): ITasksBetweenDatesForFrequency => {
  const client = useClient();

  // const { resolveError } = useRequiredContext(ErrorResolverContext);

  const { refetch, data, isLoading, error } = useQuery<ChecklistTask[], Error>(
    `tasks-${frequency}-${startDate}-${endDate}`,
    () => {
      if (!frequency || !startDate || !endDate) {
        return;
      }
      return client.tasks.retrieveTasksBetweenDatesForFrequency(
        frequency.toLowerCase(),
        startDate,
        endDate,
      );
    },
  );

  useEffect(() => {
    refetch();
  }, [client, frequency, endDate]);

  return { refetch, isLoading, error, data };
};
