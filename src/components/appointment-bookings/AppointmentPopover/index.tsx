import * as React from "react";
import { useCallback, useEffect } from "react";

import { AppointmentSelectionSummary } from "../AppointmentSelectionSummary";
import { BookingPopover } from "../BookingPopover";
import { BookingContext } from "next-react/src/contexts/AppointmentBookingContext";
import { useRequiredContext } from "next-react/src/hooks/useRequiredContext";
import {
  FlowInlineSummaryMobile,
  FlowSummary,
  FlowSummaryDestopHeader,
  FlowSummaryExpanded,
} from "../../structure/FlowSummary";
import { Button } from "../../generic/Button";
import { AppointmentFlow } from "../AppointmentFlow";

export interface IAppointmentPopoverProps {
  isOpen?: boolean;
  onBack?: () => void;
}

/**
 * Appointment modal handling booking flow
 */
export const AppointmentPopover: React.FC<IAppointmentPopoverProps> = ({
  isOpen = true,
  onBack,
}) => {
  const { clear } = useRequiredContext(BookingContext);

  useEffect(() => {
    // reset the booking state on closed
    if (!isOpen) {
      clear();
    }
  }, [isOpen]);

  const onExit = useCallback(() => {
    typeof onBack === "function" && onBack();
  }, [clear]);

  return (
    <>
      <FlowSummary toggleSummary={true} open={isOpen}>
        <FlowSummaryDestopHeader>
          <Button onClick={onExit} shouldConfirm={true}>
            Exit
          </Button>
        </FlowSummaryDestopHeader>
        <FlowSummaryExpanded>
          <AppointmentSelectionSummary readOnly={true} />
        </FlowSummaryExpanded>
        <FlowInlineSummaryMobile>
          <Button onClick={onExit} shouldConfirm={true}>
            Exit
          </Button>
        </FlowInlineSummaryMobile>
      </FlowSummary>
      {isOpen && (
        <BookingPopover>
          <AppointmentFlow />
        </BookingPopover>
      )}
    </>
  );
};
