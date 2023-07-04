import {
  IMedicalStaffMember,
  MedicalStaffMember,
} from "next-shared/src/models/MedicalStaffMember";
import { IStaffMember, StaffMember } from "next-shared/src/models/StaffMember";

export function unserializeAnyStaffMember(
  data: IStaffMember | IMedicalStaffMember,
): StaffMember | MedicalStaffMember {
  if (data.type === "medicalStaffMember") {
    // this is a medical staff member
    return MedicalStaffMember.unserialize(data);
  }

  return StaffMember.unserialize(data);
}
