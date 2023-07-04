import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import {
  SideBar,
  SideBarTitle,
  SideBarHeader,
  SideBarBody,
} from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
} from "../../structure/SideBarSection";

import {
  TableOfContents,
  TableOfContentsItem,
} from "../../structure/TableOfContents";

export interface IProfileMenu extends RouteComponentProps {
  baseUrl?: string;
  showDemographics?: boolean;
  showNotes?: boolean;
  showAppointments?: boolean;
}

const ProfileMenu: React.FC<IProfileMenu> = ({
  baseUrl = "/profile",
  showDemographics = false,
  showNotes = false,
  showAppointments = false,
}) => {
  return (
    <SideBar>
      <SideBarHeader>
        <SideBarTitle>Profile</SideBarTitle>
      </SideBarHeader>
      <SideBarBody>
        <SideBarSection>
          <SideBarSectionBody>
            <TableOfContents>
              {showDemographics && (
                <TableOfContentsItem href={`${baseUrl}#demographics`}>
                  Contact details
                </TableOfContentsItem>
              )}
              <TableOfContentsItem href={`${baseUrl}#lifestyle`}>
                Lifestyle
              </TableOfContentsItem>
              <TableOfContentsItem href={`${baseUrl}#forms`}>
                Reason for visit
              </TableOfContentsItem>
              {showNotes && (
                <TableOfContentsItem href={`${baseUrl}#notes`}>
                  Notes
                </TableOfContentsItem>
              )}
              {showAppointments && (
                <TableOfContentsItem href={`${baseUrl}#appointments`}>
                  Appointments
                </TableOfContentsItem>
              )}
            </TableOfContents>
          </SideBarSectionBody>
        </SideBarSection>
      </SideBarBody>
    </SideBar>
  );
};

export const ProfileMenuConnected = withRouter(ProfileMenu);
export default ProfileMenuConnected;
