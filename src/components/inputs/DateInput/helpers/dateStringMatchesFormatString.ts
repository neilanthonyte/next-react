import moment from "moment";

/**
 * Checks a date matches a specified format.
 */
export const dateStringMatchesFormatString = (
  dateString: string,
  formatString: string,
) => {
  return moment(dateString, formatString, true).isValid();
};
