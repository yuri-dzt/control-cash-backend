import { RefreshAccountInput } from "./input";
import { RefreshAccountUseCaseError } from "./error";
import { IUserDto } from "../../../../contracts/dtos/user";
import { UserMapper } from "../../../../contracts/mappers/user";
import { IUserRepository } from "../../../../contracts/repositories/user";

export class RefreshAccountUseCase {
  constructor(
    private readonly userRepo: IUserRepository
  ) { }

  async execute(props: RefreshAccountInput): Promise<IUserDto | RefreshAccountUseCaseError> {
    try {
      const userExist = await this.userRepo.findById(props.id);
      if (!userExist) {
        return new RefreshAccountUseCaseError("User not found!");
      }

      return UserMapper.toDto(userExist);

    } catch {
      return new RefreshAccountUseCaseError("Error occurred while refresh account");
    }
  }
}
