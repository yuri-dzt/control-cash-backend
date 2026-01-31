import { SystemOperator } from "../../../src/domain/entities/system-operator/system-operator";
import { ISystemOperatorRepository } from "../../../src/contracts/repositories/system-operator";

export class InMemorySystemOperatorRepository implements ISystemOperatorRepository {
  public system_operators: SystemOperator[] = [];

  async create(entity: SystemOperator): Promise<void | Error> {
    this.system_operators.push(entity);
  }

  async update(entity: SystemOperator): Promise<void | Error> {
    const index = this.system_operators.findIndex(c => c.id === entity.id)

    this.system_operators[index] = entity;
  }

  async delete(id: string): Promise<void | Error> {
    this.system_operators = this.system_operators.filter(c => c.id !== id);
  }

  async findById(id: string): Promise<SystemOperator | undefined> {
    return this.system_operators.find(c => c.id === id);
  }

  async findByEmail(email: string): Promise<SystemOperator | undefined> {
    return this.system_operators.find(c => c.email === email);
  }

  async getAll(): Promise<SystemOperator[]> {
    return this.system_operators;
  }
}
