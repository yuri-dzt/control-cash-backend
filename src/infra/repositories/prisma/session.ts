import { prisma } from "../../../shared/prisma/client";
import { Session } from "../../../domain/entities/session";
import { PrismaError } from "../../../shared/prisma/error";
import { SessionMapper } from "../../../contracts/mappers/session";
import { ISessionRepository } from "../../../contracts/repositories/session";

export class PrismaSessionRepository implements ISessionRepository {
  async create(entity: Session): Promise<void | Error> {
    try {
      await prisma.session.create({
        data: SessionMapper.toPersistence(entity)
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async update(entity: Session): Promise<void | Error> {
    try {
      const persistenceEntity = SessionMapper.toPersistence(entity)

      await prisma.session.update({
        where: { id: entity.id },
        data: persistenceEntity
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async delete(id: string): Promise<void | Error> {
    try {
      await prisma.session.delete({
        where: { id }
      })
    } catch (err) {
      return new PrismaError((err as Error).message);
    }
  }

  async findById(id: string): Promise<Session | undefined> {
    try {
      const result = await prisma.session.findUnique({
        where: { id }
      });
      return result ? SessionMapper.toDomain(result) : undefined

    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async findByToken(token: string): Promise<Session | undefined> {
    try {
      const result = await prisma.session.findFirst({
        where: {
          refresh_token: token
        }
      });

      return result ? SessionMapper.toDomain(result) : undefined
    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }

  async findByUserId(user_id: string): Promise<Session[] | undefined> {
    try {
      const result = await prisma.session.findMany({
        where: {
          user_id
        }
      });

      return result ? result.map(SessionMapper.toDomain) : undefined
    } catch (err) {
      console.log((err as PrismaError).message);
      return undefined
    }
  }
}