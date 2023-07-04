import * as React from "react";
import { useState } from "react";

import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { mockHcps } from "next-shared/src/mockData/mockHcps";

import { addParamsToUrl } from "../../helpers/addParamsToUrl";
import { BookingHandlerDebug } from "../../components/appointment-bookings/BookingProvider/readme";
import { useDebug } from "../../debug/DemoWrapper";
import { useConfig } from "../../hooks/core/useConfig";

import { BookingWidget } from ".";

export const AppointmentBookingAppDebug = () => {
  return (
    <>
      <h4>Appointment booking app debug</h4>
      <ul>
        <li>
          Guest mode <code>?guest=true</code>{" "}
          <a href={addParamsToUrl({ guest: true })}>(add now)</a>
          <a href={addParamsToUrl({ guest: false })}>(remove now)</a>
        </li>
        <li>
          Add <code>?preselection=</code>{" "}
          <a href={addParamsToUrl({ preselection: 1 })}>(add now)</a>
        </li>
        <li>
          Add <code>?callbacks=</code>{" "}
          <a href={addParamsToUrl({ callbacks: 1 })}>(add now)</a>
        </li>
        <li>
          Add <code>?onBack=</code>{" "}
          <a href={addParamsToUrl({ onBack: 1 })}>(add now)</a>{" "}
          <a href={addParamsToUrl({ onBack: undefined })}>(remove now)</a>
        </li>
      </ul>
    </>
  );
};

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "BookingWidget",
      scenario: "standard",
    },
    setSessionDebug: true,
  });

  const urlParams = urlParamsToObject();
  const config = useConfig();

  const [callback, setCallback] = useState<string>();
  const success = (loc: string) => setCallback(loc);
  const complete = () => setCallback("Complete");

  if (config.useRealClient && urlParams.preselection) {
    console.warn("preselection not supported with real client currently");
  }

  const hasPreselection = !config.useRealClient && urlParams.preselection;
  const locationSlug = hasPreselection ? mockNextLocations[0].slug : undefined;
  const hcpSlug = hasPreselection ? mockHcps[0].slug : undefined;
  const appointmentTypeSlug = hasPreselection
    ? mockHcps[0].appointmentTypeSlugs[0]
    : undefined;

  return (
    <BookingWidget
      guestMode={urlParams.guest === true}
      locationSlug={locationSlug}
      hcpSlug={hcpSlug}
      appointmentTypeSlug={appointmentTypeSlug}
      onBookingSuccess={success}
      onCompleteDismiss={complete}
      backLink={
        urlParams.back
          ? { path: urlParams.back.toString(), label: "Get me out of here!" }
          : null
      }
      onBack={
        urlParams.onBack
          ? () => {
              alert("onBack called!");
              location.reload();
            }
          : null
      }
    >
      <div className="debug">
        <p>Callback: {JSON.stringify(callback, null, 2)}</p>
        <AppointmentBookingAppDebug />

        <BookingHandlerDebug />
        <p>
          Back path (set via <code>?back=</code>{" "}
          <a href={addParamsToUrl({ back: "/missing" })}>add now</a>)
        </p>
      </div>
    </BookingWidget>
  );
};
