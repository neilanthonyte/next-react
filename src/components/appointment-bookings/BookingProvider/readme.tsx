import * as React from "react";
import { useState, useEffect } from "react";
import * as _ from "lodash";
import moment from "moment";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import {
  BookingContext,
  IAppointmentBookingPreselection,
} from "../../../contexts/AppointmentBookingContext";
import { useBookingSlots, IDateRange } from "../../../hooks/useBookingSlots";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { NextAppHandlerWeb } from "next-react/src/components/handlers/NextAppHandlerWeb";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import { BookingProvider } from ".";
import { BookingPreselectionDebug } from "../../debug/BookingPreselectionDebug";
import { useConfig } from "../../../hooks/core/useConfig";

export const BookingHandlerDebug: React.FC = () => {
  const {
    // data
    locations,
    appointmentTypes,
    hcps,
    // background
    isAtCovidRisk,
    setIsAtCovidRisk,
    patientType,
    setPatientType,
    // selection
    location,
    setLocation,
    hcp,
    setHcp,
    appointmentType,
    setAppointmentType,
    setSlot,
    patient,
    presentationFormResponse,
    appointmentLength,
    additionalTimeRequired,
    appointmentLengthWithExtensions,
    clear,
    existingCard: appointmentPayment,
  } = useRequiredContext(BookingContext);

  const config = useConfig();

  if (config.debuggingQueries()) {
    return (
      <>
        <h4>Booking Handler Debug</h4>
        <p>Disabling whilst debugging to avoid triggering an error.</p>
      </>
    );
  }

  const groupedTypes = _.groupBy(
    appointmentTypes || [],
    (appointmentTypes) => appointmentTypes.method,
  );

  const [dateRange, setDateRange] = useState<IDateRange>(null);

  const { initDate, data: slots } = useBookingSlots(
    appointmentType,
    dateRange,
    hcp ? hcp.npServicesId : null,
  );

  useEffect(() => {
    setDateRange(
      initDate
        ? {
            startDate: moment(initDate).startOf("day").format("YYYY-MM-DD"),
            endDate: moment(initDate).endOf("day").format("YYYY-MM-DD"),
          }
        : null,
    );
  }, [initDate]);

  const groupedSlots = _.groupBy(slots, "hcp.npServicesId");

  return (
    <>
      <h4>Booking Handler Debug</h4>
      <ul>
        <li>
          <strong>Actions</strong>
          <br />
          <a onClick={clear}>Clear all</a>
        </li>
        <li>
          <strong>Background</strong>
          <br />
          COVID risk:{" "}
          <a
            onClick={() => setIsAtCovidRisk(true)}
            style={{ fontWeight: isAtCovidRisk === true ? "bold" : null }}
          >
            yes
          </a>
          {" | "}
          <a
            onClick={() => setIsAtCovidRisk(false)}
            style={{ fontWeight: isAtCovidRisk === false ? "bold" : null }}
          >
            no
          </a>
          {" | "}
          <a
            onClick={() => setIsAtCovidRisk(undefined)}
            style={{
              fontWeight: isAtCovidRisk === undefined ? "bold" : null,
            }}
          >
            unknown
          </a>{" "}
          (set via <code>?isAtCovidRisk=</code>{" "}
          <a href={addParamsToUrl({ isAtCovidRisk: 0 })}>add now</a>)
          <br />
          Patient type:{" "}
          <a
            onClick={() => setPatientType("returning")}
            style={{
              fontWeight: patientType === "returning" ? "bold" : null,
            }}
          >
            returning
          </a>
          {" | "}
          <a
            onClick={() => setPatientType("new")}
            style={{ fontWeight: patientType === "new" ? "bold" : null }}
          >
            new
          </a>
          {" | "}
          <a
            onClick={() => setPatientType(undefined)}
            style={{ fontWeight: patientType === undefined ? "bold" : null }}
          >
            unknown
          </a>
        </li>
        <li>Base time: {appointmentLength}</li>
        <li>Additional time: {additionalTimeRequired}</li>
        <li>Total time: {appointmentLengthWithExtensions}</li>
        <li>
          <strong>Selection</strong>
          <br />
          Location:{" "}
          {(locations || []).map((l, i) => (
            <a
              key={i}
              style={{ fontWeight: l === location ? "bold" : null }}
              onClick={() => setLocation(l)}
            >
              {l.title}
              {i < locations.length - 1 ? " | " : ""}
            </a>
          ))}
          <br />
          HCP:{" "}
          {(hcps || []).map((h, i) => (
            <a
              key={i}
              style={{ fontWeight: h === hcp ? "bold" : null }}
              onClick={() => setHcp(h)}
            >
              {h.title}
              {i < hcps.length - 1 ? " | " : ""}
            </a>
          ))}
          <br />
          Appointments:{" "}
          {Object.keys(groupedTypes).map((t: string) => (
            <span key={t}>
              [{t.toUpperCase()}:{" "}
              {groupedTypes[t].map((a, i) => (
                <a
                  key={i}
                  style={{
                    fontWeight: a === appointmentType ? "bold" : null,
                  }}
                  onClick={() => setAppointmentType(a)}
                >
                  {a.label}
                  {i < groupedTypes[t].length - 1 ? " | " : ""}
                </a>
              ))}
              ]{" "}
            </span>
          ))}
          <br />
          Slots:{" "}
          {Object.keys(groupedSlots).map((hcp: string, i) => (
            <span key={`${hcp}${i}`}>
              [{hcp.toUpperCase()}
              {": "}
              {groupedSlots[hcp].map((s, i) => (
                <a key={i} onClick={() => setSlot(s)}>
                  {moment(s.start).format("h:mma MM/YY")}
                  {i < groupedSlots[hcp].length - 1 ? " | " : ""}
                </a>
              ))}
              ]{" "}
            </span>
          ))}
          <br />
        </li>
        <li>
          Patient: <pre>{JSON.stringify(patient, null, 2)}</pre>
        </li>
        <li>
          Presentation form response:
          <pre>{JSON.stringify(presentationFormResponse, null, 2)}</pre>
        </li>
        <li>
          Appointment payment
          <pre>{JSON.stringify(appointmentPayment, null, 2)}</pre>
        </li>
      </ul>
    </>
  );
};

const urlParams = urlParamsToObject();

export const Demo = () => {
  const [preselection, setPreselection] =
    useState<IAppointmentBookingPreselection>(urlParams);

  const covidRisk =
    "isAtCovidRisk" in urlParams ? urlParams.isAtCovidRisk === "1" : undefined;

  return (
    <NextAppHandlerWeb>
      <BookingProvider
        preselection={preselection}
        covidRisk={covidRisk}
        key={JSON.stringify(preselection)}
      >
        <BookingHandlerDebug />
        <div className="debug">
          <BookingPreselectionDebug onChange={setPreselection} />
        </div>
      </BookingProvider>
    </NextAppHandlerWeb>
  );
};
