import axios from "axios";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { unixTimestamp } from "next-shared/src/types/dateTypes";

// HACK don't access components from a helper
import { showToast } from "../components/generic/Toast";

// provides a utility that will monitor the application version
// if the application updates, or is open past a ttl it will refresh automatically

const defaultPollFrequency = 60 * 5; // 5 min

export interface IAutoAppUpdateConfig {
  maxTtl?: number; // unix time stamp of seconds until the app will auto refresh
  isAppropriateToRefresh?: () => boolean; // delegate function to prevent refreshing while in use
  pollFrequency?: number; // override the default new version poll frequency (seconds)
}

const appLoadTime: unixTimestamp = currentUnixTimestamp();
let appLoadVersion: string = null; // async loaded when app loads

export function autoAppUpdate(config: IAutoAppUpdateConfig = {}) {
  // extract config vars and set defaults
  const maxTtl = config.maxTtl || Infinity;
  const isAppropriateToRefresh = config.isAppropriateToRefresh || (() => true);
  const pollFrequency = (config.pollFrequency || defaultPollFrequency) * 1000;

  (async () => {
    // request initial version on load
    try {
      appLoadVersion = await getLatestServerAppVersion();
    } catch (e) {
      console.error(
        "Unable to fetch initial app server version, auto updates disabled",
      );
      return;
    }

    const checkIfReloadRequired = () => {
      if (currentUnixTimestamp() > appLoadTime + maxTtl) {
        // app has been running for longer than maxTtl, reload
        console.warn(
          "App has been running for longer than maxTtl, requesting update",
        );
        requestRefresh();
        return;
      }

      // check latest version from web
      getLatestServerAppVersion()
        .then((latestServerAppVersion) => {
          if (latestServerAppVersion !== appLoadVersion) {
            // there is a new version available according to the server
            console.warn("New app version available, requesting update");
            requestRefresh();
            return;
          }

          // app is up to date, check again later
          setTimeout(checkIfReloadRequired, pollFrequency);
        })
        .catch(() => {
          console.warn("Version check failed");
          setTimeout(checkIfReloadRequired, pollFrequency);
        });
    };

    const requestRefresh = () => {
      // check with isAppropriateToRefresh that we are ok to refresh
      if (!isAppropriateToRefresh()) {
        // we have been told we cannot refresh right now - requeue a check in 1 second
        console.warn(
          "autoAppUpdate: attempted refresh but isAppropriateToRefresh returned false, deferring update",
        );
        setTimeout(requestRefresh, 1000);
        return;
      }

      // we have the go-ahead to update the app now

      try {
        showToast({
          title: "Auto updating...",
          description: "",
          icon: "",
          persist: true,
        });
      } catch (e) {
        console.warn("Tried to show update toast but failed");
        console.error(e);
      }

      // use a timeout to give the user a second to see the toast so they know whats happening
      setTimeout(() => {
        location.reload();
      }, 1000);
    };

    setTimeout(checkIfReloadRequired, pollFrequency);
  })().catch(console.error);
}

// helper functions
async function getLatestServerAppVersion(): Promise<string> {
  // asks the server for the latest app version
  const req = await axios.get(location.origin + "/app-version");
  const version = req.data;

  return version;
}
