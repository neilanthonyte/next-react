import * as React from "react";
import { useState } from "react";

import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";
import { IHeaderAction } from "../../abstract/Section/components/Header";
import { StaffMembersTable } from "../../admin/StaffMembersTable";
import { CreateStaffMemberModal } from "../../modals/CreateStaffMemberModal";

export interface INextAdminUsersViewProps {}

export const NextAdminUsersView: React.FC<INextAdminUsersViewProps> = ({}) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const actions: IHeaderAction[] = [
    {
      label: "Set up user",
      onClick: () => setShowModal(true),
    },
  ];

  return (
    <>
      <CreateStaffMemberModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
      <PageSection>
        <PageSectionHeader actions={actions}>
          <PageSectionTitle>Users</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <StaffMembersTable />
        </PageSectionBody>
      </PageSection>
    </>
  );
};
