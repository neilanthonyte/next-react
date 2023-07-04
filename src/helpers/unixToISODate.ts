import moment from "moment";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

export const unixToIsoDate = (unix: unixTimestamp) =>
  moment.unix(unix).format("YYYY-MM-DD");
