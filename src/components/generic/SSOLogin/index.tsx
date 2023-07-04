import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import { useClient } from "../../../hooks/useClient";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { Alert } from "../Alert";
import { AltButton, Button } from "../Button";
import { Loader } from "../Loader";
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "SSOLogin");

export interface ISSOLoginProps {
  buttonType?: "standard" | "alt";
  hideButton?: boolean;
}

export const SSOLogin: React.FC<ISSOLoginProps> = ({
  children,
  buttonType,
  hideButton,
}) => {
  const client = useClient();
  const { loginSessionId, loginErrorMessage } = urlParamsToObject() as any;

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  // process any url params on initial load
  useEffect(() => {
    if (loginSessionId) {
      // if a session has been provided in the url params, set it on the client
      setErrorMessage(null);
      setIsLoggingIn(true);

      // store a flag on the browser, so we know in the future if we need to sign out of the identity provider
      // saves sending the user to the IDP sign out page if they just logged in using a username & password
      localStorage.setItem("using_SSO", "true");

      client.auth
        .setSessionFromSessionId(loginSessionId)
        .then(() => setIsLoggingIn(false))
        .catch((e) => {
          setIsLoggingIn(false);
          setErrorMessage("Failed to store session, please contact support");

          console.error(e);
        });
    }

    // this allows services to respond back with an error to show the user
    // e.g. "Your account is not configured correctly to use this application"
    if (loginErrorMessage) {
      setErrorMessage(loginErrorMessage);
    }

    if (loginErrorMessage || loginSessionId) {
      // clear get params out from url bar (without reloading the page)
      window.history.replaceState(
        {},
        document.title,
        location.href.split("?")[0],
      );
    }
  }, []);

  const handleSSOLogin = useCallback(async () => {
    const { error, signInUrl } = await client.sso.generateSignInUrl();
    if (error) {
      setErrorMessage(error);
      return;
    }

    // redirect to sign in url
    setIsLoggingIn(true);
    location.href = signInUrl;
  }, []);

  const ButtonComponent = buttonType === "alt" ? AltButton : Button;

  return (
    <div className={css("")}>
      {errorMessage && (
        <div className={css("error")}>
          <Alert showClose={false} variant={TColorVariants.Danger}>
            {errorMessage}
          </Alert>
        </div>
      )}
      {isLoggingIn && <Loader />}
      {!isLoggingIn && !hideButton && (
        <ButtonComponent onClick={handleSSOLogin}>{children}</ButtonComponent>
      )}
    </div>
  );
};
