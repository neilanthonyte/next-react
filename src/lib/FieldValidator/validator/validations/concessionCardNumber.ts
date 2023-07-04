const separators = /[ \-,/.]/g;
const validationRegex = /^[a-zA-Z0-9 \-,/.]*$/;
const trimmedValidationRegex = /^[0-9]{9}[a-zA-Z]{1,2}$/;

/**
 * This validates the Customer Reference Number (CRN) used as the concession card number recognised government validated format.
 * As used on Health Care Card, Pension Card, Seniors Card
 *
 * Taken from Helix to ensure consistency with their services.
 *
 * The card uses a styleForm of checksum to ensure the integrity of the numbers.
 *
 * @param value
 * @param options
 * @returns {any}
 */
export default (value: any, options: any) => {
  if (!value) return options.message;
  if (value.length > 13) return options.message;
  if (!validationRegex.test(value)) return options.message;
  const e = value.replace(separators, "");
  if (e.length > 11) return options.message;
  if (!trimmedValidationRegex.test(e)) return options.message;
  let t = 0;
  for (let a = 0; a < 9; a++) {
    t += Math.pow(2, 10 - a - 1) * Number(e.charAt(a));
  }
  const n = Number(e.charAt(0));
  if (n < 2 || n > 7) return options.message;
  let i = -1;
  switch (e.charAt(9).toUpperCase()) {
    case "A":
      i = 10;
      break;
    case "B":
      i = 9;
      break;
    case "C":
      i = 8;
      break;
    case "H":
      i = 7;
      break;
    case "J":
      i = 6;
      break;
    case "K":
      i = 5;
      break;
    case "L":
      i = 4;
      break;
    case "S":
      i = 3;
      break;
    case "T":
      i = 2;
      break;
    case "V":
      i = 1;
      break;
    case "X":
      i = 0;
      break;
    default:
      return options.message;
  }

  const s = t % 11;
  return s === i ? null : options.message;
};
