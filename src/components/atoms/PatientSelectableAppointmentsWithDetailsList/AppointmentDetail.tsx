import * as React from "react";
import { FC, useCallback, useContext, useMemo } from "react";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import { EEhrKey } from "next-shared/src/types/EEhrKey";
import { isUpcoming } from "next-shared/src/helpers/isUpcoming";
import { useSendBookingConfirmation } from "../../../hooks/notifications/useSendBookingConfirmation";
import { WarningMessage } from "../../generic/Message";
import { Button } from "../../generic/Button";
import { ObservationWithForms } from "./ObservationWithForms";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { ReviewContext } from "../../../contexts/ReviewContext";
import { EhrContext } from "../../../contexts/EhrContext/EhrContext";

const css = cssComposer(styles, "AppointmentDetails");

interface IAppointmentDetailProps {
  appointmentWithDetails: IAppointmentWithDetails;
}

export const AppointmentDetail: FC<IAppointmentDetailProps> = ({
  appointmentWithDetails,
}) => {
  // forms includes all forms, transcribable and not
  const { forms } = appointmentWithDetails;
  const { sendBookingConfirmation } = useSendBookingConfirmation();
  const { transcribeResources } = useContext(ReviewContext);
  const { underlyingEhr } = useContext(EhrContext);

  const canSendBookingConfirmation = useMemo(
    () =>
      underlyingEhr === EEhrKey.HelloHealth &&
      isUpcoming(appointmentWithDetails.appointment.end) &&
      !transcribeResources, // HACK for now, transcribe and booking confirmation are mutually exclusive
    [appointmentWithDetails.appointment.end],
  );

  const handleSendBookingConfirmation = useCallback(
    () => sendBookingConfirmation(appointmentWithDetails.appointment.id),
    [appointmentWithDetails.appointment.id, sendBookingConfirmation],
  );

  return (
    <div className={css("container")}>
      <div className={css("observation")}>
        {forms ? (
          <ObservationWithForms
            appointmentWithDetails={appointmentWithDetails}
          />
        ) : (
          <WarningMessage>{`No appointment form available`}</WarningMessage>
        )}
      </div>
      {canSendBookingConfirmation && (
        <Button
          className={css("button")}
          variant="secondary"
          isBlock={true}
          onClick={handleSendBookingConfirmation}
        >
          Send Confirmation Email
        </Button>
      )}
    </div>
  );
};
