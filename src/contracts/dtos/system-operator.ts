import { SystemOperatorRole } from "../../domain/entities/system-operator/enum";

export interface ISystemOperatorDto {
  id: string;
  name: string;
  email: string;
  role: SystemOperatorRole;
  is_active: boolean;
  created_at: number;
  updated_at?: number;
}