import * as React from "react";
import { useState } from "react";

import { AppointmentType } from "next-shared/src/models/AppointmentType";

import { AppointmentTypeCard } from ".";
import { mockAppointmentTypes } from "next-shared/src/mockData/mockAppointmentTypes";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { BookingProvider } from "../../appointment-bookings/BookingProvider";

export const Demo = () => {
  const [selected, setSelected] = useState<AppointmentType>();

  return (
    <NextAppHandlerWeb>
      <BookingProvider>
        {mockAppointmentTypes.map((type) => (
          // <pre>{JSON.stringify(type, null, 2)}</pre>
          <AppointmentTypeCard
            key={type.slug}
            type={type}
            onClick={setSelected}
          />
        ))}
        <div className="debug">
          <pre>{JSON.stringify(selected, null, 2)}</pre>
        </div>
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};
