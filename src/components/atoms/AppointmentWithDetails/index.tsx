import * as React from "react";
import { useCallback, useState } from "react";
import moment from "moment";

import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { AppointmentCell } from "../../cells/AppointmentCell";
import { HcpCell } from "../../cells/HcpCell";
import { LocationCell } from "../../cells/LocationCell";
import { AltButton } from "../../generic/Button";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { Pager } from "../Pager";
import { VStack } from "../../structure/VStack";
import { AppointmentFormObservation } from "../AppointmentFormObservation";
const css = cssComposer(styles, "AppointmentWithDetails");

export interface IAppointmentWithDetailsProps {
  appointmentWithDetails: IAppointmentWithDetails;
  onCancelAppointment?: (ehrAppointmentId: string | void) => Promise<void>;
  onFormSaveSuccess?: () => unknown;
}

/**
 * Component rendering an appointment with related details
 */
export const AppointmentWithDetails: React.FC<IAppointmentWithDetailsProps> = ({
  appointmentWithDetails,
  onFormSaveSuccess,
  onCancelAppointment,
}) => {
  const { appointment, hcp, location, forms, payment } = appointmentWithDetails;

  const renderAppointmentCancellation = useCallback(() => {
    if (!onCancelAppointment) return null;

    // strip timezone for safety
    const momentAppointmentStart = moment(appointment.start.split("+")[0]);
    const cancellationHours = location?.cancellationHours || 24;
    const hoursUntilAppointment =
      momentAppointmentStart.diff(moment()) / 1000 / 60 / 60;

    const link = location?.contactNumber && (
      <>
        on{" "}
        <a href={`tel:${location.contactNumber}`}>{location.contactNumber}</a>{" "}
      </>
    );

    if (hoursUntilAppointment < cancellationHours) {
      return (
        <p className={css("info", "item")}>
          You cannot cancel within {cancellationHours} hours of the appointment
          date. Please contact your clinic {link}
          if you require further assistance
        </p>
      );
    }

    return (
      <div className={css("item")}>
        <AltButton onClick={() => onCancelAppointment(appointment.id)}>
          Cancel appointment
        </AltButton>
      </div>
    );
  }, [appointment, location]);

  const [index, setIndex] = useState<number>(0);
  const form = Array.isArray(forms) ? forms[index] : null;

  return (
    <div className={css("")}>
      <div className={css("summary")}>
        {appointment && (
          <div className={css("item")}>
            <AppointmentCell appointment={appointment} hasPayment={!!payment} />
          </div>
        )}
        {location && (
          <div className={css("item")}>
            <LocationCell location={location} />
          </div>
        )}
        {hcp && (
          <div className={css("item")}>
            <HcpCell hcp={hcp} />
          </div>
        )}
        {renderAppointmentCancellation()}
      </div>
      {!!form && (
        <div className={css("detail")}>
          <VStack size="compact">
            {forms.length > 1 && (
              <Pager
                pageCount={forms.length}
                index={index}
                onChange={setIndex}
              />
            )}
            <AppointmentFormObservation
              form={form}
              appointmentWithDetails={appointmentWithDetails}
              onFormSaveSuccess={onFormSaveSuccess}
            />
          </VStack>
        </div>
      )}
    </div>
  );
};
