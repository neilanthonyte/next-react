import * as React from "react";

import { useSyncedSessionData } from "../../../../hooks/core/useSyncedSessionData";
import { Button } from "../../../generic/Button";
import { VStack } from "../../../structure/VStack";

interface ISendTwoFactorAuthenticationCodeProps {
  onSendCode: () => Promise<void>;
}

/**
 * Component rendering the starting screen of the flow to trigger a send two fa code
 */
export const SendTwoFactorAuthenticationCode: React.FC<
  ISendTwoFactorAuthenticationCodeProps
> = ({ onSendCode }) => {
  const { ehrPatient } = useSyncedSessionData();
  const mobile: string = ehrPatient.getPrimaryMobileNumber();
  const mobileFormatted = mobile
    ? `04** *** ${mobile.substring(mobile.length - 3)}`
    : "NO NUMBER ON RECORD";

  return (
    <VStack>
      <p>
        Click the button below to send a verification SMS message to the mobile:{" "}
        <strong>{mobileFormatted}</strong>
      </p>
      <Button isBlock={true} onClick={onSendCode}>
        Send two factor code
      </Button>
    </VStack>
  );
};
