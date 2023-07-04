import * as React from "react";

import { Card, CardBody, CardFooter } from "../../structure/Card";
import { Cell, CellHeader, CellDescription } from "../../structure/Cell";
import { BlockButton } from "../../generic/Button";
import { nextPaths } from "../../views/routes";

export interface IAppointmentBookingToolProps {}

export const AppointmentBookingTool: React.FC<
  IAppointmentBookingToolProps
> = ({}) => {
  return (
    <Card>
      <CardBody>
        <Cell decorationIcon="appointments">
          <CellHeader>Internal bookings</CellHeader>
          <CellDescription>
            Book appointments on behalf of a patient.
          </CellDescription>
        </Cell>
      </CardBody>
      <CardFooter>
        <BlockButton to={nextPaths.appointments}>Book appointment</BlockButton>
      </CardFooter>
    </Card>
  );
};
