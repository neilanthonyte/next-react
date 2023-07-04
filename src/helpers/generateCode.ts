/**
 * This function will return a random string of numbers (between 0-9) within the given length.
 *
 * @link https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 *
 * @example
 * const randomCode = generateCode(8, "0123456789") // would return something like "23425707"
 * @example
 * const randomCode = generateCode(4, "abcd") // would return something like "aabd"
 *
 */
export const generateCode = (length: number, dictionary: string): string => {
  let code = "";

  for (let i = 0; i < length; i++) {
    code += dictionary.charAt(Math.floor(Math.random() * dictionary.length));
  }

  return code.toUpperCase();
};
