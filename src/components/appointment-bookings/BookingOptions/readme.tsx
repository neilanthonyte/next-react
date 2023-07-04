import * as React from "react";
import { useState } from "react";

import { BookingOptions, BookingOption } from ".";

export const DemoStandard = () => {
  const [result, setResult] = useState<number>();
  return (
    <BookingOptions>
      <BookingOption selected={result === 1} onSelect={() => setResult(1)}>
        Option 1
      </BookingOption>
      <BookingOption selected={result === 2} onSelect={() => setResult(2)}>
        Option 2
      </BookingOption>
      <BookingOption selected={result === 3} onSelect={() => setResult(3)}>
        Option 3
      </BookingOption>
    </BookingOptions>
  );
};
