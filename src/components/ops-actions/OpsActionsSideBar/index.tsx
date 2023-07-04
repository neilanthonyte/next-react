import * as React from "react";
import { useState } from "react";

import {
  SideBar,
  SideBarTitle,
  SideBarHeader,
  SideBarBody,
} from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle,
} from "../../structure/SideBarSection";
import { ActionCreate } from "../ActionCreate";
import { Button } from "../../generic/Button";
import { VStack } from "../../structure/VStack";

export interface IActionsSideBarProps {}

export const ActionsSideBar: React.FC<IActionsSideBarProps> = () => {
  const [showCreateAction, setShowCreateAction] = useState<boolean>(false);

  return (
    <>
      <SideBar>
        <SideBarHeader>
          <SideBarTitle>Issues</SideBarTitle>
        </SideBarHeader>
        <SideBarBody>
          <SideBarSection>
            <SideBarSectionHeader>
              <SideBarSectionTitle>Quick Actions</SideBarSectionTitle>
            </SideBarSectionHeader>
            <SideBarSectionBody>
              <VStack>
                <Button
                  isBlock={true}
                  onClick={() => setShowCreateAction(true)}
                >
                  Raise Issue
                </Button>
              </VStack>
            </SideBarSectionBody>
          </SideBarSection>
        </SideBarBody>
      </SideBar>

      <ActionCreate
        showCreateAction={showCreateAction}
        setShowCreateAction={setShowCreateAction}
      />
    </>
  );
};
