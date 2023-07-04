import * as React from "react";
import { useCallback } from "react";

import { AppointmentType } from "next-shared/src/models/AppointmentType";

import { Card } from "../../structure/Card";
import { CellDescription } from "../../structure/Cell";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { Button } from "../../generic/Button";
import { VStack } from "../../structure/VStack";
import { AppointmentTypeDetails } from "../AppointmentTypeDetails";
import { Badge } from "../../generic/Badge";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { Disable } from "../../generic/Disable";
import { Resource } from "../../generic/Resource";
import { SlotList } from "../../appointment-bookings/SlotList";

export interface IAppointmentTypeCardProps {
  type: AppointmentType;
  onClick?: (type: AppointmentType) => any;
  slots?: ISlotWithHcp[];
  onSelectSlot?: (slot: ISlotWithHcp) => any;
}

export const AppointmentTypeCard: React.FC<IAppointmentTypeCardProps> = ({
  type,
  onClick,
  slots,
  onSelectSlot,
}) => {
  const { label, description } = type;

  const selectAppointmentType = useCallback(() => {
    onClick && onClick(type);
  }, [onClick]);

  return (
    <Disable
      disabled={!!type.disabledReason}
      message={`This appointment type is not available to you: ${type.disabledReason}`}
    >
      <Card data-test="appointment-type-card" onClick={selectAppointmentType}>
        {/* HACK quick solution to put hard borders and separate cards content */}
        <Resource>
          <VStack>
            <div>
              <h4>
                {label}{" "}
                {type.patientType === "new" && (
                  <small>
                    <Badge
                      variant={TColorVariants.Info}
                      size={EStandardSizes.Small}
                    >
                      For new patients
                    </Badge>
                  </small>
                )}
              </h4>
              <AppointmentTypeDetails type={type} />
              {description && description.length ? (
                <CellDescription>{description}</CellDescription>
              ) : null}
            </div>
            {slots ? (
              <SlotList
                slots={slots}
                showHcpHint={true}
                onSelection={onSelectSlot}
              />
            ) : null}
            {!!onClick && slots && (
              <div>
                <Button onClick={selectAppointmentType}>
                  Find another time...
                </Button>
              </div>
            )}
          </VStack>
        </Resource>
      </Card>
    </Disable>
  );
};
