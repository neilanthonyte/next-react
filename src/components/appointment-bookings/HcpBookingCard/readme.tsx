import * as React from "react";
import { useMemo, useState } from "react";

import { HcpBookingCard } from ".";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { Hcp } from "next-shared/src/models/Hcp";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { ConfigContext } from "../../../contexts/ConfigContext";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { BookingProvider } from "../BookingProvider";

const Inner: React.FC = () => {
  const { setHcp, hcps: _hcps } = useRequiredContext(BookingContext);
  const [hcp, _setHcp] = useState<Hcp>();
  const [appointmentType, setAppointmentType] = useState<AppointmentType>();

  // allows us to switch between mock & real clients.
  const { config } = useRequiredContext(ConfigContext);
  const hcps = useMemo(
    () => (config.useRealClient ? _hcps : mockHcps),
    [_hcps, config],
  );

  const setSelected = (h: Hcp) => {
    setHcp(h);
    _setHcp(h);
  };

  const setApptType = (a: AppointmentType) => {
    setAppointmentType(a);
  };

  return (
    <>
      {(hcps || []).map((hcp) => (
        <HcpBookingCard
          key={hcp.slug}
          hcp={hcp}
          onSelectHcp={setSelected}
          onSelectAppointmentType={setApptType}
          showAppointmentTypes={true}
          showSlots={true}
        />
      ))}
      <div className="debug">
        <pre>{JSON.stringify(hcp, null, 2)}</pre>
        <pre>{JSON.stringify(appointmentType, null, 2)}</pre>
      </div>
    </>
  );
};

export const Demo = () => (
  <NextAppHandlerWeb>
    <BookingProvider>
      <Inner />
    </BookingProvider>
    <ul>
      <li>
        Add <code>?useRealClient=</code>{" "}
        <a href={addParamsToUrl({ useRealClient: true })}>(add now)</a>
        <a href={addParamsToUrl({ useRealClient: undefined })}>(remove now)</a>
      </li>
      <li>
        Add <code>?debugClientMethodsError=</code>{" "}
        <a
          href={addParamsToUrl({
            debugClientMethodsError: ["bookings.retrieveSlots"],
          })}
        >
          (add now)
        </a>
        <a href={addParamsToUrl({ debugClientMethodsError: undefined })}>
          (remove now)
        </a>
      </li>
    </ul>
  </NextAppHandlerWeb>
);
