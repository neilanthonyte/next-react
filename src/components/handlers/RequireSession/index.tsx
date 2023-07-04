import * as React from "react";

import { PendingContent } from "../../structure/PendingContent";
import { useClient } from "../../../hooks/useClient";
import { AppLoginScreen, UserLoginScreen } from "../../views/LoginScreen";
import { Message, MessageTitle } from "../../generic/Message";

export interface IRequireSessionProps {
  children?: any;
  variant?: "screen" | "message";
}

/**
 * Hide content until a session is present.
 */
export const RequireAppSession: React.FC<IRequireSessionProps> = ({
  variant,
  children,
}) => {
  const client = useClient();
  const hasSession = !!client.auth.session;

  if (variant === "message") {
    if (hasSession) {
      return children;
    } else {
      return (
        <>
          <Message>
            <MessageTitle>Please log in to continue</MessageTitle>
          </Message>
          <UserLoginScreen />
        </>
      );
    }
  }

  return (
    <PendingContent check={hasSession} fallback={AppLoginScreen}>
      {children}
    </PendingContent>
  );
};

/**
 * Hide content until a session is present.
 */
export const RequireUserSession: React.FC<IRequireSessionProps> = ({
  variant,
  children,
}) => {
  const client = useClient();
  const hasSession = !!client.auth.session;

  if (variant === "message") {
    if (hasSession) {
      return children;
    } else {
      return (
        <>
          <Message>
            <MessageTitle>Please log in to continue</MessageTitle>
          </Message>
          <UserLoginScreen />
        </>
      );
    }
  }

  return (
    <PendingContent check={hasSession} fallback={UserLoginScreen}>
      {children}
    </PendingContent>
  );
};
