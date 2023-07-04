import moment from "moment";

export const ISODateToLocale = (date: string) =>
  moment(date, "YYYY-MM-DD").format("MMM Do, YYYY");
