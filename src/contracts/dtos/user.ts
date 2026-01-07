import { UserRole } from "../../domain/entities/user/enum";

export interface IUserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  created_at: number;
  updated_at?: number;
}