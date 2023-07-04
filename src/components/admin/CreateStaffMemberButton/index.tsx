import * as React from "react";
import { useState } from "react";

import { Button } from "../../generic/Button";
import { CreateStaffMemberModal } from "../../modals/CreateStaffMemberModal";

export interface ICreateStaffMemberButtonProps {}

export const CreateStaffMemberButton: React.FC<
  ICreateStaffMemberButtonProps
> = ({}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <CreateStaffMemberModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
      <Button onClick={() => setShowModal(true)}>Create staff member</Button>
    </>
  );
};
