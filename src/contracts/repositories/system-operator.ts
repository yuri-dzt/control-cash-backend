import { IRepository } from "."
import { SystemOperator, SystemOperatorsCollection } from "../../domain/entities/system-operator/system-operator"

export interface ISystemOperatorRepository extends IRepository<SystemOperator> {
  findByEmail: (email: string) => Promise<SystemOperator | undefined>
  getAll: () => Promise<SystemOperatorsCollection>
}