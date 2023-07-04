export enum EInclude {
  Required = "required",
  Optional = "optional",
}

export type TPersonalDetailsKeys =
  | "basics"
  | "atsi"
  | "profileImage"
  | "payment"
  | "termsAndConditions"
  | "address"
  | "emergencyContact"
  | "medicare"
  | "dva"
  | "concession";

export interface IPersonalDetails {
  basics?: EInclude;
  atsi?: EInclude;
  termsAndConditions?: EInclude;
  profileImage?: EInclude;
  payment?: EInclude;
  address?: EInclude;
  emergencyContact?: EInclude;
  medicare?: EInclude;
  dva?: EInclude;
  concession?: EInclude;
}
