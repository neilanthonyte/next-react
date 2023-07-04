// pass in seconds and will work out hours and mins

export const secondsToHoursAndMinutes = (seconds: number): string => {
  const averageHours = Math.floor(seconds / 3600);
  const averageMinutes = Math.floor((seconds % 3600) / 60);

  const averageHoursParsed =
    averageHours < 10 ? "0" + averageHours : averageHours;
  const averageMinutesParsed =
    averageMinutes < 10 ? "0" + averageMinutes : averageMinutes;

  return `${averageHoursParsed}h ${averageMinutesParsed}m`;
};
