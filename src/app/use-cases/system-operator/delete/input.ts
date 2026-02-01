import { ISystemOperator } from "../../../../domain/entities/system-operator/system-operator"

export type DeleteSystemOperatorUseCaseInput = Pick<ISystemOperator, 'id'> & {
  admin_id: string
}