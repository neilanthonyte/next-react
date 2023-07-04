/**
 * Convert the current patient URL into a readable label. Examples:
 * forms/onboard => "Forms > Onboard"
 */
export const scopeUrlToSummary = (url: string): string => {
  if (!url) {
    return "--";
  }
  return url
    .split(/\/+/g)
    .filter((s) => !!s)
    .map((s) => s.replace(/^./, s[0].toUpperCase()))
    .join(" > ");
};
