import { Session } from "../../../src/domain/entities/session";
import { ISessionRepository } from "../../../src/contracts/repositories/session";

export class InMemorySessionRepository implements ISessionRepository {
  public sessions: Session[] = [];

  async create(entity: Session): Promise<void | Error> {
    this.sessions.push(entity);
  }

  async update(entity: Session): Promise<void | Error> {
    const index = this.sessions.findIndex(c => c.id === entity.id)

    this.sessions[index] = entity;
  }

  async delete(id: string): Promise<void | Error> {
    this.sessions = this.sessions.filter(c => c.id !== id);
  }

  async findById(id: string): Promise<Session | undefined> {
    return this.sessions.find(c => c.id === id);
  }

  async findByToken(token: string): Promise<Session | undefined> {
    return this.sessions.find(c => c.refresh_token === token);
  }

  async findByUserId(user_id: string): Promise<Session[] | undefined> {
    return this.sessions.filter(c => c.user_id === user_id);
  }
}
