import * as React from "react";
import { useMemo } from "react";

import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";

import { useAppointmentTypes } from "../../../hooks/useAppointmentTypes";
import { AppointmentWithDetails } from "../AppointmentWithDetails";
import { LoadingBlock } from "../../structure/LoadingBlock";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { computeAppointmentWithDetailsPlaceholder } from "../../../helpers/computeAppointmentWithDetailsPlaceholder";
const css = cssComposer(styles, "AppointmentsWithDetailsList");

export interface IAppointmentsWithDetailsListProps {
  appointmentsWithDetails: IAppointmentWithDetails[];
  onFormSaveSuccess?: () => any;
  onCancelAppointment?: (ehrAppointmentId: string) => any;
}

/**
 * Component rendering list of given appointments with details
 */
export const AppointmentsWithDetailsList: React.FC<
  IAppointmentsWithDetailsListProps
> = ({ appointmentsWithDetails, onFormSaveSuccess, onCancelAppointment }) => {
  const { data: appointmentTypes, ...appointmentRest } = useAppointmentTypes();

  // ensure all appointments are a set up to show either their forms or placeholder forms
  const preppedAppointmentsWithDetails: IAppointmentWithDetails[] =
    useMemo(() => {
      if (!appointmentsWithDetails || !appointmentTypes) {
        return [];
      }
      // we need to create empty observations placeholders if no form was submitted based on the appointment type
      return appointmentsWithDetails.map((apptWithDetails) => {
        return apptWithDetails.forms
          ? apptWithDetails
          : computeAppointmentWithDetailsPlaceholder(
              apptWithDetails,
              appointmentTypes,
            );
      });
    }, [appointmentsWithDetails, appointmentTypes]);

  return (
    <LoadingBlock {...appointmentRest}>
      {preppedAppointmentsWithDetails?.map((a) => (
        <div className={css("appointment")} key={a.appointment.id}>
          <AppointmentWithDetails
            appointmentWithDetails={a}
            onCancelAppointment={onCancelAppointment}
            onFormSaveSuccess={onFormSaveSuccess}
          />
        </div>
      ))}
    </LoadingBlock>
  );
};
