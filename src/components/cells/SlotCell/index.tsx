import * as React from "react";
import moment from "moment";

import {
  Cell,
  CellDescription,
  ICellAction,
  CellHeader,
} from "../../structure/Cell";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { useMemo } from "react";
import { EAppointmentStepIcons } from "../../../helpers/stepIcons";

interface ISlotCellProps {
  slot: ISlotWithHcp;
  actions?: ICellAction[];
}

/**
 * Renders minimal information about a given slot
 */
export const SlotCell: React.FC<ISlotCellProps> = ({ slot, actions }) => {
  const apptTime = useMemo(
    () =>
      moment(slot.start).format("h:mma") +
      " to " +
      moment(slot.end).format("h:mma"),
    [slot],
  );

  const apptLength = useMemo(
    () =>
      moment.duration(moment(slot.end).diff(moment(slot.start))).asMinutes() +
      " minutes",
    [slot],
  );

  const appDay = useMemo(
    () => moment(slot.start).format("dddd, MMMM Do YYYY"),
    [slot],
  );

  return (
    <Cell decorationIcon={EAppointmentStepIcons.Slot} actions={actions}>
      <CellHeader>{apptTime}</CellHeader>
      <CellDescription>{appDay}</CellDescription>
    </Cell>
  );
};
