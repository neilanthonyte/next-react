import moment from "moment";
import { shortHumanDateFormat } from "./momentFormats";

export const humaneDate = (unixDate: number) =>
  moment.unix(unixDate).format(shortHumanDateFormat);
