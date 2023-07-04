import { useClient } from "./useClient";

export function useActiveLocationTimezone(): string {
  const client = useClient();

  if (!!client.auth.activeLocation?.timezone) {
    throw new Error(
      `${client.auth.activeLocation.title} has no timezone set unable to set timestamp to timezone date`,
    );
  }

  return client.auth.activeLocation.timezone.timeZoneId;
}
