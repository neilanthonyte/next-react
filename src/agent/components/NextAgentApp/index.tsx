import * as React from "react";
import { useCallback, useState } from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { AgentUserConfigForm } from "../../forms/AgentUserConfigForm";

import styles from "./styles.scss";
import { Alert } from "../../../components/generic/Alert";
import { Button } from "../../../components/generic/Button";
import { LoginForm } from "../../../components/forms/LoginForm";
import { HStack } from "../../../components/structure/HStack";
import { NextAgentContext } from "../../../contexts/NextAgentContext";
import { cssComposer } from "../../../helpers/cssComposer";
import { useClient } from "../../../hooks/useClient";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
const css = cssComposer(styles, "NextAgentApp");

export const NextAgentApp: React.FC = () => {
  return (
    <div className={css("")}>
      {/*<StaticLogo variant="landscape" color="dark" />*/}
      <NextAgentAppInner />
    </div>
  );
};

export const NextAgentAppInner: React.FC = () => {
  const {
    locationName,
    login,
    logout,
    isConnected,
    userConfig,
    setUserConfig,
    serverMessage,
  } = useRequiredContext(NextAgentContext);
  const client = useClient();

  const [editingConfiguration, setEditingConfiguration] = useState(false);

  const handleAuthenticate = useCallback(
    async (formData: any) => {
      const jwt = await client.agent.generateJWT(
        formData.email,
        formData.password,
      );
      await login(jwt);
    },
    [login],
  );

  const handleEditConfiguration = useCallback(
    () => setEditingConfiguration(true),
    [],
  );
  const handleCancelEditConfiguration = useCallback(
    () => setEditingConfiguration(false),
    [],
  );
  const handleSaveUserConfig = useCallback((updatedConfig: any) => {
    setUserConfig(updatedConfig);
    setEditingConfiguration(false);
  }, []);

  if (!locationName) {
    // no location means the agent doesn't have any active JWT
    return <LoginForm onSubmit={handleAuthenticate} />;
  }

  if (editingConfiguration) {
    return (
      <AgentUserConfigForm
        config={userConfig}
        onCancel={handleCancelEditConfiguration}
        onSave={handleSaveUserConfig}
      />
    );
  }

  return (
    <>
      <Alert
        variant={isConnected ? TColorVariants.Success : TColorVariants.Danger}
        title={
          locationName + (isConnected ? " - Connected" : " - Not connected")
        }
        showClose={false}
      />
      {serverMessage && (
        <Alert variant={TColorVariants.Warning}>{serverMessage}</Alert>
      )}
      <br />
      <HStack>
        <Button onClick={logout} shouldConfirm={true} variant="secondary">
          Logout
        </Button>
        <Button onClick={handleEditConfiguration}>Edit configuration</Button>
      </HStack>
    </>
  );
};
