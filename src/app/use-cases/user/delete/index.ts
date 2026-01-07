import { DeleteUserInput } from "./input";
import { DeleteUserUseCaseError } from "./error";
import { IUserRepository } from "../../../../contracts/repositories/user";

export class DeleteUserUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
  ) { }

  async execute(props: DeleteUserInput): Promise<undefined | DeleteUserUseCaseError> {
    try {
      const userExist = await this.userRepo.findById(props.id);
      if (!userExist) {
        return new DeleteUserUseCaseError("User not found!");
      }

      await this.userRepo.delete(props.id);
      return undefined
    } catch {
      return new DeleteUserUseCaseError("Error occurred while deleting user");
    }
  }
}
