import { LogoutUseCaseInput } from "./input";
import { ISessionRepository } from "../../../../contracts/repositories/session";

export class LogoutUseCase {
  constructor(
    private readonly sessionRepo: ISessionRepository
  ) { }

  async execute(props: LogoutUseCaseInput): Promise<undefined> {
    const session = await this.sessionRepo.findByToken(props.refresh_token);

    if (session) {
      await this.sessionRepo.delete(session.id);
    }

    return undefined
  }
}
