import * as React from "react";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import {
  SidePanelPage,
  SidePanelPageHeader,
  SidePanelPageBody,
  SidePanelPageTitle,
} from "../../structure/SidePanelPage";
import { PropertyGrid } from "../../generic/PropertyGrid";
import {
  TableHeader,
  TableHeaderCell,
  TableRow,
  Table,
  TableBody,
  TableCell,
} from "../../structure/Table";
import { useAppointmentTypes } from "../../../hooks/useAppointmentTypes";
import { useHcps } from "../../../hooks/content/useHcps";
import {
  SidePanelPageSection,
  SidePanelPageSectionHeader,
  SidePanelPageSectionTitle,
  SidePanelPageSectionBody,
} from "../../structure/SidePanelPageSection";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ImgBlock } from "../../generic/ImgBlock";
import { HStack, Solid } from "../../structure/HStack";
import { useFetchStaffMembers } from "../../../hooks/useFetchStaffMembers";
import { MedicalStaffMember } from "next-shared/src/models/MedicalStaffMember";

export interface IStaffMemberPanelProps {}

export const StaffMemberPanel: React.FC<IStaffMemberPanelProps> = ({}) => {
  const { id } = useParams<any>();

  const { hcps: allHcps } = useHcps();
  const { data: allAppointmentTypes } = useAppointmentTypes();
  const { data: staffMembers } = useFetchStaffMembers();

  const staff = useMemo(() => {
    return (staffMembers || []).find((h) => h.staffMemberId === id);
  }, [allHcps]);

  const hcp = useMemo(() => {
    return (allHcps || []).find((h) => h.npServicesId === id);
  }, [allHcps]);

  useEffect(() => {
    if (!allAppointmentTypes || !hcp) {
      return;
    }
    hcp.attachAppointmentDetails(allAppointmentTypes);
  }, [allAppointmentTypes, hcp]);

  const isReady = staff !== null;

  const details = useMemo(() => {
    const data: { [key: string]: any } = {};
    if (staff instanceof MedicalStaffMember) {
      data["Next ID"] = staff.staffMemberId;
      data["Helix ID"] = staff.ehrStaffMemberId;
      data["HUB ID"] = staff.ehrStaffMemberIdAlt;
    }
    if (hcp) {
      data["Role"] = hcp.role ? hcp.role.label : "none";
    }
    return data;
  }, [staff, hcp]);

  const profileImage = hcp?.profileImage?.squareMedium;
  const appointmentDetails = hcp?.appointmentTypes || [];
  const title = hcp ? hcp.title : staff ? staff.email : "";

  return (
    <LoadingBlock isLoading={!isReady}>
      {isReady && (
        <SidePanelPage>
          <SidePanelPageHeader>
            <SidePanelPageTitle>{title}</SidePanelPageTitle>
          </SidePanelPageHeader>
          <SidePanelPageBody>
            <SidePanelPageSection>
              <SidePanelPageSectionBody>
                <HStack>
                  <PropertyGrid data={details} />
                  {!!profileImage && (
                    <Solid>
                      <ImgBlock
                        size="md"
                        squareRatio={true}
                        src={profileImage}
                      />
                    </Solid>
                  )}
                </HStack>
              </SidePanelPageSectionBody>
            </SidePanelPageSection>
            {appointmentDetails && (
              <SidePanelPageSection>
                <SidePanelPageSectionHeader>
                  <SidePanelPageSectionTitle>
                    Appointments
                  </SidePanelPageSectionTitle>
                </SidePanelPageSectionHeader>
                <SidePanelPageSectionBody>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Helix ID</TableHeaderCell>
                        <TableHeaderCell>Duration</TableHeaderCell>
                        <TableHeaderCell>Cost</TableHeaderCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointmentDetails.map((appt) => (
                        <TableRow key={appt.slug}>
                          <TableCell>{appt.label}</TableCell>
                          <TableCell>{appt.helixId}</TableCell>
                          <TableCell>{appt.lengthMinutes}</TableCell>
                          <TableCell>{appt.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </SidePanelPageSectionBody>
              </SidePanelPageSection>
            )}
          </SidePanelPageBody>
        </SidePanelPage>
      )}
    </LoadingBlock>
  );
};
