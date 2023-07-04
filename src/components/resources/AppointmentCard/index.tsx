import * as React from "react";

import { Hcp } from "next-shared/src/models/Hcp";
import { NextLocation } from "next-shared/src/models/NextLocation";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import {
  Resource,
  ResourceAction,
  ResourceActions,
  ResourceBody,
} from "../../generic/Resource";
import { AppointmentCell } from "../../cells/AppointmentCell";
import { LocationCell } from "../../cells/LocationCell";
import { HcpCell } from "../../cells/HcpCell";
import { VStack } from "../../structure/VStack";
import { IBookingWidgetProps } from "../../../entry/BookingWidget";

export interface IAppointmentCardProps {
  appointment: fhir3.Appointment;
  hcp?: Hcp;
  location?: NextLocation;
  onRebookAppoinmtent?: (preselection: Partial<IBookingWidgetProps>) => void;
  layout?: ELayoutVariant;
}

/**
 * Component showing appointment details
 */
export const AppointmentCard = ({
  appointment,
  hcp,
  location,
  onRebookAppoinmtent,
  layout = ELayoutVariant.Standard,
}: IAppointmentCardProps) => {
  const showRebookBtn = typeof onRebookAppoinmtent === "function";
  const showLocationCell = location && layout === ELayoutVariant.Standard;
  const hcpLocation =
    location &&
    layout === ELayoutVariant.Compact &&
    location?.slug === hcp?.worksAt
      ? location
      : null;
  return (
    <Resource>
      <ResourceBody>
        <VStack>
          <AppointmentCell appointment={appointment} />
          {showLocationCell && <LocationCell location={location} />}
          {hcp && <HcpCell hcp={hcp} location={hcpLocation} />}
        </VStack>
      </ResourceBody>
      {showRebookBtn && (
        <ResourceActions>
          <ResourceAction
            onClick={() =>
              onRebookAppoinmtent({
                locationSlug: location?.slug,
                hcpSlug: hcp?.slug,
              })
            }
            variant={"secondary"}
          >
            Book again
          </ResourceAction>
        </ResourceActions>
      )}
    </Resource>
  );
};
