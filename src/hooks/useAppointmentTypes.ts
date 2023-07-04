import { useQuery, QueryResult } from "react-query";

import { useClient } from "./useClient";
import { AppointmentType } from "next-shared/src/models/AppointmentType";

export const useAppointmentTypes = (
  locationSlug?: string,
  filter?: string[],
): QueryResult<AppointmentType[], Error> => {
  const client = useClient();

  return useQuery(["appointmentTypes", locationSlug], async () => {
    const appointments = await client.bookings.retrieveAppointmentTypes(
      locationSlug,
    );
    appointments.filter((apt) => !filter || filter.indexOf(apt.slug) > -1);
    return appointments;
  });
};
