const special_chars = "";
const numbers = "0-9";
const alpha = "A-Za-z";
const space = " ";
const dvaFirstChar = "[NnVvQqWwSsTt]";
const dvaSecondChar = "[" + space + alpha + special_chars + "]";
const dvaThirdAndFourthChars = "[" + alpha + numbers + special_chars + "]{2}";
const dvaFifthToEighthChars = "[" + numbers + special_chars + "]{4}";
const dvaNinthChar = "[" + alpha + "]?";
const dvaRegexString =
  "^" +
  dvaFirstChar +
  dvaSecondChar +
  dvaThirdAndFourthChars +
  dvaFifthToEighthChars +
  dvaNinthChar +
  "$";
const dvaRegex = new RegExp(dvaRegexString);

/**
 * Taken from Helix to ensure consistency with their services.
 *
 * Further information can be found at:
 * http://meteor.aihw.gov.au/content/index.phtml/itemId/339127
 *
 * @param value
 * @param options
 * @returns {any}
 */

export default (value: any, options: any) => {
  if (!value) {
    return options.message;
  }
  if (!dvaRegex.test(value)) {
    return options.message;
  }

  return null;
};
