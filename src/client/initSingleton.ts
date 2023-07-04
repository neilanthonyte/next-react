import { nextClientFactory } from "./nextClientFactory";
import { NextClient } from "./NextClient";
import { AppConfig } from "next-shared/src/models/AppConfig";

let nextClient: NextClient | null = null;

export function initSingleton(config: AppConfig): void {
  if (nextClient !== null) {
    throw new Error("nextClient already initialised");
  }
  nextClient = nextClientFactory(config);
}
