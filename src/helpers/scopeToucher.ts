import { nextClient } from "./internalGlobals";

// this function touches the scope every 5 minutes if there has been user interaction with the screen
// this ensures a patient will not be kicked from a scope if they are using the device
export function initScopeToucher() {
  const updateInterval = 3 * 60; // how often to ping the server (in seconds)

  let lastTouch = 0;

  // runs every updateInterval
  setInterval(() => {
    const now = Date.now() / 1000;
    if (
      lastTouch > now - updateInterval && // user has touched the screen within the last update interval
      nextClient.auth.session?.app // is authenticated as an app
    ) {
      // touch the scope
      nextClient.scopes
        .touchScope(nextClient.auth.session.app.scopeId)
        .catch(console.error);
    }
  }, updateInterval * 1000);

  document.querySelector("body").addEventListener("touchstart", () => {
    lastTouch = Date.now() / 1000;
  });
  document.querySelector("body").addEventListener("mousedown", () => {
    lastTouch = Date.now() / 1000;
  });
}
