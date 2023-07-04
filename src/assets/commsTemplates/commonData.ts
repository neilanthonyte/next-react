import moment from "moment-timezone";

export const commonCommsData = (timezoneId: string) => ({
  todaysDate: moment().tz(timezoneId).format("Do MMMM YYYY"),
});
