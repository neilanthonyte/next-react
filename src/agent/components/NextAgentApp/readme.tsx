import * as React from "react";
import { NextAgentApp } from ".";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { MockNextAgentHandler } from "../MockNextAgentHandler";

export const DemoNotLoggedIn: React.FC = () => {
  return (
    <NextAppHandlerWeb>
      <MockNextAgentHandler initiallyLoggedIn={false} isConnected={false}>
        <NextAgentApp />
      </MockNextAgentHandler>
    </NextAppHandlerWeb>
  );
};

export const DemoNotConnected: React.FC = () => {
  return (
    <NextAppHandlerWeb>
      <MockNextAgentHandler initiallyLoggedIn={true} isConnected={false}>
        <NextAgentApp />
      </MockNextAgentHandler>
    </NextAppHandlerWeb>
  );
};

export const DemoNotConnectedWithError: React.FC = () => {
  return (
    <NextAppHandlerWeb>
      <MockNextAgentHandler
        initiallyLoggedIn={true}
        isConnected={false}
        serverMessage="Cannot connect, missing sql connection string in user configuration"
      >
        <NextAgentApp />
      </MockNextAgentHandler>
    </NextAppHandlerWeb>
  );
};

export const DemoLoggedIn: React.FC = () => {
  return (
    <NextAppHandlerWeb>
      <MockNextAgentHandler initiallyLoggedIn={true} isConnected={true}>
        <NextAgentApp />
      </MockNextAgentHandler>
    </NextAppHandlerWeb>
  );
};
