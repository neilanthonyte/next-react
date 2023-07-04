import moment from "moment";

/**
 * Ensures a string is a valid date format. Includes support
 * for some magic values, e.g. NOW()
 *
 * @param dateStr
 * @param dateFormat
 */
export const parseDate = (dateStr: string, dateFormat: string) => {
  // check if it matches one of our magic functions
  if (!dateFormat) {
    throw new Error("No dateFormat provided");
  }

  if (
    dateStr.match(
      /^NOW\(\)(\.offset\( *[-+]?\d+ *, *'(years|months|days|weeks)' *\))*$/,
    )
  ) {
    // normalise the string: strip whitespace
    dateStr = dateStr.replace(/[ +]/g, "");

    const date = moment();
    (dateStr.match(/\.offset\(-?\d+,'(years|months|days|weeks)'\)/g) || []).map(
      (offsetStr) => {
        const parts = offsetStr.match(
          /\.offset\((-?\d+),'(years|months|days|weeks)'\)/,
        );
        const offsetAmount: any = parseInt(parts[1], 10);
        const unitType = parts[2];
        date.add(offsetAmount, unitType);
      },
    );

    return date.format(dateFormat);
  } else if (
    dateStr.match(/^\d{4}-([01][0-2]|[0][0-9]|[0-9])-(3[01]|[012][0-9]|[0-9])$/)
  ) {
    return dateStr;
  } else if (dateStr.match(/^\d{4}-([01][0-2]|[0][0-9]|[0-9])$/)) {
    return dateStr;
  } else {
    throw new Error("Unrecognised format");
  }
};
