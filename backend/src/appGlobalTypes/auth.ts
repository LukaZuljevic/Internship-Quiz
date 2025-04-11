export type JwtResponseDto = {
  token: string;
};

export type Payload = {
  email: string;
  id: string;
  role: Role;
};

export enum Role {
  USER = "User",
  ADMIN = "Admin",
}
