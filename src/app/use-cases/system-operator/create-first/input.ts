import { ISystemOperator } from "../../../../domain/entities/system-operator/system-operator"

export type CreateFirstSystemOperatorUseCaseInput = Pick<ISystemOperator, 'name' | 'email' | 'password'> & {
  secret_key: string
}
