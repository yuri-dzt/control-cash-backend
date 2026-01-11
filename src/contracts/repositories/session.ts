import { IRepository } from "."
import { Session } from "../../domain/entities/session"

export interface ISessionRepository extends IRepository<Session> {
  findByToken: (token: string) => Promise<Session | undefined>
}