import { IUserDto } from "../dtos/user";
import { User } from "../../domain/entities/user";
import { UserRole } from "../../domain/entities/user/enum";

export type PersistenceUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: bigint;
  updated_at: bigint | null;
  role: UserRole;
};

export class UserMapper {
  static toPersistence(entity: User): PersistenceUser {
    const normalizedRole = entity.role.toUpperCase() as UserRole

    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      role: normalizedRole,
      created_at: BigInt(entity.created_at),
      updated_at: entity.updated_at ? BigInt(entity.updated_at) : null
    }
  }

  static toDomain(persistenceEntity: PersistenceUser): User {
    const normalizedRole = persistenceEntity.role.toUpperCase() as UserRole

    return new User({
      ...persistenceEntity,
      created_at: Number(persistenceEntity.created_at),
      updated_at: persistenceEntity.updated_at ? Number(persistenceEntity.updated_at) : undefined,
      role: normalizedRole,
    });
  }

  static toDto(entityDomain: User): IUserDto {
    const normalizedRole = entityDomain.role.toUpperCase() as UserRole
    return {
      id: entityDomain.id,
      name: entityDomain.name,
      email: entityDomain.email,
      created_at: entityDomain.created_at,
      updated_at: entityDomain.updated_at,
      role: normalizedRole,
    }
  }
}
