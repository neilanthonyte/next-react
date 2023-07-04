import * as React from "react";
import moment from "moment";

import { Hcp } from "next-shared/src/models/Hcp";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { useBookingSlots, IDateRange } from "../../../hooks/useBookingSlots";
import { useEffect, useState } from "react";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { AppointmentTypeCard } from "../../atoms/AppointmentTypeCard";

export interface IHcpAppointmentTypeWithSlotsProps {
  hcp: Hcp;
  appointmentType: AppointmentType;
  onSelectAppointmentType?: (type: AppointmentType) => any;
  showSlots?: boolean;
  onSelectSlot?: (slot: ISlotWithHcp) => any;
}

/**
 * Component rendering appointment types for an hcp
 * and optionally fetching and showing available slots
 */
export const HcpAppointmentTypeWithSlots: React.FC<
  IHcpAppointmentTypeWithSlotsProps
> = ({
  hcp,
  appointmentType,
  onSelectAppointmentType,
  showSlots,
  onSelectSlot,
}) => {
  const [dateRange, setDateRange] = useState<IDateRange>(null);
  const {
    initDate,
    data: slots,
    isLoading: slotsIsLoading,
    error: slotsError,
    refetch: slotsRefetch,
  } = useBookingSlots(
    showSlots ? appointmentType : null,
    dateRange,
    hcp.npServicesId,
  );

  useEffect(() => {
    setDateRange(
      initDate
        ? {
            startDate: moment(initDate).startOf("day").format("YYYY-MM-DD"),
            endDate: moment(initDate).endOf("day").format("YYYY-MM-DD"),
          }
        : null,
    );
  }, [initDate]);

  return (
    <LoadingBlock isLoading={!!slotsIsLoading}>
      {slotsError ? (
        <ErrorPlaceholder retry={slotsRefetch} />
      ) : (
        <AppointmentTypeCard
          type={appointmentType}
          onClick={onSelectAppointmentType}
          slots={slots ? slots.slice(0, 6) : null}
          onSelectSlot={onSelectSlot}
        />
      )}
    </LoadingBlock>
  );
};
