import * as React from "react";
import { useCallback } from "react";
import { useHistory } from "react-router";
import { useClient } from "../../../hooks/useClient";
import { BlockButton } from "../../generic/Button";
import { VStack } from "../../structure/VStack";

export interface IProviderAppSettingsViewProps {}

/**
 * Displays the settings for the Provider app, which includes the option to
 * log out.
 */
export const ProviderAppSettingsView: React.FC<
  IProviderAppSettingsViewProps
> = ({}) => {
  const client = useClient();
  const history = useHistory();

  const logout = useCallback(async () => {
    await client.auth.logout();
    history.push("/");
  }, []);

  const staffName = client.auth.session?.staffMember?.email;

  return (
    <VStack>
      <div style={{ textAlign: "center" }}>
        Logged in as:
        <br />
        {staffName}
      </div>
      <BlockButton variant="secondary" onClick={logout}>
        Log out
      </BlockButton>
    </VStack>
  );
};
