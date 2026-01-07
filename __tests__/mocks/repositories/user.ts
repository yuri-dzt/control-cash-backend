import { User } from "../../../src/domain/entities/user";
import { IUserRepository } from "../../../src/contracts/repositories/user";

export class InMemoryUserRepository implements IUserRepository {
  public users: User[] = [];

  async create(entity: User): Promise<void | Error> {
    this.users.push(entity);
  }

  async update(entity: User): Promise<void | Error> {
    const index = this.users.findIndex(c => c.id === entity.id)

    this.users[index] = entity;
  }

  async delete(id: string): Promise<void | Error> {
    this.users = this.users.filter(c => c.id !== id);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(c => c.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(c => c.email === email);
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }
}
