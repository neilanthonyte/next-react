import { useCallback, useEffect, useState } from "react";
import * as React from "react";

import { useClient } from "../../../hooks/useClient";
import { SSOLogin } from "../../generic/SSOLogin";
import { ICredentials, LoginForm } from "../../forms/LoginForm";
import { VStack } from "../../structure/VStack";
import { ILoginPinFormData, LoginPinForm } from "../../forms/LoginPinForm";
import { UnauthorizedError } from "next-shared/src/helpers/errorTypes";

export interface INextLoginProps {
  asApp?: boolean;
  allowSSO?: boolean;
}

/**
 * Handles logging into the Next system, including both user and app based logins.
 */
export const NextLogin: React.FC<INextLoginProps> = ({
  asApp = false,
  allowSSO = true,
}) => {
  const client = useClient();

  const [usingSSO, setUsingSSO] = useState<boolean>(false);
  const toggleSSO = useCallback(() => setUsingSSO((x) => !x), []);

  // SSO not supported for apps
  if (asApp) {
    allowSSO = false;
  }

  const loginAsStaff = useCallback(
    async (props: ICredentials) => {
      const { email, password } = props;
      // Should cause the session to be set
      try {
        const session = await client.auth.loginAsStaffMember(email, password);
        if (session === null) {
          return Promise.reject({
            errorMsg: "Invalid username or password",
          });
        }
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          return Promise.reject({
            errorMsg: error?.message,
          });
        }
      }
    },
    [client.auth.session],
  );

  const loginAsApp = useCallback(
    async (props: ILoginPinFormData) => {
      const { accessCode } = props;
      // Should cause the session to be set
      const session = await client.auth.loginAsApp(accessCode);

      if (session === null) {
        return Promise.reject({
          errorMsg: "Access code is invalid or has expired",
        });
      }
    },
    [client.auth.session],
  );

  return (
    <VStack>
      {usingSSO ? (
        <SSOLogin>Login with Microsoft</SSOLogin>
      ) : asApp ? (
        <LoginPinForm onSubmit={loginAsApp} />
      ) : (
        <LoginForm onSubmit={loginAsStaff} />
      )}
      {allowSSO && (
        <a onClick={toggleSSO}>
          {usingSSO ? "or use traditional login" : "or login with Microsoft"}
        </a>
      )}
    </VStack>
  );
};
