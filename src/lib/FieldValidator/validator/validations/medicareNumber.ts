/**
 * Source: https://stackoverflow.com/questions/3589345/how-do-i-validate-an-australian-medicare-number
 */
export default (value: any, options: any) => {
  if (!value) {
    return options.message;
  }

  const medicareNumber = value.replace(/ /g, "");

  // Must be 10 characters
  if (medicareNumber.length !== 11) {
    return options.message;
  }

  // Breakdown:
  // Identifier
  //   8-digits	First digit should be in the range 2-6
  // Checksum
  //   1-digit	Digits are weighted (1,3,7,9,1,3,7,9)
  // Issue Number
  //   1-digit	Indicates how many times the card has been issued
  // Individual Reference Number (IRN)
  //   1-digit	The IRN appears on the left of the cardholder's name on the medicare card and distinguishes the individuals named on the card.
  const matches = medicareNumber.match(/^(\d{8})(\d)(\d)([1-9])$/);

  if (!matches) {
    return options.message;
  }

  const base = matches[1];
  const checkDigit = matches[2];
  // const identifier = matches[3];
  const multipliers = [1, 3, 7, 9, 1, 3, 7, 9];

  // First number is between 2 and 6
  if (!base[0].match("[2-6]")) {
    return options.message;
  }

  let total = 0;
  // Adding numbers together equals checksum value
  for (let i = 0; i < multipliers.length; i++) {
    total += parseInt(base[i], 10) * multipliers[i];
  }
  if (total % 10 !== parseInt(checkDigit, 10)) {
    return options.message;
  }

  return null;
};
