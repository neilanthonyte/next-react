import * as React from "react";

import { Hcp } from "next-shared/src/models/Hcp";
import { AppointmentType } from "next-shared/src/models/AppointmentType";
import { Card, CardBody, CardSecondaryContent } from "../../structure/Card";
import {
  Cell,
  CellHeader,
  CellType,
  CellDescription,
} from "../../structure/Cell";
import { VStack } from "../../structure/VStack";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { BlockButton } from "../../generic/Button";
import { HStack } from "../../structure/HStack";
import { HcpAppointmentTypeWithSlots } from "../HcpAppointmentTypeWithSlots";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";

export interface IHcpBookingCardProps {
  hcp: Hcp;
  /** Toggle the appointment types off (if available) */
  showAppointmentTypes: boolean;
  /** Called when the card is clicked */
  onSelectCard?: (hcp: Hcp) => any;
  /** Called when the appointments button is clicked */
  onSelectHcp?: (hcp: Hcp) => any;
  /** Called when an appointment type is clicked */
  onSelectAppointmentType?: (type: AppointmentType) => any;
  showSlots?: boolean;
  onSelectSlot?: (slot: ISlotWithHcp, type: AppointmentType) => any;
  showWebProfileButton?: boolean;
}

/**
 * Component rendering a card with hcp information.
 * Optionally renders available bookable appointment types and slots
 */
export const HcpBookingCard: React.FC<IHcpBookingCardProps> = ({
  hcp,
  showAppointmentTypes,
  onSelectCard,
  onSelectHcp,
  onSelectAppointmentType,
  showSlots,
  onSelectSlot,
  showWebProfileButton = false,
}) => {
  const { hcp: selectedHcp, appointmentTypes } =
    useRequiredContext(BookingContext);
  const { profileImage, title, description, bioShort } = hcp;

  const selectCard = onSelectCard ? () => onSelectCard(hcp) : null;
  const selectHcp = onSelectHcp ? () => onSelectHcp(hcp) : null;

  const { appointmentTypeSlugs } = hcp;

  const hasAppointments =
    !!appointmentTypes &&
    Array.isArray(appointmentTypeSlugs) &&
    appointmentTypeSlugs.length > 0;

  const hcpAppointments = !hasAppointments
    ? []
    : // ensure HCP based ordering
      hcp.appointmentTypeSlugs.map((slug) =>
        appointmentTypes.find((appt) => appt.slug === slug),
      );

  // some appointments on the HCP might not be available if the appointment is private
  const filteredHcpAppointments = hcpAppointments.filter((n) => !!n);

  const enabledAppointments = filteredHcpAppointments.filter(
    (type) => !type.disabledReason,
  );
  const disabledAppointments = filteredHcpAppointments.filter(
    (type) => !!type.disabledReason,
  );

  return (
    <Card onClick={selectCard}>
      <CardBody decorationImage={profileImage.squareMedium}>
        <Cell>
          <CellHeader>{title}</CellHeader>
          <CellType>{description}</CellType>
          <CellDescription>{bioShort}</CellDescription>
          <CellDescription>
            <HStack>
              {hasAppointments && selectHcp ? (
                <BlockButton onClick={selectHcp}>Book now</BlockButton>
              ) : (
                <div />
              )}
              {showWebProfileButton && (
                <BlockButton
                  variant="secondary"
                  to={`/hcps/${hcp.slug}`}
                  forceLink={true}
                >
                  View profile
                </BlockButton>
              )}
            </HStack>
          </CellDescription>
        </Cell>
      </CardBody>
      <CardSecondaryContent show={hcp === selectedHcp}>
        {showAppointmentTypes && hasAppointments && (
          <VStack>
            {enabledAppointments.map((type, index) => {
              return (
                <div
                  key={index}
                  data-title={`appointment-${type.slug}`}
                  data-index={`appointment-${index}`}
                >
                  <HcpAppointmentTypeWithSlots
                    hcp={hcp}
                    appointmentType={type}
                    onSelectAppointmentType={onSelectAppointmentType}
                    showSlots={showSlots}
                    onSelectSlot={(slot) => onSelectSlot(slot, type)}
                  />
                </div>
              );
            })}
            {disabledAppointments.map((type, index) => {
              return (
                <HcpAppointmentTypeWithSlots
                  key={index}
                  hcp={hcp}
                  appointmentType={type}
                  onSelectAppointmentType={onSelectAppointmentType}
                  showSlots={showSlots}
                  onSelectSlot={(slot) => onSelectSlot(slot, type)}
                />
              );
            })}
          </VStack>
        )}
      </CardSecondaryContent>
    </Card>
  );
};
