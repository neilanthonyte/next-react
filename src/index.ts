import { createBrowserHistory, createHashHistory, History } from "history";

import { IConfig } from "next-shared/src/types/IConfig";

// https://stackoverflow.com/questions/50543163/can-i-detect-if-my-pwa-is-launched-as-an-app-or-visited-as-a-website
// Detects if device is in standalone mode
const isInStandaloneMode = () =>
  "standalone" in window.navigator && (window.navigator as any).standalone;

/**
 * Globals
 */
export let config: IConfig;
export const history: History = isInStandaloneMode()
  ? createHashHistory()
  : createBrowserHistory();

import "./entry/NextManagerApp";
import "./entry/NextCompanionApp";
