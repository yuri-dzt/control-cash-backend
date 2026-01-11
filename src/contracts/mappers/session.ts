import { ISessionDto } from "../dtos/session";
import { Session } from "../../domain/entities/session";

export type PersistenceSession = {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_at: bigint;
  created_at: bigint;
};

export class SessionMapper {
  static toPersistence(entity: Session): PersistenceSession {
    return {
      id: entity.id,
      user_id: entity.user_id,
      refresh_token: entity.refresh_token,
      expires_at: BigInt(entity.expires_at),
      created_at: BigInt(entity.created_at),
    }
  }

  static toDomain(persistenceEntity: PersistenceSession): Session {
    return new Session({
      id: persistenceEntity.id,
      user_id: persistenceEntity.user_id,
      refresh_token: persistenceEntity.refresh_token,
      expires_at: Number(persistenceEntity.expires_at),
      created_at: Number(persistenceEntity.created_at),
    })
  }

  static toDto(entityDomain: Session): ISessionDto {
    return {
      id: entityDomain.id,
      user_id: entityDomain.user_id,
      refresh_token: entityDomain.refresh_token,
      expires_at: entityDomain.expires_at,
      created_at: entityDomain.created_at,
    }
  }
}
