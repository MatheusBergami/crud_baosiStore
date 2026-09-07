export type UserRole = "ADMIN" | "USER";

export interface AuthUser {
  email: string;
  role: UserRole;
}

export interface LoginResponse extends AuthUser {
  token: string;
}
