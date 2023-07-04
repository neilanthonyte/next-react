import * as React from "react";
import { useMemo } from "react";

import { ICellAction } from "../../structure/Cell";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import {
  BookingContext,
  BOOKING_STAGES,
} from "../../../contexts/AppointmentBookingContext";
import { VStack } from "../../structure/VStack";
import { SlotCell } from "../../cells/SlotCell";
import { AppointmentTypeCell } from "../../cells/AppointmentTypeCell";
import { LocationCell } from "../../cells/LocationCell";
import { HcpCell } from "../../cells/HcpCell";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "AppointmentSelectionSummary");

export interface IAppointmentSelectionSummaryProps {
  readOnly?: boolean;
}

/**
 * Component rendering a summary of the selection made so far in the booking flow
 */
export const AppointmentSelectionSummary: React.FC<
  IAppointmentSelectionSummaryProps
> = ({ readOnly = false }) => {
  const {
    hide,
    location,
    clearLocation,
    hcp,
    clearHcp,
    appointmentType,
    clearAppointmentType,
    slot,
    clearSlot,
    stage,
  } = useRequiredContext(BookingContext);

  const locked = readOnly || stage !== BOOKING_STAGES.Review;

  const actions: { [key: string]: ICellAction[] } = useMemo(
    () => ({
      location:
        locked || hide.location
          ? null
          : [{ icon: "action-edit", onClick: clearLocation }],
      hcp:
        locked || hide.hcp
          ? null
          : [{ icon: "action-edit", onClick: clearHcp }],
      appointmentType:
        locked || hide.appointmentType
          ? null
          : [{ icon: "action-edit", onClick: clearAppointmentType }],
      slot: locked ? null : [{ icon: "action-edit", onClick: clearSlot }],
    }),
    [locked, hide],
  );

  const missingData =
    [location, hcp, appointmentType, slot].filter((n) => n).length === 0;

  return (
    <div className={css("")}>
      <VStack>
        {missingData && <div>No selection made yet</div>}
        {location && (
          <div data-test="locations-selection">
            <LocationCell location={location} actions={actions.location} />
          </div>
        )}
        {hcp && (
          <div data-test="hcps-selection">
            <HcpCell hcp={hcp} actions={actions.hcp} />
          </div>
        )}
        {appointmentType && (
          <div data-test="apptTypes-selection">
            <AppointmentTypeCell
              appointmentType={appointmentType}
              actions={actions.appointmentType}
            />
          </div>
        )}
        {slot && (
          <div data-test="time">
            <SlotCell slot={slot} actions={actions.slot} />
          </div>
        )}
      </VStack>
    </div>
  );
};
