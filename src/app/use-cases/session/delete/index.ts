import { DeleteSessionInput } from "./input";
import { DeleteSessionUseCaseError } from "./error";
import { ISessionRepository } from "../../../../contracts/repositories/session";

export class DeleteSessionUseCase {
  constructor(
    private readonly sessionRepo: ISessionRepository,
  ) { }

  async execute(props: DeleteSessionInput): Promise<undefined | DeleteSessionUseCaseError> {
    try {
      const userExist = await this.sessionRepo.findById(props.id);
      if (!userExist) {
        return new DeleteSessionUseCaseError("Session not found!");
      }

      await this.sessionRepo.delete(props.id);
      return undefined
    } catch {
      return new DeleteSessionUseCaseError("Error occurred while deleting session");
    }
  }
}
