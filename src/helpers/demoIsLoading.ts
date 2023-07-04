import { delay } from "./delay";

/**
 * Waits for all async content, by expecting providers to expose their loading state through a
 * data-isloading attribute
 *
 * All examples use a DemoWrapper that in turn uses an AppHandler, which includes some asyncronous
 * loading. As such, all demo feature some form of async loading, making this function safe to
 * include in all integration files.
 */
export async function demoIsLoading(selector: Selector) {
  const isLoading = selector.find(`[data-isloading]`);
  let allLoaded = false;
  do {
    allLoaded = true;
    // HACK this ensures the data-isloading are present in the DOM (untested)
    await delay(100);
    // determine how many components to wait for
    const loadableCount = await isLoading.count;
    for (let i = 0; i < loadableCount; i++) {
      const elementLoading = await isLoading.getAttribute("data-isloading");
      if (elementLoading === "true") {
        allLoaded = false;
      }
    }
  } while (!allLoaded);
}
