import * as React from "react";
import { useState, useMemo } from "react";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { BookingContext } from "../../../contexts/AppointmentBookingContext";
import { SearchInput } from "../../generic/SearchInput";
import { HcpBookingCard } from "../HcpBookingCard";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { VStack } from "../../structure/VStack";
import { Hcp } from "next-shared/src/models/Hcp";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";

export interface IAppointmentMedicalStaffProps {}

/**
 * Component rendering a searchable list of hcp to select for the appointment booking
 */
export const AppointmentMedicalStaff: React.FC<
  IAppointmentMedicalStaffProps
> = ({}) => {
  const { hcps, hcp, setHcp, setAppointmentType } =
    useRequiredContext(BookingContext);

  const [filter, setFilter] = useState<string>(hcp ? hcp.title : "");

  const filteredHcps = useMemo(
    () =>
      hcps &&
      hcps
        .filter(
          (h: Hcp) =>
            Array.isArray(h.appointmentTypeSlugs) &&
            h.appointmentTypeSlugs.length > 0,
        )
        .filter((h) => {
          const lcHcpTitle = h.title.toLowerCase();
          const lcFilter = filter.toLowerCase();
          return lcHcpTitle.includes(lcFilter) || filter === "";
        }),
    [hcps, filter],
  );

  return (
    <div data-test="hcps-selection">
      <VStack>
        <div data-test="practitioner-search">
          <SearchInput value={filter} onChange={setFilter} />
        </div>
        <div>
          <VStack>
            {(filteredHcps || []).map((h, i) => (
              <div key={h.slug} data-index={i} data-title={h.title}>
                <HcpBookingCard
                  hcp={h}
                  onSelectCard={setHcp}
                  showAppointmentTypes={h === hcp}
                  onSelectAppointmentType={setAppointmentType}
                />
              </div>
            ))}
          </VStack>
        </div>
      </VStack>
    </div>
  );
};
