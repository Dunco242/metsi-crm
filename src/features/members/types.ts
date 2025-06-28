export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface Member {
  id: string;
  name: string;
  role: MemberRole;
}
