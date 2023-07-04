import * as React from "react";
import { useState } from "react";

import {
  CellHeader,
  CellDescription,
  Cell,
  CellType,
} from "../../structure/Cell";
import { Card, CardBody, CardSecondaryContent } from "../../structure/Card";
import { Hcp } from "next-shared/src/models/Hcp";
import { Button, AltButton } from "../../generic/Button";
import { Grid } from "../../structure/Grid";
import { IAppointment } from "next-shared/src/types/IAppointment";
import { useAppointmentTypes } from "../../../hooks/useAppointmentTypes";

export interface IHcpCardProps {
  hcp: Hcp;
  onClick?: (args?: any) => any;
  /**
   * Shows a list of appointments.
   */
  showAppointments?: boolean;
  /**
   * Called if the showAppointments prop is true and whenever an appointment is clicked
   */
  onAppointmentSelected?: (appointment: IAppointment) => void;
  /**
   * Renders out the NextAvailableAppointments component, this will
   */
  quickBook?: boolean;
  children?: any;
}

/**
 * @note only showAppointments OR quickBook should be used at a time, not both.
 */
export const HcpCard: React.FC<IHcpCardProps> = ({
  onClick,
  quickBook = true,
  showAppointments = false,
  onAppointmentSelected,
  hcp,
}) => {
  const [showQuickBook, setShowQuickBook] = useState(false);
  const {
    profileImage,
    title,
    description,
    bioShort,
    rating,
    url,
    appointmentTypeSlugs,
  } = hcp;

  const { data: appointmentTypes } = useAppointmentTypes(
    null,
    appointmentTypeSlugs,
  );
  const allowsBookings =
    url &&
    appointmentTypes.filter((apt) => apt.visibility === "public").length > 0;

  return (
    <Card onClick={onClick}>
      <CardBody decorationImage={profileImage.squareMedium}>
        <Cell>
          <div data-test="info-cell">
            <CellHeader>{title}</CellHeader>
            <CellType>
              {rating ? `Rating: ${rating.average.toString()}` : description}
            </CellType>
            <CellDescription>{bioShort}</CellDescription>
          </div>
        </Cell>
        {allowsBookings && (
          <Cell>
            <div data-test="bookings-cell">
              <Grid>
                {allowsBookings && (
                  <Button onClick={() => setShowQuickBook(true)}>
                    Book appointment
                  </Button>
                )}
                {url && <AltButton to={url}>Profile</AltButton>}
              </Grid>
            </div>
          </Cell>
        )}
      </CardBody>
      {/* <CardSecondaryContent show={showQuickBook}>
        {showQuickBook && (
          <NextAvailableAppointment
            mode="practitioner"
            practitioner={hcp}
            appointments={appointments}
            onBookingSuccess={() => {
              // do something
            }}
          />
        )}
      </CardSecondaryContent> */}
      {/* Extra secondary content typically used to show appointment types (like in the booking widget)  */}
      {/* <CardSecondaryContent show={showAppointments}>
        {appointments.map(appointment => {
          return (
            <div data-test="appointment">
              <AppointmentTypeCard
                onClick={() => onAppointmentSelected(appointment)}
                type={appointment}
              />
            </div>
          );
        })}
      </CardSecondaryContent> */}
    </Card>
  );
};
