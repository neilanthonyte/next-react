import * as _ from "lodash";
import moment from "moment";

import { padNumber } from "./padNumber";
import { getApplicableDateSegments } from "./getApplicableDateSegments";
import { dateStringMatchesFormatString } from "./dateStringMatchesFormatString";

export const dateStringToObject = (
  dateString: string,
  formatString: string,
) => {
  const haveValue = _.isString(dateString) && dateString.length;

  const isValid =
    haveValue && dateStringMatchesFormatString(dateString, formatString);

  if (!isValid) {
    return {
      year: "",
      month: "",
      day: "",
    };
  }

  // determine which parts of the date we need
  const dateSegments = getApplicableDateSegments(formatString);
  const momentDate = moment(dateString, formatString, true);

  return {
    year: dateSegments.year ? momentDate.year().toString() : "",
    month: dateSegments.month ? padNumber(momentDate.month() + 1) : "",
    day: dateSegments.day ? padNumber(momentDate.date()) : "",
  };
};
