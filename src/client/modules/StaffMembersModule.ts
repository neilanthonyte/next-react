import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import { StaffMember } from "next-shared/src/models/StaffMember";
import { unserializeAnyStaffMember } from "next-shared/src/helpers/unserializeAnyStaffMember";
import { Scope } from "next-shared/src/models/Scope";

export interface IStaffMembersModule {
  retrieveAllStaffMembers(): Promise<StaffMember[]>;
  retrieveStaffMember(staffMemberId: string): Promise<null | StaffMember>;
  retrieveStaffMemberByEhrId(
    staffMemberEhrId: string,
  ): Promise<null | StaffMember>;
  retrieveCurrentScope(staffMemberId: string): Promise<null | Scope>;
  createStaffMember(
    staffMember: StaffMember,
    password: string,
  ): Promise<StaffMember>;
}

@injectable()
export class StaffMembersModule implements IStaffMembersModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveAllStaffMembers(): Promise<StaffMember[]> {
    const res = await this._httpConnection.makeRequest({
      url: `staffMembers`,
      method: "get",
      allow404: true,
    });

    return res.staffMembers.map((staffMember: StaffMember) =>
      unserializeAnyStaffMember(staffMember),
    );
  }

  public async retrieveStaffMember(
    staffMemberId: string,
  ): Promise<null | StaffMember> {
    const res = await this._httpConnection.makeRequest({
      url: `staffMembers/${staffMemberId}`,
      method: "get",
      allow404: true,
    });

    return res.staffMember ? unserializeAnyStaffMember(res.staffMember) : null;
  }

  public async retrieveStaffMemberByEhrId(
    staffMemberEhrId: string,
  ): Promise<null | StaffMember> {
    const res = await this._httpConnection.makeRequest({
      url: `staffMembers-by-ehr-id/${staffMemberEhrId}`,
      method: "get",
      allow404: true,
    });

    return res.staffMember ? unserializeAnyStaffMember(res.staffMember) : null;
  }

  public async retrieveCurrentScope(
    staffMemberId: string,
  ): Promise<null | Scope> {
    const res = await this._httpConnection.makeRequest({
      url: `staffMembers/${staffMemberId}/current-scope`,
      method: "get",
      allow404: true,
    });

    return res.scope ? Scope.unserialize(res.scope) : null;
  }

  public async createStaffMember(
    staffMember: StaffMember,
    password: string,
  ): Promise<StaffMember> {
    const res = await this._httpConnection.makeRequest({
      url: `staffMembers`,
      method: "post",
      data: {
        staffMember: staffMember.serialize(),
        password,
      },
    });

    return res.staffMember;
  }
}
