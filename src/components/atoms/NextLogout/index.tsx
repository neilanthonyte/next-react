import * as React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";

export interface INextLogoutProps {}

/**
 * Performs a log out.
 */
export const NextLogout: React.FC<INextLogoutProps> = () => {
  const client = useClient();
  const history = useHistory();

  useEffect(() => {
    client.auth
      .logout()
      .then(() => {
        if (localStorage.getItem("using_SSO") === "true") {
          // log out from external service, return back to login page
          client.sso.logoutFromIdentityProvider(location.origin);
        } else {
          // redirect user to login page
          history.push("/");
        }
      })
      .catch(console.error);
  }, []);
  return <div>Logging out...</div>;
};
