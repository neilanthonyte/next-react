import * as React from "react";
import { StaffMember } from "next-shared/src/models/StaffMember";
import { Form } from "../../forms/Form";
import { useCallback } from "react";
import {
  MedicalStaffMember,
  IMedicalStaffMember,
} from "next-shared/src/models/MedicalStaffMember";
import { useClient } from "../../../hooks/useClient";
import { VStack } from "../../structure/VStack";
import { createStaffMemberSchema } from "./helpers/createStaffMemberSchema";

export interface ICreateStaffMemberFormProps {
  onSuccess: (user: StaffMember) => any;
}

interface IStaffMemberFormData extends IMedicalStaffMember {
  location: {
    cmsLocationSlug: string;
    ehrId: string;
  };
  ehrUser: {
    ehrStaffMemberId: null | string;
    ehrStaffMemberIdAlt: null | string;
  };
  password: string;
  hasHelixUser: boolean;
  requiresClinicalAccess: boolean;
}

export const CreateStaffMemberForm: React.FC<ICreateStaffMemberFormProps> = ({
  onSuccess,
}) => {
  const client = useClient();

  const saveUser = useCallback((user: IStaffMemberFormData) => {
    // remap the prefill sections
    user.cmsLocationSlug = user.location.cmsLocationSlug;
    user.ehrId = user.location.ehrId;

    if (user.hasHelixUser) {
      user.ehrStaffMemberId = user.ehrUser.ehrStaffMemberId;
      user.ehrStaffMemberIdAlt = user.ehrUser.ehrStaffMemberIdAlt;
    }

    user.type = user.requiresClinicalAccess
      ? "medicalStaffMember"
      : "staffMember";

    const staffMember: StaffMember =
      user.type === "staffMember"
        ? StaffMember.unserialize(user)
        : MedicalStaffMember.unserialize(user);

    return client.staffMembers
      .createStaffMember(staffMember, user.password)
      .then((data) => onSuccess(data));
  }, []);

  return !!client.auth.session ? (
    <VStack>
      <p>
        Please double check all details before submitting. You cannot undo the
        effects of this form.
      </p>
      <Form schema={createStaffMemberSchema} onSuccess={saveUser} />
    </VStack>
  ) : (
    <div>No session present</div>
  );
};
