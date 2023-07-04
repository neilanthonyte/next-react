import { useEffect, useState } from "react";
import { parse } from "query-string";

type TParsedHash = Record<string, (string | boolean | number | null)[]>;

const parseCurrentHash = () => {
  const params = parse(window.location.hash, {
    parseBooleans: true,
    parseNumbers: true,
    arrayFormat: "bracket",
  });
  // always return arrays, rather than only sometimes doing so
  const entries = Object.entries(params).map(([key, val]) => [
    key,
    val instanceof Array ? val : [val],
  ]);
  return Object.fromEntries(entries);
};

/**
 * Listens for changes to window.location.hash and parses its contents as if it were a query string.
 * eg. /some-url#empty&b=true&n=1&s=hello returns { empty: [null], b: [true], n: [1], s: ["hello"] }
 */
export const useParsedHash = (): TParsedHash => {
  const [parsedHash, setParsedHash] = useState<TParsedHash>(parseCurrentHash());

  useEffect(() => {
    const handleHashChanged = () => {
      setParsedHash(parseCurrentHash());
    };
    window.addEventListener("hashchange", handleHashChanged, false);
    handleHashChanged();

    return () => window.removeEventListener("hashchange", handleHashChanged);
  }, []);

  return parsedHash;
};
