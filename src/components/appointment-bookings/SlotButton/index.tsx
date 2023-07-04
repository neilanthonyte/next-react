import * as React from "react";
import { useMemo } from "react";
import moment from "moment";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { Hcp } from "next-shared/src/models/Hcp";
import { BlockButton } from "../../generic/Button";
import { useHcps } from "next-react/src/hooks/content/useHcps";

interface ISlotButtonProps {
  slot: ISlotWithHcp;
  showHcpHint?: boolean;
  onClick?: (slot: ISlotWithHcp) => any;
}

/**
 * Renders a button with slot information
 */
export const SlotButton: React.FC<ISlotButtonProps> = ({
  slot,
  showHcpHint,
  onClick,
}) => {
  // optionally adapt the output based on the chosen hcp
  const { hcps, isLoading, error, refetch } = useHcps();

  const startDate = useMemo(() => moment(slot.start), [slot.start]);
  const time = useMemo(() => startDate.format("h:mma"), [startDate]);
  const date = useMemo(() => {
    const dateStr = startDate.calendar(null, {
      // when the date is closer, specify custom values
      sameDay: "[today]",
      nextDay: "[tomorrow]",
      nextWeek: "dddd",
      // when the date is further away, use from-now functionality
      sameElse: "Do MMM",
    });
    return `, ${dateStr}`;
  }, [startDate]);

  const slotHcp: Hcp = useMemo(() => {
    if (!hcps || !slot || !slot.hcp) {
      return null;
    }
    const hcp = hcps.find((h) => h.npServicesId === slot.hcp.npServicesId);
    return hcp;
  }, [hcps, slot]);

  // check that we don't have a hcp selected
  const hcpLabel =
    slotHcp && showHcpHint
      ? `${slotHcp.suffix || ""} ${slotHcp.lastName}`.trim()
      : null;

  return (
    <BlockButton
      variant="secondary"
      onClick={() => onClick(slot)}
      label={hcpLabel}
    >
      {time}
      {date}
    </BlockButton>
  );
};
