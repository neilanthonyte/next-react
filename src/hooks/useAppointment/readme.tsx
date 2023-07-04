import * as React from "react";

import { mockAppointmentsWithDetails } from "next-shared/src/mockData/mockAppointments";
import { fhirUtil } from "next-shared/src/fhirUtil";

import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { PendingContent } from "../../components/structure/PendingContent";
import { AppointmentWithDetails } from "../../components/atoms/AppointmentWithDetails";
import { ErrorPlaceholder } from "../../components/structure/ErrorPlaceholder";
import { useAppointment } from ".";
import { addParamsToUrl } from "../../helpers/addParamsToUrl";

const ehrAppointmentId = mockAppointmentsWithDetails[0].appointment.id;
const ehrId = fhirUtil(
  mockAppointmentsWithDetails[0].appointment,
).getOriginEhrId();

const Inner = () => {
  const { appointment, isLoading, error, refetch } = useAppointment(
    ehrId,
    ehrAppointmentId,
  );

  return (
    <PendingContent check={!isLoading}>
      {error ? (
        <ErrorPlaceholder
          title="Error retrieving appointment"
          retry={refetch}
        />
      ) : (
        <AppointmentWithDetails appointmentWithDetails={appointment} />
      )}
    </PendingContent>
  );
};

export const DemoStandard = () => {
  return (
    <div data-test="useAppointment-scenario-standard">
      <NextAppHandlerWeb>
        <div data-test="component">
          <Inner />
        </div>
        <div className="debug">
          <h4>Error</h4>
          <a
            href={addParamsToUrl({
              debugClientMethodsError: ["appointments.retrieveAppointment"],
            })}
          >
            Add ?debugClientMethodsError
          </a>
          {" - "}
          <a
            href={addParamsToUrl({
              debugClientMethodsError: [],
            })}
          >
            Remove ?debugClientMethodsError
          </a>
        </div>
      </NextAppHandlerWeb>
    </div>
  );
};
