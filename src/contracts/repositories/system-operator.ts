import { IRepository } from "."
import { GetSystemOperatorsUseCaseInput } from "../../app/use-cases/system-operator/get/input"
import { SystemOperator, SystemOperatorsCollection } from "../../domain/entities/system-operator/system-operator"

export interface ISystemOperatorRepository extends IRepository<SystemOperator> {
  findByEmail: (email: string) => Promise<SystemOperator | undefined>
  getAll: (props: GetSystemOperatorsUseCaseInput) => Promise<SystemOperatorsCollection>
}