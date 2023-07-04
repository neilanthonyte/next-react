import * as _ from "lodash";

if (!env) {
  throw new Error("Need an env object");
}

/**
 * Substitute environment variables into a string. Allows the remote styleForm definition to use the app settings.
 */
export const substituteEnvVars = (urlStr: string) => {
  _.each(env, (v, k) => {
    urlStr = urlStr.replace(`{${k}}`, v);
  });
  if (urlStr.match(/[{}]/)) {
    throw new Error(`Unrecognised environment variable in URL (${urlStr})`);
  }
  return urlStr;
};
