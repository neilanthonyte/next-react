import * as React from "react";
import { useMemo, useState } from "react";
import { keyBy as _keyBy } from "lodash";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { VStack } from "../../structure/VStack";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { AppointmentTypeCard } from "../../atoms/AppointmentTypeCard";

export interface IAppointmentTypesProps {}

/**
 * Component rendering a list of available appointment types to pick from
 */
export const AppointmentTypes: React.FC<IAppointmentTypesProps> = ({}) => {
  const { appointmentTypes, setAppointmentType, location } =
    useRequiredContext(BookingContext);

  const [showAllAppointments, setShowAllAppointments] = useState(false);

  // key appointment types by slug for faster retrieval.
  const appointmentTypesKeyedBySlug = useMemo(
    () => _keyBy(appointmentTypes, (appointmentType) => appointmentType.slug),
    [appointmentTypes],
  );

  // map location appointment type slugs to their corresponding appointment
  // type.
  const locationAppointmentTypes = useMemo(
    () =>
      location
        ? location.appointmentTypeSlugs
            .map((slug) => appointmentTypesKeyedBySlug[slug])
            // remove falsy and disabled appointment types
            .filter((x) => !!x && !x.disabledReason)
        : appointmentTypes,
    [location, appointmentTypesKeyedBySlug, appointmentTypes],
  );

  // appointment types not on the location
  const appointmentTypesNotOnLocation = useMemo(
    () =>
      appointmentTypes
        .filter(
          (appointmentType) =>
            !locationAppointmentTypes.includes(appointmentType),
        )
        .sort((a, b) => {
          return (
            // sort enabled above disabled
            Number(!!a.disabledReason) - Number(!!b.disabledReason) ||
            // if both enabled/disabled, sort alphabetically
            a.label.localeCompare(b.label)
          );
        }),
    [appointmentTypes, locationAppointmentTypes],
  );

  // If there are no location appointment types, hide 'see more' button
  const showSeeMoreButton = useMemo(
    () => locationAppointmentTypes.length,
    [locationAppointmentTypes],
  );

  return (
    <div data-test="appointment-type-selection">
      <VStack>
        {showSeeMoreButton &&
          locationAppointmentTypes.map((type) => (
            <AppointmentTypeCard
              key={type.slug}
              type={type}
              onClick={setAppointmentType}
            />
          ))}
        {showSeeMoreButton && (
          <div style={{ textAlign: "center" }}>
            <a onClick={() => setShowAllAppointments((x) => !x)}>{`See ${
              showAllAppointments ? "less" : "more"
            }`}</a>
          </div>
        )}
        {(!showSeeMoreButton || showAllAppointments) &&
          appointmentTypesNotOnLocation.map((type) => (
            <AppointmentTypeCard
              key={type.slug}
              type={type}
              onClick={setAppointmentType}
            />
          ))}
      </VStack>
    </div>
  );
};
