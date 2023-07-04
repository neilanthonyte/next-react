import * as React from "react";

import {
  SideBar,
  SideBarHeader,
  SideBarTitle,
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

export interface IEhrPatientWelcomeSideBarProps {}

export const EhrPatientWelcomeSideBar: React.FC<
  IEhrPatientWelcomeSideBarProps
> = ({}) => {
  return (
    <SideBar>
      <SideBarHeader>
        <SideBarTitle>Onboard</SideBarTitle>
      </SideBarHeader>
      <SideBarBody>
        <SideBarSection>
          <SideBarSectionBody>
            <TableOfContents>
              <TableOfContentsItem href="/onboard/appointments">
                Appointments
              </TableOfContentsItem>
              <TableOfContentsItem href="/onboard/account">
                Account
              </TableOfContentsItem>
            </TableOfContents>
          </SideBarSectionBody>
        </SideBarSection>
      </SideBarBody>
    </SideBar>
  );
};
