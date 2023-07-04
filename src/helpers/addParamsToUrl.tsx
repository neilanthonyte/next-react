import { parseUrl, stringify } from "query-string";

import { urlParams } from "next-shared/src/types/url";

export const removeParamsFromUrl = (params: string[]) => {
  const url = parseUrl(window.location.href, { arrayFormat: "bracket" });
  const newParams = { ...url.query };

  for (const key of params) {
    delete newParams[key];
  }

  const paramStr = buildParamString(newParams);
  return `${url.url}?${paramStr}${window.location.hash}`;
};

export const addParamsToUrl = (
  params: urlParams,
  includeParams: boolean = true,
) => {
  const url = parseUrl(window.location.href, { arrayFormat: "bracket" });
  const newParams = includeParams ? { ...url.query, ...params } : { ...params };
  const paramStr = buildParamString(newParams);
  return `${url.url}?${paramStr}${window.location.hash}`;
};

export const addParamsToUrlString = (
  url: string,
  params: urlParams,
): string => {
  const paramStr = buildParamString(params);

  if (!url.includes("?")) {
    url = `${url}?`;
  }

  return `${url}${paramStr}`;
};

const buildParamString = (params: urlParams): string =>
  Object.keys(params)
    .map((k) =>
      Array.isArray(params[k])
        ? stringify({ [k]: params[k] }, { arrayFormat: "bracket" })
        : `${k}=${
            params[k] !== undefined
              ? encodeURIComponent(
                  params[k] as Extract<typeof params[string], urlParams>,
                )
              : ""
          }`,
    )
    .join("&");
