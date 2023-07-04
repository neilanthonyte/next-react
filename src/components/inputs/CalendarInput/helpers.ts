/**
 * These were intended for an editable text input strategy,
 * where the user can enter/edit the date in a text input if preferred
 * ultimately the formatting of the date handling with all the edge case scenarios (pick a valid date, key back to day or month and try and edit)
 * plus integration with forms (and custom validation) made it almost impossible to achieve a usable and workable enough solution.
 * Leaving these here if someone will give it another try
 */

/**
 * Helper function formatting date by adding "/"" after day and month
 * It automatically converts the day to "0X" if X > 3 e.g. if user types 4 as first digit for a day, as there are max 31 days in a month
 * It automatically converts the month to "0X" if X > 1 e.g. if user types 2 as first digit for a month, as there are max 12 months in a year
 * HACK for this to work by removing the last digit before the "/" when hitting delete, the backslash needs to be wrapped by empty spaces, e.g. "12 / 03 / 2022"
 * HACK this also means we need the TextInput not to trim any value on blur, hence the trimOnBlur prop
 */
export const formatDate = (date: string): string => {
  let formattedDate = date;

  // check if any trailing " /" e.g. we hit delete on the "/"
  if (/\D\/$/.test(formattedDate)) {
    formattedDate = formattedDate.substring(0, formattedDate.length - 3);
  }

  // split and remove any non digit characters
  const values = formattedDate.split("/").map((v) => v.replace(/\D/g, ""));

  // check day
  if (values[0]) {
    values[0] = checkValue(values[0], 31);
  }
  // check month
  if (values[1]) {
    values[1] = checkValue(values[1], 12);
  }

  const output = values.map((v, i) => {
    return v.length == 2 && i < 2 ? v + " / " : v;
  });

  const result = output.join("").substring(0, 14);
  return result;
};

/**
 * Helper function to reformat day and month if invalid or higher than hte given max
 */
const checkValue = (str: string, max: number): string => {
  if (str.charAt(0) !== "0" || str == "00") {
    let num = parseInt(str);
    if (isNaN(num) || num <= 0 || num > max) {
      num = parseInt(str[0]);
    }
    const isSingleDigitHigherThanMax =
      num > parseInt(max.toString().charAt(0)) && num.toString().length === 1;

    str = isSingleDigitHigherThanMax ? "0" + num : num.toString();
  }
  return str;
};
