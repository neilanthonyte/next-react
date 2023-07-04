import * as React from "react";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import {
  ICellAction,
  Cell,
  CellDescription,
  CellHeader,
} from "../../structure/Cell";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { EAppointmentStepIcons } from "../../../helpers/stepIcons";

export interface IAppointmentTypeCellProps {
  appointmentType: AppointmentType;
  actions?: ICellAction[];
}

/**
 * Renders minimal information about a given appointment type
 */
export const AppointmentTypeCell: React.FC<IAppointmentTypeCellProps> = ({
  appointmentType,
  actions,
}) => {
  const { appointmentLengthWithExtensions } =
    useRequiredContext(BookingContext);
  return (
    <Cell
      decorationIcon={EAppointmentStepIcons.AppointmentType}
      actions={actions}
    >
      <CellHeader>{appointmentType.label}</CellHeader>
      <CellDescription>
        {appointmentLengthWithExtensions || appointmentType.lengthMinutes}{" "}
        minutes
      </CellDescription>
    </Cell>
  );
};
