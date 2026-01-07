import { prisma } from "../../../shared/prisma/client";
import { PrismaError } from "../../../shared/prisma/error";
import { UserMapper } from "../../../contracts/mappers/user";
import { UserRole } from "../../../domain/entities/user/enum";
import { User, UserCollection } from "../../../domain/entities/user";
import { IUserRepository } from "../../../contracts/repositories/user";

export class PrismaUserRepository implements IUserRepository {
  async create(entity: User): Promise<void | Error> {
    try {
      await prisma.user.create({
        data: UserMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async update(entity: User): Promise<void | Error> {
    try {
      const persistenceEntity = UserMapper.toPersistence(entity)

      await prisma.user.update({
        where: { id: entity.id },
        data: persistenceEntity
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      await prisma.user.delete({
        where: { id }
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async findById(id: string): Promise<User | undefined> {
    try {
      const result = await prisma.user.findUnique({
        where: { id }
      });
      return result ? UserMapper.toDomain({
        ...result,
        role: result.role as UserRole,
        updated_at: result.updated_at ? result.updated_at : null
      }) : undefined

    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const result = await prisma.user.findUnique({
        where: { email }
      });

      return result ? UserMapper.toDomain({
        ...result,
        role: result.role as UserRole,
        updated_at: result.updated_at ? result.updated_at : null
      }) : undefined
    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async getAll(): Promise<UserCollection> {
    try {
      const result = await prisma.user.findMany()

      return result.map(user => UserMapper.toDomain({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role as UserRole,
        created_at: user.created_at,
        updated_at: user.updated_at ? user.updated_at : null
      }))
    } catch (err) {
      console.log((err as PrismaError).message)
      return []
    }
  }
}