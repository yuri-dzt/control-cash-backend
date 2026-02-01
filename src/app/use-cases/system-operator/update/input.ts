import { ISystemOperator } from "../../../../domain/entities/system-operator/system-operator"

export type UpdateSystemOperatorUseCaseInput = Partial<Omit<Pick<ISystemOperator, 'id' | 'name' | 'email' | 'password' | 'role' | 'is_active'>, 'role'> & { role: string }> & {
  id: string
}
