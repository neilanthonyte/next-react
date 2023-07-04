import { useMemo } from "react";
import { unixTimestamp } from "next-shared/src/types/dateTypes";
import moment from "moment";
import { useClient } from "../useClient";
import { useCachedSyncedData } from "../core/useCachedSyncedData";
import { Checklist } from "next-shared/src/models/Checklist";

export interface IUseSyncedTasksProps {
  startTimestamp?: unixTimestamp;
}

export interface IUseSyncedTasksResponse {
  checklist: Checklist;
  error: Error;
  isLoading: boolean;
}

/**
 * Get a list of operational tasks for a specific location
 * from the CMS through the web socket.
 *
 * @param options.startTimestamp - optionally pass in an unix timestamp for tasks starting on that day.
 * // TODO - hook testing.
 */
export const useSyncedTasks = (
  options?: IUseSyncedTasksProps,
): IUseSyncedTasksResponse => {
  const client = useClient();

  const startOfDay = useMemo(() => {
    if (!options?.startTimestamp) {
      return moment().startOf().unix();
    }
    return moment(options.startTimestamp).startOf().unix();
  }, [options?.startTimestamp, new Date().getDate()]);

  // memorise the metadata for cached synced data dependency
  const syncedTaskMetadata = useMemo(
    () => client.tasks.retrieveSyncedTasks(startOfDay),
    [startOfDay],
  );

  const { data: checklist, error } = useCachedSyncedData(syncedTaskMetadata);

  return {
    checklist,
    error,
    isLoading: checklist === undefined,
  };
};
