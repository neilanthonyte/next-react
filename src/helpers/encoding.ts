const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Encodes a given string in UTF-8 encoding.
 * @param {string} s
 * @returns {string}
 */
const encodeUTF8 = (s: string): string => unescape(encodeURIComponent(s));

/**
 * Decodes a given UTF-8 string into its UTF-16 equivalent (native JS string)
 * @param {string} s
 * @returns {string}
 */
const decodeUTF8 = (s: string): string => decodeURIComponent(escape(s));

/**
 * Encodes a given value into a Uint8Array of bytes of its .toString() representation.
 * @param {any} value
 * @returns {Uint8Array}
 */
export const encode = (value: any): Uint8Array =>
  encoder.encode(encodeUTF8(value.toString()));

/**
 * decodes a given Uint8array of bytes into its string value.
 * @param {Uint8Array} value
 * @returns {string}
 */
export const decode = (value: Uint8Array): string =>
  decodeUTF8(decoder.decode(value));
