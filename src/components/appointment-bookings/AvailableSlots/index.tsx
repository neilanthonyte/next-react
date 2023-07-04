import * as React from "react";
import styles from "./styles.scss";
import { PageableSlotList } from "./components/PageableSlotList";
import { cssComposer } from "next-react/src/helpers/cssComposer";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { useElementDimension } from "next-react/src/hooks/useElementDimension";
import { AppointmentTypeDetails } from "../../atoms/AppointmentTypeDetails";
import { PlaceholderView } from "../../views/PlaceholderView";
import { EAppointmentStepIcons } from "next-react/src/helpers/stepIcons";
import { Disable } from "../../generic/Disable";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { Button } from "../../generic/Button";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { useBookingSlots } from "next-react/src/hooks/useBookingSlots";

const css = cssComposer(styles, "AvailableSlots");

const LAYOUT_BREAKPOINT = 640; // pixels

interface IAvailableSlotsProps {
  appointmentType: AppointmentType;
  hcpId?: string;
  children?: any;
  onSelection: (appointmentType: AppointmentType, slot?: ISlotWithHcp) => any;
}

/**
 * Displays the available slots for a given appointment type, optionally restricted
 * to a specific HCP.
 */
export const AvailableSlots: React.FC<IAvailableSlotsProps> = ({
  appointmentType,
  hcpId,
  onSelection,
}) => {
  const {
    initDate,
    data: slots,
    isLoading,
    error: slotsError,
    refetch: slotsRefetch,
  } = useBookingSlots(appointmentType, null, hcpId || null);

  const [componentRef, { clientWidth }] = useElementDimension();

  const layoutVariant =
    clientWidth < LAYOUT_BREAKPOINT ? "-vertical" : "-horizontal";

  const showHcpHint = !hcpId;

  return (
    <div className={css("", layoutVariant)} ref={componentRef}>
      <div className={css("label", layoutVariant)}>
        {appointmentType.label}
        <br />
        <AppointmentTypeDetails type={appointmentType} />
      </div>
      <div className={css("slots", layoutVariant)}>
        {initDate === null ? (
          <PlaceholderView
            icon={EAppointmentStepIcons.Slot}
            instruction={"No available appointment slots"}
          />
        ) : (
          <Disable disabled={isLoading} showSpinner={true}>
            {slotsError ? (
              <ErrorPlaceholder retry={slotsRefetch} />
            ) : (
              <PageableSlotList
                slots={slots}
                showHcpHint={showHcpHint}
                onSelection={(slot: ISlotWithHcp) => {
                  onSelection(appointmentType, slot);
                }}
              />
            )}
          </Disable>
        )}
      </div>
      <div className={css("more", layoutVariant)}>
        <Button
          size={EStandardSizes.Medium}
          isBlock={true}
          onClick={() => {
            onSelection(appointmentType);
          }}
        >
          More...
        </Button>
      </div>
    </div>
  );
};
