import { mockAppointmentTypes } from "next-shared/src/mockData/mockAppointmentTypes";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import * as React from "react";

import { BookingSuggestions } from ".";
import { useDebug } from "../../debug/DemoWrapper";

export const DemoStandard: React.FC = () => {
  const { setOutput } = useDebug();

  return (
    <BookingSuggestions
      locationSlug={mockNextLocations[0].slug}
      appointmentTypeSlugs={mockAppointmentTypes.map((t) => t.slug)}
      onSelection={(appointmentType, hcpSlug, slot) =>
        setOutput({
          appointmentType,
          hcpSlug,
          slot,
        })
      }
    />
  );
};
