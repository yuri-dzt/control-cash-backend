import { ISystemOperator } from "../../../../domain/entities/system-operator/system-operator"

export type GetSystemOperatorsUseCaseInput = Pick<Partial<ISystemOperator>, 'id' | 'name' | 'email' | 'is_active' | 'role' | 'created_at'>