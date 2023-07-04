// factory for NextClient
import "reflect-metadata";
import { inject } from "inversify";

import { NextClient } from "./NextClient";
import { createMockContainer } from "./createContainerMock";
import { IMockConfigValues, MockConfiguration } from "./MockConfiguration";

class NextClientMock extends NextClient {
  @inject("MockConfiguration") public mockConfiguration: MockConfiguration;
}

export function nextClientFactoryMock(
  apiUrl: string = "",
  config?: IMockConfigValues,
): NextClient {
  // create an IoC container
  const container = createMockContainer();

  // get an instance of NextClient
  const nextClient = container.resolve(NextClientMock);
  if (config) {
    // Setting a session for different access level based on config
    nextClient.mockConfiguration.setConfig(config);
    nextClient.auth.setSession(null);
  }
  nextClient.httpConnection.url = apiUrl;
  nextClient.webSocketConnection.setUrl(apiUrl);

  return nextClient;
}
