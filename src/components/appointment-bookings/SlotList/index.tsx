import * as React from "react";

import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { Grid } from "../../structure/Grid";
import { SlotButton } from "../SlotButton";

export interface ISlotListProps {
  slots: ISlotWithHcp[];
  showHcpHint?: boolean;
  onSelection: (slot: ISlotWithHcp) => any;
}

/**
 * Renders a list of slots
 */
export const SlotList: React.FC<ISlotListProps> = ({
  slots,
  showHcpHint,
  onSelection,
}) => {
  return (
    <Grid size={"md"}>
      {(slots || []).map((s, i) => (
        <SlotButton
          key={i}
          slot={s}
          showHcpHint={showHcpHint}
          onClick={onSelection}
        />
      ))}
    </Grid>
  );
};
