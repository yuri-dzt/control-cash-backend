import { GetSessionsInput } from "./input";
import { GetSessionsUseCaseError } from "./error";;
import { ISessionDto } from "../../../../contracts/dtos/session";
import { SessionMapper } from "../../../../contracts/mappers/session";
import { ISessionRepository } from "../../../../contracts/repositories/session";

export class GetSessionsUseCase {
  constructor(
    private readonly sessionRepo: ISessionRepository
  ) { }

  async execute(props: GetSessionsInput): Promise<ISessionDto[] | GetSessionsUseCaseError> {
    try {
      const sessions = await this.sessionRepo.findByUserId(props.user_id)

      if (!sessions || sessions.length === 0) {
        return []
      }

      return sessions.map((session) => SessionMapper.toDto(session));
    } catch {
      return new GetSessionsUseCaseError("Error occurred while getting sessions");
    }
  }
}
