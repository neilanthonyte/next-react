import * as React from "react";

import { PatientLogin, EPatientLoginMode } from "../../atoms/PatientLogin";
import { Center } from "../../structure/Center";
import { Resource } from "../../generic/Resource";

import styles from "./styles.scss";

export interface ICompanionLoginProps {
  onLoginSuccess: () => unknown;
  emailPlaceholder?: string;
}

/**
 * Renders the login with some additional formatting to help it fit within
 * a busy page layout.
 */
export const CompanionLogin: React.FC<ICompanionLoginProps> = ({
  onLoginSuccess,
  emailPlaceholder,
}) => {
  return (
    <Center>
      <Resource>
        <div className={styles.CompanionLogin}>
          <h4>Complete the sign-up here</h4>
          <p>
            Please sign in using your email and password. You will only need to
            do this once.
          </p>
        </div>
        <PatientLogin
          loginMode={EPatientLoginMode.Companion}
          onLoginSuccess={onLoginSuccess}
          emailPlaceholder={emailPlaceholder}
          title={null}
          message={null}
          showLogo={false}
        />
      </Resource>
    </Center>
  );
};
