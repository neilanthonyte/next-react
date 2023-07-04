import * as React from "react";

import { MultiFormMenu } from "../MultiFormMenu";

import { SideBar, SideBarBody } from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle,
} from "../../structure/SideBarSection";

/**
 * Shows the progress of a form in a SideBar.
 */
export const FormSideBar: React.FC = () => (
  <SideBar>
    <SideBarBody>
      <SideBarSection>
        <SideBarSectionHeader>
          <SideBarSectionTitle>Sections</SideBarSectionTitle>
        </SideBarSectionHeader>
        <SideBarSectionBody>
          <MultiFormMenu />
        </SideBarSectionBody>
      </SideBarSection>
    </SideBarBody>
  </SideBar>
);

export default FormSideBar;
