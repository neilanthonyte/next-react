import * as React from "react";
import { useRef, useState } from "react";

import { Screen, ScreenBody } from "../Screen";

import { TDialogSizes } from "next-shared/src/types/dialogs";
import { Dialog, DialogHeader, DialogBody } from "../../structure/Dialog";
import { cssComposer } from "../../../helpers/cssComposer";

import styles from "./styles.scss";
import { NextLogin } from "../../auth/NextLogin";
const css = cssComposer(styles, "LoginScreen");

export interface ILoginScreenProps {
  /**
   * true to login as an App using a generated pin code (i.e. provider bar, companion. ) or username/password. Please note that SSOly available for username/password login type
   */
  asApp: boolean;
}
/**
 * This is the base login modal used for staff members login.
 */
const LoginScreen: React.FC<ILoginScreenProps> = ({ asApp }) => {
  const screen = useRef(null);
  const [, rerender] = useState<boolean>(false);
  return (
    <div data-test-id="login-screen" className={css("")}>
      <Screen>
        <ScreenBody center={true}>
          <Dialog size={TDialogSizes.Medium}>
            <DialogHeader>Login to Next</DialogHeader>
            <DialogBody>
              <div
                ref={(x) => {
                  screen.current = x;
                  rerender(true);
                }}
              >
                {!!screen.current && <NextLogin asApp={asApp} />}
              </div>
            </DialogBody>
          </Dialog>
        </ScreenBody>
      </Screen>
    </div>
  );
};

export const UserLoginScreen = () => <LoginScreen asApp={false} />;
export const AppLoginScreen = () => <LoginScreen asApp={true} />;
