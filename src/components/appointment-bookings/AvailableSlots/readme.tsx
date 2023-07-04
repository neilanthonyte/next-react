import * as React from "react";

import { BookingContext } from "next-react/src/contexts/AppointmentBookingContext";
import { addParamsToUrl } from "next-react/src/helpers/addParamsToUrl";
import { useRequiredContext } from "next-react/src/hooks/useRequiredContext";
import {
  mockAppointmentTypes,
  mockAppointmentTypeNoAvailabilitySlug,
} from "next-shared/src/mockData/mockAppointmentTypes";

import { BookingProvider } from "../BookingProvider";
import { List, ListItem } from "../../structure/List";
import { useDebug } from "../../../debug/DemoWrapper";
import { AvailableSlots } from ".";

const Inner = () => {
  const { appointmentTypes } = useRequiredContext(BookingContext);
  const { setOutput } = useDebug();
  return (
    <List>
      {(appointmentTypes || []).map((a) => (
        <ListItem key={a.label}>
          <AvailableSlots
            appointmentType={a}
            onSelection={(type, slot) => setOutput({ type, slot })}
          />
        </ListItem>
      ))}
    </List>
  );
};

export const DemoStandard = () => {
  return (
    <>
      <BookingProvider>
        <Inner />
      </BookingProvider>
      <ul>
        <li>
          Add <code>?debugClientMethodsError=</code>{" "}
          <a
            href={addParamsToUrl({
              debugClientMethodsError: ["bookings.retrieveSlots"],
            })}
          >
            (add now)
          </a>
          <a
            href={addParamsToUrl({
              debugClientMethodsError: undefined,
            })}
          >
            (remove now)
          </a>
        </li>
        <li>
          Add <code>?useRealClient=</code>{" "}
          <a
            href={addParamsToUrl({
              useRealClient: true,
            })}
          >
            (add now)
          </a>
          <a
            href={addParamsToUrl({
              useRealClient: undefined,
            })}
          >
            (remove now)
          </a>
        </li>
      </ul>
    </>
  );
};

export const DemoNoAvailability = () => {
  const { setOutput } = useDebug();
  const appointmentType = mockAppointmentTypes.find(
    (n) => n.slug === mockAppointmentTypeNoAvailabilitySlug,
  );

  return (
    <BookingProvider>
      <AvailableSlots
        appointmentType={appointmentType}
        onSelection={(type, slot) => setOutput({ type, slot })}
      />
    </BookingProvider>
  );
};
