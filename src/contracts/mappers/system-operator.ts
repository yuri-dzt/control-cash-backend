import { ISystemOperatorDto } from "../dtos/system-operator";
import { SystemOperatorRole } from "../../domain/entities/system-operator/enum";
import { SystemOperator } from "../../domain/entities/system-operator/system-operator";

export type PersistenceSystemOperator = {
  id: string;
  name: string;
  email: string;
  password: string;
  is_active: boolean;
  created_at: bigint;
  updated_at: bigint | null;
  role: string;
};

export class SystemOperatorMapper {
  static toPersistence(entity: SystemOperator): PersistenceSystemOperator {
    const normalizedRole = entity.role.toUpperCase() as SystemOperatorRole

    return {
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
      is_active: entity.is_active,
      role: normalizedRole,
      created_at: BigInt(entity.created_at),
      updated_at: entity.updated_at ? BigInt(entity.updated_at) : null
    }
  }

  static toDomain(persistenceEntity: PersistenceSystemOperator): SystemOperator {
    const normalizedRole = persistenceEntity.role.toUpperCase() as SystemOperatorRole

    return new SystemOperator({
      ...persistenceEntity,
      created_at: Number(persistenceEntity.created_at),
      updated_at: persistenceEntity.updated_at ? Number(persistenceEntity.updated_at) : undefined,
      role: normalizedRole,
    });
  }

  static toDto(entityDomain: SystemOperator): ISystemOperatorDto {
    const normalizedRole = entityDomain.role.toUpperCase() as SystemOperatorRole
    return {
      id: entityDomain.id,
      name: entityDomain.name,
      email: entityDomain.email,
      is_active: entityDomain.is_active,
      role: normalizedRole,
      created_at: entityDomain.created_at,
      updated_at: entityDomain.updated_at,
    }
  }
}
