import React, { useMemo } from "react";
import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirAppointmentUtil } from "next-shared/src/fhirUtil/utilClasses/FhirAppointmentUtil";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { IReviewableObservation } from "next-shared/src/types/IReviewableObservation";

import { Cell, CellDescription, CellHeader } from "../../structure/Cell";
import CircularIcon from "../../generic/CircularIcon";
import { Button } from "../../generic/Button";
import { SuccessBadge } from "../../generic/Badge";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";

const css = cssComposer(styles, "AppointmentCell");

export interface IAppointmentCellProps
  extends Pick<IReviewableObservation, "onTranscribe"> {
  appointment: fhir3.Appointment;
  hasPresentationForm?: boolean;
  hasPayment?: boolean;
}

/**
 * Renders minimal information about a given appointment
 */
export const AppointmentCell: React.FC<IAppointmentCellProps> = ({
  appointment,
  onTranscribe,
  hasPresentationForm,
  hasPayment = false,
}) => {
  const { appointmentType, start, time } = useMemo(() => {
    const momentStart = moment(appointment.start);
    const now = moment();
    return {
      appointmentType:
        fhirUtil<FhirAppointmentUtil>(
          appointment,
        ).getNextAppointmentTypeLabel(),
      start: momentStart.isSame(now, "dates")
        ? "Today"
        : momentStart.format("DD MMMM YYYY"),
      time: momentStart.format("h:mma"),
    };
  }, [appointment]);

  return (
    <div className={css("")}>
      <Cell decorationIcon="appointments">
        <CellHeader>{appointmentType}</CellHeader>

        <CellDescription>{[start, time].join(" - ")}</CellDescription>
        {hasPayment && (
          <div className={css("payment")}>
            <SuccessBadge size="sm">Payment details available</SuccessBadge>
          </div>
        )}
      </Cell>
      {onTranscribe && (
        <Button size={EStandardSizes.Small} onClick={onTranscribe}>
          Transcribe
        </Button>
      )}
      {typeof hasPresentationForm !== "undefined" && (
        <div className={css("decoration")}>
          <CircularIcon
            name="certificate"
            size={EStandardSizes.Small}
            variant={
              hasPresentationForm
                ? TColorVariants.Success
                : TColorVariants.Warning
            }
          />
        </div>
      )}
    </div>
  );
};
