import * as React from "react";
import moment = require("moment");
import { useState } from "react";

import { Button } from "../../generic/Button";
import { Grid } from "../../structure/Grid";

export interface ISlotListProps {
  slots: fhir3.Slot[];
  onSlotSelected: (slot: fhir3.Slot) => void;
  /**
   * How many slots to show before a "show more" button appears.
   */
  slotLimit?: number;
}

/**
 * Given Fhir slots, this will render out those slots in a flex grid.
 * When a user clicks on the slot the `onSlotSelected` prop is called.
 *
 * Handles a basic version of pagination when given a slot limit.
 */
export const SlotList: React.FC<ISlotListProps> = ({
  slots,
  onSlotSelected,
  slotLimit = null,
}) => {
  if (!slots || !slots.length) {
    return null;
  }

  const [amountOfSlotsShowing, setAmountOfSlotsShowing] = useState(
    slotLimit || slots.length,
  );

  const renderSlots = slots.map((slot, index) => {
    return (
      <div data-test="slot" key={index}>
        <Button onClick={() => onSlotSelected(slot)} isBlock>
          {moment(slot.start).format("h:mma")}
        </Button>
      </div>
    );
  });

  const showMoreClicked = () => {
    setAmountOfSlotsShowing(amountOfSlotsShowing + slotLimit);
  };

  return (
    <div data-test="slot-list">
      <Grid size="sm">{renderSlots.slice(0, amountOfSlotsShowing)}</Grid>
      {slotLimit && amountOfSlotsShowing < slots.length && (
        <div data-test="show-more">
          <Button onClick={showMoreClicked}>Show More</Button>
        </div>
      )}
    </div>
  );
};
