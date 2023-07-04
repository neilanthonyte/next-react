import * as React from "react";
import { useCallback } from "react";

import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";
import { BlockButton, IButtonConfirmation } from "../../generic/Button";

export interface IClearServicesCacheButtonProps {}

/**
 * Button to clear the service cache, including HCP details, appointment details and slot times.
 */
export const ClearServicesCacheButton: React.FC<
  IClearServicesCacheButtonProps
> = ({}) => {
  const client = useClient();

  const buttonConfirmation: IButtonConfirmation = {
    title: "Are you sure you want to reset the cache?",
    description:
      "This will cause all new data to appear, but will cause the system to ",
  };
  const resetCache = useCallback(() => {
    return client.cache.clearEntireCache();
  }, [client]);

  return (
    <BlockButton onClick={resetCache} shouldConfirm={buttonConfirmation}>
      Flush cached data
    </BlockButton>
  );
};
