import { ISystemOperator } from "../../../../domain/entities/system-operator/system-operator"

export type CreateSystemOperatorUseCaseInput = Omit<Pick<ISystemOperator, 'name' | 'email' | 'password' | 'role'>, 'role'> & { role: string }
