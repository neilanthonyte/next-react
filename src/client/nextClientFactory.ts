// factory for NextClient
import "reflect-metadata";
import { NextClient } from "./NextClient";
import { createContainer } from "./createContainer";
import { AppConfig } from "next-shared/src/models/AppConfig";

export function nextClientFactory(config: AppConfig): NextClient {
  // create an IoC container
  const container = createContainer();

  // get an instance of NextClient
  const nextClient = container.get<NextClient>("NextClient");
  nextClient.httpConnection.url = config.servicesUrl;
  nextClient.webSocketConnection.setUrl(config.socketUrls.main);
  nextClient.sync.setUrls(config.socketUrls);

  return nextClient;
}
