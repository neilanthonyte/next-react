import * as React from "react";
import { useState } from "react";

import { BookingSection, BookingSectionTitle, BookingSectionFooter } from ".";

export const DemoStandard = () => {
  const [action, setAction] = useState<string>();
  return (
    <BookingSection>
      <BookingSectionTitle>Section title</BookingSectionTitle>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum itaque
        labore iste quis aliquid nisi, ducimus culpa provident fuga. Illum
        repudiandae temporibus, ab qui cupiditate eaque est maxime unde libero.
      </p>
      <BookingSectionFooter
        onCancel={() => setAction("Canceled")}
        onAccept={() => setAction("Done")}
      />
      <div className="debug">
        <pre>{action}</pre>
      </div>
    </BookingSection>
  );
};
