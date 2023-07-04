import { injectable } from "inversify";
import { createGuid } from "next-shared/src/helpers/guid";
import { IStaffMembersModule } from "../modules/StaffMembersModule";
import { StaffMember } from "next-shared/src/models/StaffMember";
import { Scope } from "next-shared/src/models/Scope";
import { mockMedicalStaffMembers } from "next-shared/src/mockData/mockMedicalStaffMembers";

@injectable()
export class MockStaffMembersModule implements IStaffMembersModule {
  public async retrieveAllStaffMembers(): Promise<StaffMember[]> {
    return mockMedicalStaffMembers;
  }

  public async retrieveStaffMember(
    staffMemberId: string,
  ): Promise<null | StaffMember> {
    return (
      mockMedicalStaffMembers.find((x) => x.staffMemberId === staffMemberId) ||
      null
    );
  }

  public async retrieveStaffMemberByEhrId(
    staffMemberEhrId: string,
  ): Promise<null | StaffMember> {
    return (
      mockMedicalStaffMembers.find(
        (x) =>
          x.ehrId === staffMemberEhrId ||
          x.ehrStaffMemberId === staffMemberEhrId ||
          x.ehrStaffMemberIdAlt === staffMemberEhrId,
      ) || null
    );
  }

  public async retrieveCurrentScope(
    staffMemberId: string,
  ): Promise<null | Scope> {
    return null;
  }

  public async createStaffMember(
    staffMember: StaffMember,
    password: string,
  ): Promise<StaffMember> {
    staffMember.staffMemberId = createGuid();
    return staffMember;
  }
}
