import { prisma } from "../../../shared/prisma/client";
import { PrismaError } from "../../../shared/prisma/error";
import { SystemOperatorMapper } from "../../../contracts/mappers/system-operator";
import { SystemOperatorRole } from "../../../domain/entities/system-operator/enum";
import { ISystemOperatorRepository } from "../../../contracts/repositories/system-operator";
import { SystemOperator, SystemOperatorsCollection } from "../../../domain/entities/system-operator/system-operator";

export class PrismaSystemOperatorRepository implements ISystemOperatorRepository {
  async create(entity: SystemOperator): Promise<void | Error> {
    try {
      await prisma.systemOperator.create({
        data: SystemOperatorMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async update(entity: SystemOperator): Promise<void | Error> {
    try {
      const persistenceEntity = SystemOperatorMapper.toPersistence(entity)

      await prisma.systemOperator.update({
        where: { id: entity.id },
        data: persistenceEntity
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      await prisma.systemOperator.delete({
        where: { id }
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async findById(id: string): Promise<SystemOperator | undefined> {
    try {
      const result = await prisma.systemOperator.findUnique({
        where: { id }
      });
      return result ? SystemOperatorMapper.toDomain({
        ...result,
        role: result.role as SystemOperatorRole,
        updated_at: result.updated_at ? result.updated_at : null
      }) : undefined

    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async findByEmail(email: string): Promise<SystemOperator | undefined> {
    try {
      const result = await prisma.systemOperator.findUnique({
        where: { email }
      });

      return result ? SystemOperatorMapper.toDomain({
        ...result,
        role: result.role as SystemOperatorRole,
        updated_at: result.updated_at ? result.updated_at : null
      }) : undefined
    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async getAll(): Promise<SystemOperatorsCollection> {
    try {
      const result = await prisma.systemOperator.findMany()

      return result.map((system_operator) => SystemOperatorMapper.toDomain({
        id: system_operator.id,
        name: system_operator.name,
        email: system_operator.email,
        password: system_operator.password,
        role: system_operator.role as SystemOperatorRole,
        is_active: system_operator.is_active,
        created_at: system_operator.created_at,
        updated_at: system_operator.updated_at ? system_operator.updated_at : null
      }))
    } catch (err) {
      console.log((err as PrismaError).message)
      return []
    }
  }
}