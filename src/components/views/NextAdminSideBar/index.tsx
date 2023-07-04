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
import { nextAdminPaths } from "../adminRoutes";

export interface INextAdminSideBarProps {}

export const NextAdminSideBar: React.FC<INextAdminSideBarProps> = ({}) => {
  return (
    <SideBar>
      <SideBarHeader>
        <SideBarTitle>Admin Tools</SideBarTitle>
      </SideBarHeader>
      <SideBarBody>
        <SideBarSection>
          {/* <SideBarSectionHeader>
            <SideBarSectionTitle>Pages</SideBarSectionTitle>
          </SideBarSectionHeader> */}
          <SideBarSectionBody>
            <TableOfContents>
              {/* <TableOfContentsItem
                href={`${nextAdminPaths.root}${nextAdminPaths.tools}`}
              >
                Tools
              </TableOfContentsItem> */}
              <TableOfContentsItem
                href={`${nextAdminPaths.root}${nextAdminPaths.users}`}
              >
                Users
              </TableOfContentsItem>
            </TableOfContents>
          </SideBarSectionBody>
        </SideBarSection>
      </SideBarBody>
    </SideBar>
  );
};
