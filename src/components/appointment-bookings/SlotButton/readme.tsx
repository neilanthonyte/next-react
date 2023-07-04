import * as React from "react";
import { useState } from "react";

import { SlotButton } from ".";
import { mockSlotsWithHcps } from "next-shared/src/mockData/mockSlots";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { BookingProvider } from "../BookingProvider";

export const DemoStandard: React.FC = () => {
  const [selectedSlot, setSelectedSlot] = useState<ISlotWithHcp>();
  const slot: ISlotWithHcp = mockSlotsWithHcps[0];

  return (
    <NextAppHandlerWeb>
      <BookingProvider>
        <SlotButton onClick={setSelectedSlot} slot={slot} />
        <div className="debug">
          <pre>{JSON.stringify(selectedSlot, null, 2)}</pre>
        </div>
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};
