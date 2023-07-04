import * as React from "react";
import { useState, useEffect } from "react";

import {
  IAppointmentBookingPreselection,
  BookingContext,
} from "../../../contexts/AppointmentBookingContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { mockAppointmentTypes } from "next-shared/src/mockData/mockAppointmentTypes";

interface IPreselectionDebugProps {
  onChange: (selection: IAppointmentBookingPreselection) => void;
}

export const BookingPreselectionDebug: React.FC<IPreselectionDebugProps> = ({
  onChange,
}) => {
  const [locationSlug, setLocationSlug] = useState<string>();
  const [hcpSlug, setHcpSlug] = useState<string>();
  const [appointmentTypeSlug, setAppointmentTypeSlug] = useState<string>();

  useEffect(() => {
    if (!locationSlug && !hcpSlug && !appointmentTypeSlug) return;
    const preselection = {
      location: locationSlug,
      hcp: hcpSlug,
      appointmentType: appointmentTypeSlug,
    };
    onChange(preselection);
  }, [locationSlug, hcpSlug, appointmentTypeSlug]);

  const { locations, appointmentTypes, hcps } =
    useRequiredContext(BookingContext);
  return (
    <>
      <li>
        Via URL
        <br />
        Add <code>?location=</code>{" "}
        <a href={addParamsToUrl({ location: mockNextLocations[0].slug })}>
          (add now)
        </a>
        <br />
        Add <code>?hcp=</code>{" "}
        <a href={addParamsToUrl({ hcp: mockHcps[0].slug })}>(add now)</a>
        <br />
        Add <code>?appointmentType=</code>
        <a
          href={addParamsToUrl({
            appointmentType: mockAppointmentTypes[0].slug,
          })}
        >
          (add now)
        </a>
      </li>
      <li>
        Manual
        <br />
        Clinic:{" "}
        {(locations || []).map((l) => (
          <a key={l.slug} onClick={() => setLocationSlug(l.slug)}>
            [{l.title}]{" "}
          </a>
        ))}
        <br />
        HCP:{" "}
        {(hcps || []).map((l) => (
          <a key={l.slug} onClick={() => setHcpSlug(l.slug)}>
            [{l.title}]{" "}
          </a>
        ))}
        <br />
        Appointment type:{" "}
        {(appointmentTypes || []).map((l) => (
          <a key={l.slug} onClick={() => setAppointmentTypeSlug(l.slug)}>
            [{l.label}]{" "}
          </a>
        ))}
      </li>
    </>
  );
};
