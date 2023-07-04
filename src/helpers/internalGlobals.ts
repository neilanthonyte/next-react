import { IRcNextConfig } from "./IRcNextConfig";
import { NextClient } from "../client/NextClient";

export let nextClient: NextClient;
export let config: IRcNextConfig;

export function setGlobalNextClient(newNextClient: NextClient) {
  nextClient = newNextClient;
}

export function setGlobalConfig(newConfig: IRcNextConfig) {
  config = newConfig;
}
