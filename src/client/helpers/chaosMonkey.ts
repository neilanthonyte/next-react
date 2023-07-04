import { getInstanceMethodNames } from "../../helpers/getInstanceMethodNames";
import { NextClient } from "../NextClient";

/**
 * Given a client and probability (optional, defaults to 0.5), replace the methods on the
 * client that perform network requests with one that will error at the
 * given probability.
 *
 * Using a real client will cause network requests to fail, whereas using a
 * mock client will cause any client calls to fail (as the mock client doesn't
 * make network requests.)
 *
 * TODO Support websockets.
 */
export const chaosMonkey = (
  /** The client to use. */
  client: NextClient,
  /** A number between 0 & 1 that determines that chance of any network request failing. */
  probability: number = 0,
  /** The minimum times the request should error */
  errorCount: number = 1,
  /** Function names */
  functionNames?: string[],
  usingRealClient?: boolean,
) => {
  // let the user know the chaos monkey is on.
  console.warn("🙈🙉🙊 the chaos monkey has been summoned...");

  // for each module on the client...
  Object.entries(client).forEach(([moduleName, module]) => {
    // we don't want to affect these modules.
    // firstly, we aren't concerned with websockets currently.
    // secondly, instead of affecting httpConnection, we will affect methods
    // that use httpConnection.
    // we do this because some modules may use axios/fetch/etc directly instead
    // of this.httpConnection.makeRequest(...) or similar. So affecting those
    // modules is the best approach.
    if (
      ["httpConnection", "webSocketConnection", "sync", "auth"].includes(
        moduleName,
      )
    ) {
      return;
    }

    // get the names of the methods of the given module.
    // this helper method gets the method names of an object, following the
    // prototype chain until the second parameter (in this case
    // Object.prototype) is reached.
    const methodNames = getInstanceMethodNames(module, Object.prototype);

    // for each property in the module...
    methodNames
      // get a reference to the property itself
      .map((name) => [name, (module as any)[name]])
      .forEach(([modulePropertyName, moduleProperty]) => {
        // if limited to specific functions, then skip those not listeds
        if (
          functionNames &&
          !functionNames.includes(`${moduleName}.${modulePropertyName}`)
        ) {
          return;
        }

        let remainingErrors = errorCount;

        // only interested in functions
        if (typeof moduleProperty !== "function") {
          return;
        }

        // get the text of the method.
        const fnText: string = moduleProperty.toString();

        // we don't want to affect methods that use websockets (yet).
        const functionUsesWebsockets = fnText.toLowerCase().includes("synced");
        if (functionUsesWebsockets) {
          return;
        }

        // only check if method performs a network request if using real client.
        if (usingRealClient) {
          // this is a rough heuristic.
          // a method probably performs a network request if it contains one of
          // these strings in its function text.
          const functionPerformsNetworkRequest =
            fnText.includes("fetch") ||
            fnText.includes("axios") ||
            fnText.includes("httpConnection");

          // only interested in functions that perform network requests.
          if (!functionPerformsNetworkRequest) {
            return;
          }
        }

        // as we are using strings to referrence function names, TypeScript is
        // unable to help out
        const anyClient = client as any;

        // replace the function with one that will randomly switch between
        // throwing an error or working as usual.
        anyClient[moduleName][modulePropertyName] = (...args: any[]) => {
          if (remainingErrors > 0 || Math.random() < probability) {
            console.warn(
              `🙉 chaos! called: ${moduleName}.${modulePropertyName}`,
            );
            remainingErrors--;
            throw new Error(modulePropertyName);
          } else {
            // ensure method has 'this' defined correctly.
            return moduleProperty.call(anyClient[moduleName], ...args);
          }
        };
      });
  });
};
