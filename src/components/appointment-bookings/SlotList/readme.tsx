import * as React from "react";
import { useState } from "react";

import { SlotList } from ".";
import { mockSlotsWithHcps } from "next-shared/src/mockData/mockSlots";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { BookingProvider } from "../BookingProvider";

export const DemoStandard = () => {
  const [result, setResult] = useState<ISlotWithHcp>();

  return (
    <>
      <NextAppHandlerWeb>
        <BookingProvider>
          <SlotList slots={mockSlotsWithHcps} onSelection={setResult} />
        </BookingProvider>
      </NextAppHandlerWeb>
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
