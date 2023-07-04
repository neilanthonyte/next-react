import * as React from "react";
import { useCallback, useContext, useMemo } from "react";

import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { Currency } from "../../generic/Currency";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useLocations } from "../../../hooks/content/useLocations";

export interface IAppointmentTypeDetailsProps {
  type: AppointmentType;
}

export const AppointmentTypeDetails: React.FC<IAppointmentTypeDetailsProps> = ({
  type,
}) => {
  const { locations } = useLocations();
  const {
    lengthMinutes,
    lengthOverrides,
    price,
    rebate,
    deposit,
    locationSlug,
  } = type;

  // optionally adjust based on the patient
  const { patientType = null } = useContext(BookingContext);

  // ensure appointment length shown to patient includes any applicable length
  // overrides.
  const appointmentLength = useMemo(() => {
    if (patientType === "new" && lengthOverrides.newPatient) {
      return lengthMinutes + lengthOverrides.newPatient;
    } else {
      return lengthMinutes;
    }
  }, [lengthMinutes, lengthOverrides, patientType]);

  const locationTitle = useMemo(() => {
    if (!locationSlug) {
      return null;
    }
    const location = locations.find((l) => l.slug === locationSlug);
    if (!location) {
      return null;
    }

    return location.title;
  }, [locationSlug, locations]);

  const noCost = rebate === 0 && price === 0;
  const getCost = useCallback(() => {
    if (noCost) {
      return "";
    }
    if (type.isBulkBilled()) {
      return " / Bulk billed";
    }
    return (
      <>
        {" / "}
        {price > 0 && <Currency>{price}</Currency>}
        {deposit > 0 && deposit !== price && (
          <>
            {" "}
            (<Currency>{deposit}</Currency> deposit)
          </>
        )}
        {deposit > 0 && deposit === price && " (Upfront payment)"}
        {!!rebate && (
          <>
            {" "}
            (<Currency>{rebate}</Currency> rebate)
          </>
        )}
      </>
    );
  }, [type]);

  return (
    <>
      {locationTitle && (
        <>
          <label>{locationTitle}</label>
          <br />
        </>
      )}
      <label>
        {/* {type.patientType === "new" && (
          <span>
            <Badge variant={TColorVariants.Info} size={EStandardSizes.Small}>
              New patients
            </Badge>{" "}
          </span>
        )} */}
        {appointmentLength} mins {getCost()}
      </label>
    </>
  );
};
