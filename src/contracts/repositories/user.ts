import { IRepository } from "."
import { User, UserCollection } from "../../domain/entities/user"

export interface IUserRepository extends IRepository<User> {
  findByEmail: (email: string) => Promise<User | undefined>
  getAll: () => Promise<UserCollection>
}