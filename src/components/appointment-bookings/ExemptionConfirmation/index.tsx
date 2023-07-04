import * as React from "react";

import { Button } from "../../generic/Button";
import { Icon } from "../../generic/Icon";

export interface IExemptionConfirmationProps {
  onConfirm: (args?: any) => any;
}

/**
 * Ask the patient to confirm they should be exempt from paying for an appointment. We rely on
 * goodwill, so this confirmation is used to make the patient self reflect on the decision.
 *
 * An exemption occurs when they are in a special category (i.e. below 16, above 70, has a DVA card, etc)
 * and there is an associated medicare code for this gap appointment.
 */
export const ExemptionConfirmation: React.FC<IExemptionConfirmationProps> = ({
  onConfirm,
}) => (
  <>
    <h3>Please confirm your exemption status</h3>
    <p>
      You are not required to pay the appointment because you meet the exemption
      criteria. Please confirm this is true.
    </p>
    <p>
      <Button onClick={onConfirm}>
        Confirm <Icon name="chevron-right" />
      </Button>
    </p>
  </>
);
